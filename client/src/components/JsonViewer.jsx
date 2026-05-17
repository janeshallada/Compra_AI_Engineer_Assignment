import { useState } from 'react';

export default function JsonViewer({ layout }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(layout, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];

  return (
    <div className="json-viewer">
      <div className="json-toolbar">
        <span className="json-info">
          {artboard.width} × {artboard.height} · {artboard.children.length} layers
        </span>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copied' : 'Copy JSON'}
        </button>
      </div>
      <pre className="json-pre">{JSON.stringify(layout, null, 2)}</pre>
    </div>
  );
}
