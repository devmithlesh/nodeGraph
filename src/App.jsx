import React from 'react'
import { ReactFlow, ReactFlowProvider, Controls, Background } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CustomPanel from './components/CustomPanel'
import Sidebar from './components/Sidebar'
import { nodeTypes } from './utils/nodeTypes'
import { useNodeStore } from './store/nodeStore'

export default function App() {
  const { 
    nodes = [], 
    edges = [], 
    onNodesChange, 
    onEdgesChange, 
    onConnect 
  } = useNodeStore();

  return (
    <ReactFlowProvider>
      <div className="h-screen w-full flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodeTypes={nodeTypes}
            style={{ width: '100%', height: '100%' }}
            className="bg-white"
          >
            <Background color="#e5e7eb" gap={20} />
            <Controls />
          </ReactFlow>
          <CustomPanel />
        </div>
      </div>
    </ReactFlowProvider>
  )
}
