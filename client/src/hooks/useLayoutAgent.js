import { useState } from 'react';
import axios from 'axios';
import initialLayout from '../data/initialLayout.json';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function useLayoutAgent() {
  const [layout, setLayout] = useState(initialLayout);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hey! I can transform this Instagram Post layout. Try resizing to 9:16, repositioning elements, or changing text sizes. What would you like to change?'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_BASE}/api/chat`, {
        message: text,
        layout,
        history: history.slice(-6)
      });

      setLayout(data.updatedLayout);

      const assistantMsg = { role: 'assistant', content: data.explanation };
      setMessages((prev) => [...prev, assistantMsg]);

      setHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: data.explanation }
      ]);

    } catch (err) {
      const errorMsg = {
        role: 'assistant',
        content: `Sorry, something went wrong: ${err.response?.data?.error || err.message}`
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const resetLayout = () => {
    setLayout(initialLayout);
    setHistory([]);
    setMessages([
      {
        role: 'assistant',
        content: 'Layout reset to original. What would you like to change?'
      }
    ]);
  };

  return { layout, messages, loading, sendMessage, resetLayout };
}
