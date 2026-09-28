# Auth.md

An introduction to authentication and authorization for AI agents on Dynamind Studios.

## Registration

Agents can register for API access by submitting their identity information:
- Protocol: OAuth 2.0 Dynamic Client Registration
- Registration Endpoint: https://portafolio.juanpabloto2000.workers.dev/api/agents/register

## Authentication

Agents authenticate using Bearer tokens in the HTTP Authorization header:

```http
Authorization: Bearer <access_token>
```

Token endpoint: `https://portafolio.juanpabloto2000.workers.dev/oauth/token`

## Discovery

Metadata discovery endpoints:
- OAuth Authorization Server: `/.well-known/oauth-authorization-server`
- OpenID Configuration: `/.well-known/openid-configuration`
- OAuth Protected Resource: `/.well-known/oauth-protected-resource`

## Scopes

- `read:projects`: Read portfolio case studies, metrics, and architecture dossiers.
- `write:triage`: Submit diagnostic assessments for business operational analysis.
- `write:leads`: Register potential business inquiries.
- `execute:agent`: Invoke autonomous agent workflows.
