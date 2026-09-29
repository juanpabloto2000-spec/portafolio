# auth.md

Not an agent? You might be looking for https://portafolio.juanpabloto2000.workers.dev.

You are an agent. This document tells you how to register a credential for **Dynamind Studios sovereign environments** — temporary, autonomous environments you can provision without an account and (optionally) have the user claim later to make permanent. Follow the steps in order; do not skip ahead.

This is the **user claimed** flow: provision anonymously, work immediately, claim when the user is available.

Endpoints live at `https://portafolio.juanpabloto2000.workers.dev`.

## Step 1 — Provision the environment

```http
POST /x/one-shot-environments HTTP/1.1
Host: portafolio.juanpabloto2000.workers.dev
```

No request body. No authentication.

Response (200):

```json
{
  "clientId": "client_dym_01j8x9k2m4",
  "apiKey": "sk_dym_live_a89f72b1c4e9",
  "claimToken": "clm_dym_984f1a2e5c8",
  "authkitDomain": "auth.dynamindstudios.com"
}
```

The API may respond in snake_case (`client_id`, `api_key`, `claim_token`, `authkit_domain`) — accept either.

What each field is:

- `apiKey` — your bearer credential for the Dynamind Studios API. Use it immediately ([Step 2](#step-2--use-the-credential)).
- `clientId` — identifies the environment. Required for the claim flow ([Step 3](#step-3--claim-ceremony-optional)) and for any integration you configure.
- `claimToken` — single-use handle for the claim ceremony. Returned **exactly once** — persist it alongside `apiKey` (e.g. as `DYNAMIND_CLAIM_TOKEN`); do not log it. Without it, the environment cannot be claimed.
- `authkitDomain` — the hosted identity domain for this environment. Informational; you don't pass it in auth requests.

## Step 2 — Use the credential

```http
GET /api/v1/diagnostic HTTP/1.1
Host: portafolio.juanpabloto2000.workers.dev
Authorization: Bearer <apiKey>
```

The credential works against the Dynamind Studios API the moment it's issued — full scope, no degraded mode. Endpoints may surface a warning that the environment is unclaimed; that's informational, not an auth failure.

If you get a 401 on a previously-working `apiKey`: the environment was revoked or claimed away. Drop the credential and restart at [Step 1](#step-1--provision-the-environment). Do not stash and retry.

## Step 3 — Claim ceremony (optional)

Claim links the environment to an operator account, making the credential permanent and giving the user a place to manage it. Skip this if the user isn't available — the unclaimed credential keeps working.

### 3a. Mint a claim nonce

```http
POST /x/one-shot-environments/claim-nonces HTTP/1.1
Host: portafolio.juanpabloto2000.workers.dev
Content-Type: application/json

{
  "client_id": "<clientId>",
  "claim_token": "<claimToken>"
}
```

Response (200):

```json
{ "nonce": "nonce_dym_38f2a1b9c7" }
```

If the response is 409, the environment is already claimed. Stop the ceremony — the credential is already permanent.

### 3b. Send the user to the dashboard

Construct the claim URL:

```
https://portafolio.juanpabloto2000.workers.dev/#/claim?nonce=<nonce>
```

Surface this in your agent UI.

### 3c. Poll for completion

The user signs in and confirms the claim in the dashboard. To detect completion, re-POST the request from [3a](#3a-mint-a-claim-nonce) every 5 seconds with the same `client_id` and `claim_token`:

- 200 with a fresh `nonce` → still pending; keep polling. Discard these nonces — only the one from 3a is bound to the URL you gave the user.
- 409 → claimed. Stop polling; the credential is permanent.
- 401 → claim token invalidated by the claim. Also means claimed. Stop polling.

## Step 4 — Dynamic OAuth Registration (RFC 7591)

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

## Step 5 — Revocation

```http
POST /oauth/revoke HTTP/1.1
Host: portafolio.juanpabloto2000.workers.dev
Content-Type: application/x-www-form-urlencoded

token=<apiKey>&token_type_hint=access_token
```

## Errors

- `400 Bad Request`: Invalid request structure or missing parameters.
- `401 Unauthorized`: API key revoked or expired.
- `429 Rate Limit`: Wait `retry_after` seconds.
