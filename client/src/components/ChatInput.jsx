import { useState, useRef } from 'react';

const QUICK_PROMPTS = [
  'Convert to 9:16',
  'Move headline to the top',
  'Keep the product large',
  'Move the offer badge higher',
  'Make the headline smaller',
  'Convert to 16:9',
  'Center the product',
  'Make the discount badge bigger'
];

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (!text.trim() || loading) return;
    onSend(text.trim());
    setText('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  return (
    <div className="chat-input-area">
      <div className="quick-prompts">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            className="quick-prompt"
            onClick={() => { setText(p); textareaRef.current?.focus(); }}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="input-row">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKey}
          placeholder="Type an instruction..."
          rows={1}
          disabled={loading}
        />
        <button className="send-btn" onClick={handleSend} disabled={loading || !text.trim()}>
          ↑
        </button>
      </div>
    </div>
  );
}
