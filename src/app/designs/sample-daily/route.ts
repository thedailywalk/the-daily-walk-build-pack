import { readFileSync } from "node:fs";
import path from "node:path";

// Serve the static sample-daily-issue.html as a shareable, login-free page.
// Read at build time so there's no runtime file dependency.
export const dynamic = "force-static";

export function GET() {
  try {
    const file = path.join(process.cwd(), "content-samples", "sample-daily-issue.html");
    const html = readFileSync(file, "utf8");
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  } catch {
    return new Response("Sample not found.", { status: 404 });
  }
}
