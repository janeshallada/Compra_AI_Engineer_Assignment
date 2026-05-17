import { useEffect, useRef } from 'react';

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="chat-messages">
      {messages.map((msg, i) => (
        <div key={i} className={`message message-${msg.role}`}>
          <div className="message-bubble">{msg.content}</div>
        </div>
      ))}
      {loading && (
        <div className="message message-assistant">
          <div className="message-bubble loading-bubble">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
