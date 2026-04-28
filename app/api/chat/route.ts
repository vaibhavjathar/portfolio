import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { AGENT_SYSTEM_PROMPT, PROJECTS } from "@/lib/data";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const TOOLS: Groq.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "scroll_to_section",
      description: "Scrolls the portfolio page to a specific section. Use when the user asks to see a section.",
      parameters: {
        type: "object",
        properties: {
          sectionId: {
            type: "string",
            enum: ["projects", "about", "experience", "battlelog", "contact"],
            description: "The section ID to scroll to",
          },
        },
        required: ["sectionId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "highlight_project",
      description: "Scrolls to and highlights a specific project card. Use when user asks about a specific project.",
      parameters: {
        type: "object",
        properties: {
          projectId: {
            type: "string",
            enum: PROJECTS.map((p) => p.id),
            description: "The project ID to highlight",
          },
        },
        required: ["projectId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "open_github",
      description: "Opens a GitHub repository link in a new tab.",
      parameters: {
        type: "object",
        properties: {
          url: {
            type: "string",
            description: "The GitHub URL to open",
          },
        },
        required: ["url"],
      },
    },
  },
];

export async function POST(req: NextRequest) {
  const { messages, currentSection } = await req.json();

  const systemPrompt = `${AGENT_SYSTEM_PROMPT}\n\nThe visitor is currently viewing the "${currentSection}" section.`;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const response = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          tools: TOOLS,
          tool_choice: "auto",
          stream: true,
          max_tokens: 512,
        });

        let toolCallBuffer: { name: string; arguments: string } | null = null;

        for await (const chunk of response) {
          const delta = chunk.choices[0]?.delta;
          if (!delta) continue;

          // Handle tool calls
          if (delta.tool_calls && delta.tool_calls.length > 0) {
            const tc = delta.tool_calls[0];
            if (tc.function?.name) {
              toolCallBuffer = { name: tc.function.name, arguments: "" };
            }
            if (tc.function?.arguments && toolCallBuffer) {
              toolCallBuffer.arguments += tc.function.arguments;
            }
          }

          // Handle text content
          if (delta.content) {
            send({ delta: delta.content });
          }

          // When a tool call is complete, execute it
          if (chunk.choices[0]?.finish_reason === "tool_calls" && toolCallBuffer) {
            try {
              const args = JSON.parse(toolCallBuffer.arguments || "{}");
              send({ type: "tool_call", action: toolCallBuffer.name, args });
            } catch {
              // malformed args — skip
            }
            toolCallBuffer = null;
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      } catch (err) {
        send({ delta: "Sorry, I'm having trouble connecting right now." });
        console.error("Chat API error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
