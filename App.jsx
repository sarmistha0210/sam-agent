import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'sam', text: 'Hi — I\'m Sam. Type a message and press Send.' },
  ]);
  const [input, setInput] = useState('');

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { id: Date.now(), from: 'you', text: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    // Simulate a Sam response (replace with real API call later)
    setTimeout(() => {
      const samReply = {
        id: Date.now() + 1,
        from: 'sam',
        text: `Sam (demo): I received "${trimmed}".`,
      };
      setMessages((m) => [...m, samReply]);
    }, 600);
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') send();
  }

  return (
    <div style={{ fontFamily: 'Segoe UI, Roboto, Arial', padding: 20, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Sam — custom agent (demo)</h2>
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 12,
          minHeight: 200,
          background: '#fafafa',
          overflowY: 'auto',
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              marginBottom: 10,
              display: 'flex',
              justifyContent: m.from === 'you' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                background: m.from === 'you' ? '#0078d4' : '#e1e1e1',
                color: m.from === 'you' ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: 12,
                maxWidth: '80%',
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>{m.from}</div>
              <div>{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a message to Sam..."
          style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button onClick={send} style={{ padding: '8px 14px', borderRadius: 6 }}>
          Send
        </button>
      </div>

      <div style={{ marginTop: 14, fontSize: 12, color: '#666' }}>
        This is a local demo UI for Sam. If you have a backend or model integration, replace the simulated
        reply in <code>send()</code> with your API call.
      </div>
    </div>
  );
}
