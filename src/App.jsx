import React from 'react'
import { ReactFlow, ReactFlowProvider, Controls, Background, ConnectionLineType } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CustomPanel from './components/CustomPanel'
import NodeDetailsPanel from './components/NodeDetailsPanel'
import Sidebar from './components/Sidebar'
import { nodeTypes } from './utils/nodeTypes'
import { useNodeStore } from './store/nodeStore'

export default function App() {
  const { 
    nodes = [], 
    edges = [], 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    setSelectedNode
  } = useNodeStore();

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 h-full flex">
          <div className="flex-1 h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={(event, node) => setSelectedNode(node)}
              onPaneClick={() => setSelectedNode(null)}
              fitView
              nodeTypes={nodeTypes}
              style={{ width: '100%', height: '100%' }}
              className="bg-white"
              connectionLineType={ConnectionLineType.SmoothStep}
              connectionLineStyle={{ stroke: '#6366f1', strokeWidth: 2 }}
              defaultEdgeOptions={{
                type: 'smoothstep',
                animated: true,
                style: {
                  stroke: '#6366f1',
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.2))',
                },
                markerEnd: {
                  type: 'arrowclosed',
                  color: '#6366f1',
                  width: 20,
                  height: 20,
                },
              }}
            >
              <Background color="#e5e7eb" gap={20} />
              <Controls />
            </ReactFlow>
            <CustomPanel />
          </div>
          <NodeDetailsPanel />
        </div>
      </div>
    </ReactFlowProvider>
  )
}
