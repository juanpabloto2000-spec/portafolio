---
agent_auth:
  register_uri: https://portafolio.juanpabloto2000.workers.dev/api/agents/register
  authorization_server: https://portafolio.juanpabloto2000.workers.dev/.well-known/oauth-authorization-server
  protected_resource: https://portafolio.juanpabloto2000.workers.dev/.well-known/oauth-protected-resource
  supported_identity_types:
    - agent
    - human
  credential_types:
    - api_key
    - bearer_token
  revocation_uri: https://portafolio.juanpabloto2000.workers.dev/oauth/revoke
  claim_uri: https://portafolio.juanpabloto2000.workers.dev/api/agents/claim
---

# Auth.md — Agent Authentication & Registration Protocol

An introduction to authentication, dynamic client registration, and access control for autonomous AI agents on **Dynamind Studios**.

## 1. Machine-Readable Agent Metadata (`agent_auth`)

```json
{
  "agent_auth": {
    "register_uri": "https://portafolio.juanpabloto2000.workers.dev/api/agents/register",
    "authorization_server": "https://portafolio.juanpabloto2000.workers.dev/.well-known/oauth-authorization-server",
    "protected_resource": "https://portafolio.juanpabloto2000.workers.dev/.well-known/oauth-protected-resource",
    "supported_identity_types": ["agent", "human"],
    "credential_types": ["api_key", "bearer_token"],
    "revocation_uri": "https://portafolio.juanpabloto2000.workers.dev/oauth/revoke",
    "claim_uri": "https://portafolio.juanpabloto2000.workers.dev/api/agents/claim"
  }
}
```

## 2. Dynamic Agent Registration

Agents can register for API and Model Context Protocol (MCP) access by submitting their identity information:
- **Protocol**: OAuth 2.0 Dynamic Client Registration (RFC 7591)
- **Registration Endpoint**: `https://portafolio.juanpabloto2000.workers.dev/api/agents/register`
- **Supported Identity Types**: `agent`, `human`
- **Supported Credential Types**: `api_key`, `bearer_token`

### Registration Request Example:

```http
POST /api/agents/register HTTP/1.1
Host: portafolio.juanpabloto2000.workers.dev
Content-Type: application/json

{
  "client_name": "Autonomous-Research-Agent-v1",
  "client_uri": "https://agent-domain.example.com",
  "grant_types": ["client_credentials"],
  "scope": "read:projects write:triage execute:agent"
}
```

## 3. Token Authentication

Agents authenticate using HTTP Bearer tokens in the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

- **Token Endpoint**: `https://portafolio.juanpabloto2000.workers.dev/oauth/token`
- **Revocation Endpoint**: `https://portafolio.juanpabloto2000.workers.dev/oauth/revoke`
- **Claim Endpoint**: `https://portafolio.juanpabloto2000.workers.dev/api/agents/claim`

## 4. Metadata Discovery Endpoints

- **OAuth Authorization Server**: [`/.well-known/oauth-authorization-server`](https://portafolio.juanpabloto2000.workers.dev/.well-known/oauth-authorization-server)
- **OAuth Protected Resource**: [`/.well-known/oauth-protected-resource`](https://portafolio.juanpabloto2000.workers.dev/.well-known/oauth-protected-resource)
- **OpenID Configuration**: [`/.well-known/openid-configuration`](https://portafolio.juanpabloto2000.workers.dev/.well-known/openid-configuration)
- **MCP Server Card**: [`/.well-known/mcp/server-card.json`](https://portafolio.juanpabloto2000.workers.dev/.well-known/mcp/server-card.json)
- **Agent Card**: [`/.well-known/agent-card.json`](https://portafolio.juanpabloto2000.workers.dev/.well-known/agent-card.json)

## 5. Scopes & Permissions

- `read:projects`: Read portfolio case studies, metrics, and architecture dossiers.
- `write:triage`: Submit diagnostic assessments for business operational analysis.
- `write:leads`: Register potential business inquiries.
- `execute:agent`: Invoke autonomous agent workflows.
