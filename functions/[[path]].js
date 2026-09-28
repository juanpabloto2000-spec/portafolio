// Cloudflare Pages Function ([[path]].js)
// Enables native Markdown Content Negotiation, Link Headers, and AEO protocols on the Edge

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const accept = request.headers.get("Accept") || "";

  // 1. Markdown Content Negotiation para Agentes de IA (Cloudflare AEO Standard - Level 3)
  if ((url.pathname === "/" || url.pathname === "") && accept.includes("text/markdown")) {
    const llmsRes = await env.ASSETS.fetch(new URL("/llms.txt", request.url));
    const markdownBody = await llmsRes.text();
    return new Response(markdownBody, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": "2800",
        "Access-Control-Allow-Origin": "*",
        "Vary": "Accept"
      }
    });
  }

  // 2. Dejar que Cloudflare Pages sirva el asset estático
  const response = await next();

  // 3. Inyección de Link Headers en la raíz según RFC 8288
  if (url.pathname === "/" || url.pathname === "") {
    const newHeaders = new Headers(response.headers);
    newHeaders.set(
      "Link",
      '</.well-known/api-catalog>; rel="api-catalog", </openapi.json>; rel="service-desc"; type="application/json", </llms.txt>; rel="alternate"; type="text/markdown", </.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json", </.well-known/agent-card.json>; rel="alternate"; type="application/json", </.well-known/agent-skills/index.json>; rel="alternate"; type="application/json", </auth.md>; rel="author", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource"'
    );
    newHeaders.set("Vary", "Accept");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }

  // 4. Content-Type RFC 9264 para API Catalog
  if (url.pathname === "/.well-known/api-catalog") {
    const newHeaders = new Headers(response.headers);
    newHeaders.set("Content-Type", "application/linkset+json; charset=utf-8");
    newHeaders.set("Access-Control-Allow-Origin", "*");
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders
    });
  }

  return response;
}
