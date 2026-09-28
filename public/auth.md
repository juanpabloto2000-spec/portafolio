# Auth.md

> Agent Authentication and Registration Protocol for Dynamind Studios

This document describes how autonomous AI agents can discover, register, authenticate, and interact with Dynamind Studios APIs and resources.

## Authentication Overview

Dynamind Studios supports OAuth 2.0 and API Key authentication for autonomous agents.

### Discovery Metadata
- Authorization Server: `/.well-known/oauth-authorization-server`
- Protected Resource Metadata: `/.well-known/oauth-protected-resource`
- OpenID Configuration: `/.well-known/openid-configuration`

### Supported Scopes
- `read:projects`: Read portfolio case studies, metrics, and architecture dossiers.
- `write:triage`: Submit diagnostic assessments for business operational analysis.
- `write:leads`: Register potential business inquiries.
- `execute:agent`: Invoke autonomous agent workflows.

### Registration Process for Agents
1. Agents can request client credentials by sending a registration payload to `https://portafolio.juanpabloto2000.workers.dev/api/agents/register`.
2. Public endpoints (such as `/api/triage/submit` and `/openapi.json`) require no bearer token.
3. For administrative or protected operations, provide:
   `Authorization: Bearer <token>`
