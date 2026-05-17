import { useEffect, useRef } from 'react';

const NODE_COLORS = {
  image: { bg: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.6)' },
  text: { bg: 'rgba(251,191,36,0.25)', border: '1px solid rgba(251,191,36,0.7)' },
  shape: { bg: 'rgba(239,68,68,0.25)', border: '1px solid rgba(239,68,68,0.6)' }
};

export default function WireframePreview({ layout }) {
  const wrapRef = useRef(null);

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];
  const aspectRatio = artboard.height / artboard.width;

  return (
    <div className="wireframe-wrap" ref={wrapRef}>
      <div
        className="wireframe-stage"
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${aspectRatio * 100}%`,
          background: artboard.data?.backgroundColor || '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
        }}
      >
        {artboard.children.map((id) => {
          const node = layout.nodes[id];
          if (!node) return null;

          const colors = NODE_COLORS[node.type] || { bg: '#ddd', border: '1px solid #aaa' };
          const isCircle = node.data?.shapeType === 'circle';
          const fillColor = node.style?.visual?.fill?.value;
          const bg = fillColor && node.type === 'shape' ? `${fillColor}90` : colors.bg;

          const label = node.data?.content
            ? node.data.content.replace(/\n/g, ' ').substring(0, 24)
            : node.name.substring(0, 20);

          return (
            <div
              key={id}
              title={`${node.name} (${node.type})`}
              style={{
                position: 'absolute',
                left: `${node.nx * 100}%`,
                top: `${node.ny * 100}%`,
                width: `${node.nw * 100}%`,
                height: `${node.nh * 100}%`,
                background: bg,
                border: colors.border,
                borderRadius: isCircle ? '50%' : 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'all 0.4s ease'
              }}
            >
              <span style={{ fontSize: '9px', opacity: 0.9, textAlign: 'center', padding: 2, lineHeight: 1.2, wordBreak: 'break-word' }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, marginTop: 10, fontSize: 11, color: '#666' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, background: 'rgba(59,130,246,0.3)', border: '1px solid rgba(59,130,246,0.6)', borderRadius: 2, display: 'inline-block' }} />
          Image
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, background: 'rgba(251,191,36,0.3)', border: '1px solid rgba(251,191,36,0.7)', borderRadius: 2, display: 'inline-block' }} />
          Text
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, background: 'rgba(239,68,68,0.3)', border: '1px solid rgba(239,68,68,0.6)', borderRadius: 2, display: 'inline-block' }} />
          Shape
        </span>
      </div>
    </div>
  );
}
