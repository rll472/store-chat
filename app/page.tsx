'use client';

import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse('Error: Could not get AI response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
        🤖 store-chat
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Powered by gpt-4o-mini
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="input" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Your message:
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: loading ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </form>

      {response && (
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          border: '1px solid #ddd',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            AI Response:
          </h3>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {response}
          </p>
        </div>
      )}

      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #ddd', textAlign: 'center', color: '#666', fontSize: '0.875rem' }}>
        Built with <a href="https://novakey.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3' }}>NovaKey</a>
      </footer>
    </div>
  );
}
