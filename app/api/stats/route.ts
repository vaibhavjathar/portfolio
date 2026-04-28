import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/vaibhavjathar", {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 },
      }),
      fetch("https://api.github.com/users/vaibhavjathar/repos?per_page=100", {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 },
      }),
    ]);

    const user = await userRes.json();
    const repos = await reposRes.json();

    const stars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: { stargazers_count: number }) => acc + (r.stargazers_count || 0), 0)
      : 0;

    return NextResponse.json({
      repos: user.public_repos ?? 13,
      followers: user.followers ?? 3,
      stars,
    });
  } catch {
    return NextResponse.json({ repos: 13, followers: 3, stars: 0 });
  }
}
