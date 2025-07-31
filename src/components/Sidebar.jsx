import React from 'react'
import { useNodeStore } from '../store/nodeStore'

export default function Sidebar() {
  const { addNode, nodes = [], edges = [] } = useNodeStore();

  const addAccountNode = () => {
    addNode('account');
  };

  const addLoanNode = () => {
    addNode('loan');
  };

  return (
    <div className="w-80 p-4 bg-white shadow-lg border-r border-gray-200">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          🌳 Node Editor
        </h2>
        <p className="text-sm text-gray-600">Build your tree structure</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Getting Started</h3>
        <p className="text-sm text-gray-600 mb-4">
          Create root nodes by clicking the buttons below. Only Account and Loan can be root nodes.
        </p>
        
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700">Add Root Nodes</h4>
          <button 
            onClick={addAccountNode}
            className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-3 text-left rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">📄</span>
              <div>
                <div className="font-medium text-blue-800">Add Account</div>
                <div className="text-xs text-blue-600">Represents a customer's account</div>
              </div>
            </div>
          </button>
          
          <button 
            onClick={addLoanNode}
            className="w-full bg-green-50 hover:bg-green-100 border border-green-200 px-4 py-3 text-left rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <span className="text-xl mr-3">💵</span>
              <div>
                <div className="font-medium text-green-800">Add Loan</div>
                <div className="text-xs text-green-600">A loan issued to an account</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Statistics</h3>
        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Nodes:</span>
            <span className="font-medium">{nodes.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Connections:</span>
            <span className="font-medium">{edges.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <h4 className="font-medium text-amber-800 mb-2 flex items-center">
          💡 Quick Tips
        </h4>
        <ul className="text-xs text-amber-700 space-y-1">
          <li>• Click any node to view details and add children</li>
          <li>• Use the side panel to manage node relationships</li>
          <li>• Delete nodes removes all descendants</li>
        </ul>
      </div>
    </div>
  )
}
