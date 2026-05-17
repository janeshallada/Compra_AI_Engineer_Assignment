export function validateLayout(layout) {
  if (!layout) throw new Error('Layout is null or undefined');
  if (!Array.isArray(layout.rootNodes)) throw new Error('rootNodes must be an array');
  if (typeof layout.nodes !== 'object' || layout.nodes === null) throw new Error('nodes must be an object');

  for (const id of layout.rootNodes) {
    if (!layout.nodes[id]) throw new Error(`Missing root node: ${id}`);
  }

  const rootId = layout.rootNodes[0];
  const artboard = layout.nodes[rootId];
  if (!artboard.children || !Array.isArray(artboard.children)) {
    throw new Error('Artboard must have a children array');
  }
  if (typeof artboard.width !== 'number' || typeof artboard.height !== 'number') {
    throw new Error('Artboard must have numeric width and height');
  }

  return true;
}
