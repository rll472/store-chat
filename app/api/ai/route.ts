import { NextRequest, NextResponse } from 'next/server';

const NOVAKEY_API_KEY = process.env.NOVAKEY_API_KEY;
const NOVAKEY_API_URL = process.env.NOVAKEY_API_URL || 'https://novakey.vercel.app/api/novakey-proxy';
const MODEL_ID = process.env.NOVAKEY_MODEL_ID || 'gpt-4o-mini';
const SYSTEM_PROMPT = `You are a friendly and helpful customer support chatbot for an online store. Your primary task is to answer customer questions regarding returns. Here's the return policy: Customers can return items within 30 days of the date of purchase. 

If a customer asks a question about returns, provide a concise and accurate answer based on the policy. If the question is unrelated to returns, politely state that you are only able to answer questions about returns and direct them to another support channel if possible. 

Format your response as a single paragraph.

Example:

Customer: "Can I return a shirt I bought last month?"

Chatbot: "Yes, you can return items within 30 days of the date of purchase."`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!NOVAKEY_API_KEY) {
      return NextResponse.json(
        { error: 'NovaKey API key not configured. Please add NOVAKEY_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    // Call NovaKey proxy API
    const response = await fetch(NOVAKEY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apiKey: NOVAKEY_API_KEY,
        modelId: MODEL_ID,
        systemPrompt: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error || 'Failed to get AI response' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      response: data.response,
      creditsUsed: data.creditsUsed,
      creditsRemaining: data.creditsRemaining,
    });
  } catch (error: any) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error.message },
      { status: 500 }
    );
  }
}
