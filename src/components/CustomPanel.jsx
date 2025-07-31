import React from 'react'

export default function CustomPanel() {
  return (
    <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 z-10">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        🔧 Node Controls
      </h3>
      
      <div className="space-y-3">
        <div className="text-sm text-gray-600">
          Select a node to see available actions
        </div>
        
        <div className="border-t pt-3">
          <h4 className="font-medium text-gray-700 mb-2">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition-colors">
              Zoom In
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm transition-colors">
              Zoom Out
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-sm transition-colors col-span-2">
              Fit View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
