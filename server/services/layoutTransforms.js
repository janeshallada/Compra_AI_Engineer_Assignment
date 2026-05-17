/**
 * Resize the artboard and recompute all child absolute coordinates
 * from their normalized (nx, ny, nw, nh) values.
 */
export function resizeArtboard(layout, newWidth, newHeight) {
  const updated = JSON.parse(JSON.stringify(layout));
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];

  artboard.width = newWidth;
  artboard.height = newHeight;

  artboard.children.forEach((childId) => {
    const node = updated.nodes[childId];
    if (!node) return;
    node.x = node.nx * newWidth;
    node.y = node.ny * newHeight;
    node.width = node.nw * newWidth;
    node.height = node.nh * newHeight;
    // Update fontSizeRatio-based fontSize if text
    if (node.type === 'text' && node.fontSizeRatio) {
      node.style.visual.fontSize = Math.round(node.fontSizeRatio * newWidth);
    }
  });

  return updated;
}

/**
 * Move a node to a semantic position: top, bottom, center, left, right
 */
export function moveNode(layout, nodeId, position) {
  const updated = JSON.parse(JSON.stringify(layout));
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];
  const node = updated.nodes[nodeId];
  if (!node) return updated;

  switch (position) {
    case 'top':
      node.ny = 0.03;
      node.y = node.ny * artboard.height;
      break;
    case 'bottom':
      node.ny = 0.88;
      node.y = node.ny * artboard.height;
      break;
    case 'center':
      node.nx = 0.5 - node.nw / 2;
      node.ny = 0.5 - node.nh / 2;
      node.x = node.nx * artboard.width;
      node.y = node.ny * artboard.height;
      break;
    case 'left':
      node.nx = 0.02;
      node.x = node.nx * artboard.width;
      break;
    case 'right':
      node.nx = 0.98 - node.nw;
      node.x = node.nx * artboard.width;
      break;
    case 'higher':
      node.ny = Math.max(0, node.ny - 0.08);
      node.y = node.ny * artboard.height;
      break;
    case 'lower':
      node.ny = Math.min(0.95, node.ny + 0.08);
      node.y = node.ny * artboard.height;
      break;
  }

  return updated;
}

/**
 * Scale a node's size by a multiplier
 */
export function scaleNode(layout, nodeId, scale) {
  const updated = JSON.parse(JSON.stringify(layout));
  const rootId = updated.rootNodes[0];
  const artboard = updated.nodes[rootId];
  const node = updated.nodes[nodeId];
  if (!node) return updated;

  node.width *= scale;
  node.height *= scale;
  node.nw = node.width / artboard.width;
  node.nh = node.height / artboard.height;

  if (node.type === 'text' && node.style?.visual?.fontSize) {
    node.style.visual.fontSize = Math.round(node.style.visual.fontSize * scale);
    node.fontSizeRatio = node.style.visual.fontSize / artboard.width;
  }

  return updated;
}
