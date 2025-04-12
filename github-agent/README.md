# 🔑 How to Generate GitHub Access Tokens (`ghu_` and `gho_`)

GitHub issues two types of OAuth access tokens depending on the app type:

- `ghu_...` for **OAuth Apps**
- `gho_...` for **GitHub Apps (user-to-server OAuth)**

This guide explains how to register both app types and obtain their respective tokens.

## 📋 Token Type Comparison

| Feature       | `ghu_` (OAuth App)                       | `gho_` (GitHub App)                             |
| ------------- | ---------------------------------------- | ----------------------------------------------- |
| App Type      | OAuth App                                | GitHub App                                      |
| Token Format  | `ghu_...`                                | `gho_...` (plus `ghr_...` for refresh)          |
| Token Expiry  | Does not expire (unless revoked)         | Expires after ~8 hours                          |
| Refresh Token | ❌ Not supported                         | ✅ Supported via `ghr_...`                      |
| Scopes        | Fully customizable (e.g. `repo`, `user`) | Limited to app’s configured permissions         |
| Use Case      | Web login, user authorization            | API integrations as GitHub App acting on behalf |
| Redirect Flow | Yes                                      | Yes                                             |

> ⚠️ You can use either ghu* or gho* tokens depending on your use case. Both are valid OAuth-based GitHub access tokens — feel free to choose whichever fits your integration style.

## 1. OAuth App: Generate `ghu_` Token

### Step 1: Register an OAuth App

1. Go to [GitHub OAuth Apps](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill out the form:
   - **Application Name**
   - **Homepage URL**
   - **Authorization Callback URL** (e.g. `http://localhost:3000/auth/github/callback`)
4. Click **Register Application**
5. Save:
   - `Client ID`
   - `Client Secret`

### Step 2: Redirect Users for Authorization

```url
https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=read:user%20repo&state=SOME_RANDOM_STRING
```

### Step 3: Exchange Code for Access Token

```bash
curl -X POST https://github.com/login/oauth/access_token \
  -H "Accept: application/json" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "code=RECEIVED_AUTH_CODE" \
  -d "redirect_uri=YOUR_CALLBACK_URL"
```

#### Response:

```json
{
  "access_token": "ghu_XXXXXXXXXXXXXXXX",
  "token_type": "bearer",
  "scope": "read:user repo"
}
```

## 🧭 2. GitHub App: Generate `gho_` Token

### Step 1: Register a GitHub App

1. Go to [GitHub Apps](https://github.com/settings/apps)
2. Click **"New GitHub App"**
3. Fill in:
   - **App name**
   - **Homepage URL**
   - **Callback URL**
4. Set **User-to-server** OAuth permissions (e.g. `read:user`)
5. Save:
   - `Client ID`
   - `Client Secret`

### Step 2: Redirect Users for Authorization

```url
https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=read:user&state=SOME_RANDOM_STRING
```

### Step 3: Exchange Code for Access Token

```bash
curl -X POST https://github.com/login/oauth/access_token \
  -H "Accept: application/json" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "code=RECEIVED_CODE" \
  -d "redirect_uri=YOUR_CALLBACK_URL"
```

#### Response:

```json
{
  "access_token": "gho_XXXXXXXXXXXXXXXX",
  "refresh_token": "ghr_XXXXXXXXXXXXXXXX",
  "expires_in": 28800,
  "refresh_token_expires_in": 15897600,
  "token_type": "bearer",
  "scope": "read:user"
}
```

### 🔄 Refresh `gho_` Token

When the token expires, you can refresh it using the `refresh_token`:

```bash
curl -X POST https://github.com/login/oauth/access_token \
  -H "Accept: application/json" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=ghr_XXXXXXXXXXXXXXXX"
```

## Summary

- Use **OAuth Apps** for simple user-based integrations (you’ll get a `ghu_` token)
- Use **GitHub Apps** for secure, scalable API access on behalf of users (you’ll get a `gho_` token and `ghr_` refresh token)
- Always store tokens securely and respect scopes

## 🔐 Recommended `.env` Configuration

```bash
GITHUB_ACCESS_TOKEN=ghu_...
# or
GITHUB_ACCESS_TOKEN=gho_...
```
