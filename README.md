# store-chat

An AI-powered application created with [NovaKey](https://novakey.vercel.app).

## Quick Start

1. **Rename the environment file**:
   \`\`\`bash
   # Windows (PowerShell/CMD)
   ren .env.local.example .env.local

   # Mac/Linux
   mv .env.local.example .env.local
   \`\`\`

2. **Add your NovaKey API key**:
   - Open `.env.local` in your editor
   - Replace `your-novakey-api-key-here` with your actual API key
   - Save the file

3. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

4. **Run the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Included

- ✅ AI-powered chat interface using **gpt-4o-mini**
- ✅ Pre-configured NovaKey proxy (no need for multiple API keys!)
- ✅ Optimized system prompt for your use case
- ✅ Credit tracking and usage monitoring built-in

## How It Works

This app uses the **NovaKey API** to access AI models. You only need ONE API key (your NovaKey key), and NovaKey handles:
- ✨ Routing to the right AI provider (OpenAI, Anthropic, Google)
- 💳 Credit tracking and usage monitoring
- 📊 Unified billing across all models

No need to manage multiple provider API keys!

## Next Steps

- Customize the UI in `app/page.tsx`
- Modify the prompt in `app/api/ai/route.ts`
- Add more features and build your app!
- Check your usage at [novakey.vercel.app/logs](https://novakey.vercel.app/logs)

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [NovaKey](https://novakey.vercel.app/) - AI model management and optimization

---

🤖 Generated with [NovaKey](https://novakey.vercel.app) - Your key to the perfect AI model
