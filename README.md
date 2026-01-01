# GitGotchi 🦖

An AI-powered digital pet that thrives on your code quality. It connects to your GitHub repository and "eats" your commits.
Analyzed by **Gemini 1.5 Pro**.

## Features
- **Code Digestion**: Analyzes code quality (cleanliness, complexity) of every push.
- **Reactive Mood**: Gotchi gets sick if you push bugs, happy if you add tests.
- **Real-time Interface**: See your specific pet evolve.
- **Memory**: Remembers up to 20 past meals.

## How to Install

### 1. Requirements
- Node.js 18+
- A Google Gemini API Key (AI Studio)

### 2. Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/gitgotchi.git
   cd gitgotchi
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your GEMINI_API_KEY and a random GITHUB_WEBHOOK_SECRET
   ```

### 3. Running Locally
```bash
npm run dev
```
Visit http://localhost:3000 to see your egg hatch!

### 4. GitHub Webhook Integration
To feed your pet, you must expose your local server to GitHub, or deploy the app.

**Option A: Local (using ngrok)**
1. Install ngrok and run: `ngrok http 3000`
2. Copy the forwarding URL (e.g., `https://asdf-123.ngrok-free.app`).

**Option B: Deployment (Vercel)**
1. Deploy this project to Vercel.
2. Get the production URL.

**GitHub Configuration**:
1. Go to your repository -> **Settings** -> **Webhooks** -> **Add webhook**.
2. **Payload URL**: `YOUR_URL/api/webhooks`
3. **Content type**: `application/json`
4. **Secret**: Must match `GITHUB_WEBHOOK_SECRET` in your `.env.local`.
5. **Which events?**: Select **Just the push event**.
6. Click **Add webhook**.

Now push some code to your repo.
- Clean code = Happy Pet 🟢
- Bugs/Messy code = Sick Pet 🤢


my pet in the house 🦖