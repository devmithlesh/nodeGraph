import React from 'react'
import { useReactFlow } from '@xyflow/react'
import { useNodeStore } from '../store/nodeStore'
import { allowedChildMap } from '../utils/nodeRules'

export default function CustomPanel() {
  const { zoomIn, zoomOut, fitView, getViewport, setViewport } = useReactFlow();
  const { applyAutoLayout } = useNodeStore();

  const handleZoomIn = () => {
    zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    zoomOut({ duration: 300 });
  };

  const handleFitView = () => {
    fitView({ duration: 300, padding: 0.1 });
  };

  const handleResetView = () => {
    setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 300 });
  };

  const handleAutoLayout = () => {
    applyAutoLayout();
  };

  return (
    <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 z-10">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        🔧 Node Controls
      </h3>
      
      <div className="space-y-3">
          <div className="text-sm text-gray-600">
            Select a node to see available actions
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="text-sm font-medium text-blue-800 mb-2">How to Connect Nodes:</div>
            <div className="text-xs text-blue-700 space-y-1">
              <div>• Drag from <strong>bottom handle</strong> (output) to <strong>top handle</strong> (input)</div>
              <div>• Example: Drag from Account bottom → Loan top</div>
              <div>• Brighter handles = can connect FROM</div>
              <div>• Dimmer handles = can connect TO</div>
            </div>
          </div>
        
        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">Connection Rules</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <div>📄 Account → 💵 Loan, 🏦 Collateral</div>
            <div>💵 Loan → 🏦 Collateral</div>
            <div>🏦 Collateral → (no children)</div>
          </div>
          <div className="text-xs text-blue-600 mt-2 font-medium">
            💡 Drag FROM parent TO child
          </div>
        </div>
        
        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">View Controls</h4>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleZoomIn}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-sm transition-colors"
            >
              Zoom In
            </button>
            <button 
              onClick={handleZoomOut}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-sm transition-colors"
            >
              Zoom Out
            </button>
            <button 
              onClick={handleFitView}
              className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded text-sm transition-colors col-span-2"
            >
              Fit View
            </button>
            <button 
              onClick={handleResetView}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded text-sm transition-colors col-span-2"
            >
              Reset View
            </button>
            <button 
              onClick={handleAutoLayout}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded text-sm transition-colors col-span-2"
            >
              Auto Layout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
