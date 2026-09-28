// Cloudflare Pages / Workers Advanced Mode Worker (_worker.js)
// Enables native Markdown Content Negotiation, Link Headers, and AEO protocols

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const accept = request.headers.get("Accept") || "";

    // 1. Markdown Content Negotiation para Agentes de IA (Cloudflare AEO Standard)
    if ((url.pathname === "/" || url.pathname === "") && accept.includes("text/markdown")) {
      const llmsUrl = new URL("/llms.txt", request.url);
      const res = await env.ASSETS.fetch(new Request(llmsUrl, request));
      const headers = new Headers(res.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("x-markdown-tokens", "2800");
      headers.set("Access-Control-Allow-Origin", "*");
      return new Response(res.body, {
        status: 200,
        headers
      });
    }

    // 2. Servir archivo desde Static Assets
    const response = await env.ASSETS.fetch(request);

    // 3. Inyección de Link Headers en la raíz según RFC 8288
    if (url.pathname === "/" || url.pathname === "") {
      const newHeaders = new Headers(response.headers);
      newHeaders.set(
        "Link",
        '</.well-known/api-catalog>; rel="api-catalog", </openapi.json>; rel="service-desc"; type="application/json", </llms.txt>; rel="alternate"; type="text/markdown", </.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json", </.well-known/agent-card.json>; rel="alternate"; type="application/json", </.well-known/agent-skills/index.json>; rel="alternate"; type="application/json", </auth.md>; rel="author"'
      );
      newHeaders.set("Access-Control-Allow-Origin", "*");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }

    // 4. Content-Type RFC 9264 para /.well-known/api-catalog
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
};
