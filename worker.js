/**
 * Dynamind Studios — Cloudflare Worker Entrypoint
 * Handles AEO (Agent Engine Optimization), Content Negotiation (Markdown for Agents),
 * and static assets routing with microsecond latency.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const accept = request.headers.get("accept") || "";

    // 1. AEO: Content Negotiation for AI Agents (Markdown Negotiation)
    // If an agent requests Accept: text/markdown for the root or an HTML route:
    const isHtmlRoute = url.pathname === "/" || (!url.pathname.includes(".") && !url.pathname.startsWith("/api/"));
    if (accept.includes("text/markdown") && isHtmlRoute) {
      try {
        const mdAsset = await env.ASSETS.fetch(new Request(new URL("/llms-full.txt", request.url), request));
        if (mdAsset.ok) {
          const body = await mdAsset.text();
          return new Response(body, {
            status: 200,
            headers: {
              "Content-Type": "text/markdown; charset=utf-8",
              "x-markdown-tokens": "5400",
              "Vary": "Accept",
              "Access-Control-Allow-Origin": "*",
              "Cache-Control": "public, max-age=3600"
            }
          });
        }
      } catch (err) {
        // Fallback to standard flow if asset fetch fails
      }
    }

    // 2. Fetch from Cloudflare Static Assets
    let response = await env.ASSETS.fetch(request);

    // 3. Ensure Content-Type & Token headers for Markdown files
    if (url.pathname === "/auth.md") {
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Vary": "Accept",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    if (url.pathname === "/llms.txt") {
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": "2800",
          "Vary": "Accept",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    if (url.pathname === "/llms-full.txt") {
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "x-markdown-tokens": "5400",
          "Vary": "Accept",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    // 4. Inject Vary: Accept on HTML responses so caching proxies respect content negotiation
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("text/html")) {
      const headers = new Headers(response.headers);
      headers.set("Vary", "Accept");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    return response;
  }
};
