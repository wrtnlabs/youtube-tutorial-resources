# 🔑 How to Generate Google OAuth Credentials and SerpAPI Key

## 1. Generate Google OAuth Credentials

This guide walks you through creating Google Cloud OAuth credentials to access Gmail, Calendar, and other Google services via API.

### Prerequisites

- A Google account
- Access to [Google Cloud Console](https://console.cloud.google.com/)

### 1. Create a Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Select or create a new project.
3. Go to **APIs & Services → Library**.
4. Enable APIs you plan to use (e.g., Gmail API, Calendar API).

### 2. Configure the OAuth Consent Screen

1. Navigate to **APIs & Services → OAuth consent screen**.
2. Choose **External**.
3. Fill in:
   - App name, support email
   - Scopes (e.g., Gmail, Calendar)
   - Test users (your Google account)

### 3. Create OAuth Credentials

1. Go to **APIs & Services → Credentials**.
2. Click **Create Credentials → OAuth Client ID**.
3. Select `Web Application`.
4. Add your **redirect URI** (e.g., `http://localhost:3000/oauth2callback`).
5. After creation, note:
   - `Client ID`
   - `Client Secret`

> 🔐 Keep the Client Secret private.

### 4. Get Authorization Code

Open this URL in your browser (replace with your own values):

```bash
https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&access_type=offline&include_granted_scopes=true&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2callback&client_id=YOUR_CLIENT_ID
```

After consent, Google will redirect to:

```
http://localhost:3000/oauth2callback?code=AUTH_CODE
```

### 5. Exchange Authorization Code for Tokens

Run:

```bash
curl -X POST https://oauth2.googleapis.com/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "code=AUTH_CODE" \
  -d "grant_type=authorization_code" \
  -d "redirect_uri=http://localhost:3000/oauth2callback"
```

#### Response:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  ...
}
```

- Save the `refresh_token` for long-term use.

### 🔐 Recommended `.env` Configuration

```bash
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

### 📚 References

- [OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Gmail Scopes](https://developers.google.com/gmail/api/auth/scopes)
- [Calendar Scopes](https://developers.google.com/calendar/auth)

---

## 2. Generate SerpAPI Key

This guide shows how to generate a **SerpAPI API key** for accessing search results via API.

### Prerequisites

- A [SerpAPI account](https://serpapi.com/users/sign_up)

### 1. Get Your SerpAPI Key

1. Go to [SerpAPI Dashboard](https://serpapi.com/dashboard).
2. Your **API key** is visible at the top of the dashboard.
3. Copy and securely store the key.

### 2. Test with `curl`

```bash
curl "https://serpapi.com/search.json?q=OpenAI&location=Seoul&api_key=YOUR_SERP_API_KEY"
```

### 🔐 Recommended `.env` Configuration

```bash
SERP_API_KEY=your_serpapi_key
```

## 📚 References

- [SerpAPI Docs](https://serpapi.com/)
- [Search Parameters](https://serpapi.com/search-api)
