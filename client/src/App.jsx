import { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import WireframePreview from './components/WireframePreview';
import JsonViewer from './components/JsonViewer';
import { useLayoutAgent } from './hooks/useLayoutAgent';
import './App.css';

export default function App() {
  const { layout, messages, loading, sendMessage, resetLayout } = useLayoutAgent();
  const [activeTab, setActiveTab] = useState('wireframe');

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];

  return (
    <div className="app">
      {/* Left Panel — Chat */}
      <div className="panel-left">
        <div className="panel-header">
          <div className="status-dot" />
          <h1>Layout Agent</h1>
          <button className="reset-btn" onClick={resetLayout} title="Reset layout">↺</button>
        </div>
        <ChatWindow messages={messages} loading={loading} />
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>

      {/* Right Panel — Preview / JSON */}
      <div className="panel-right">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'wireframe' ? 'active' : ''}`}
            onClick={() => setActiveTab('wireframe')}
          >
            Wireframe
          </button>
          <button
            className={`tab ${activeTab === 'json' ? 'active' : ''}`}
            onClick={() => setActiveTab('json')}
          >
            JSON
          </button>
          <span className="canvas-badge">
            {artboard.width} × {artboard.height}
          </span>
        </div>

        {activeTab === 'wireframe' && (
          <div className="tab-content">
            <WireframePreview layout={layout} />
          </div>
        )}
        {activeTab === 'json' && (
          <div className="tab-content">
            <JsonViewer layout={layout} />
          </div>
        )}
      </div>
    </div>
  );
}
