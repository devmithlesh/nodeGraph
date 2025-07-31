import dagre from 'dagre';

const graph = new dagre.graphlib.Graph();
graph.setDefaultEdgeLabel(() => ({}));
const width = 172;
const height = 36;

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  graph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    graph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    graph.setEdge(edge.source, edge.target);
  });

  dagre.layout(graph);

  return {
    nodes: nodes.map((node) => {
      const pos = graph.node(node.id);
      return {
        ...node,
        position: {
          x: pos.x - width / 2,
          y: pos.y - height / 2,
        },
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
      };
    }),
    edges,
  };
};
