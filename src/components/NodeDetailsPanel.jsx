import React from 'react';
import { useNodeStore } from '../store/nodeStore';
import { allowedChildMap } from '../utils/nodeRules';

export default function NodeDetailsPanel() {
  const { selectedNode, nodes, addNode, deleteNode, setSelectedNode } = useNodeStore();

  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-4">👆</div>
          <h3 className="text-lg font-medium mb-2">Select a Node</h3>
          <p className="text-sm">Click on any node to view its details and manage it</p>
        </div>
      </div>
    );
  }

  const nodeType = selectedNode.type.replace('Node', '').toLowerCase();
  const allowedChildren = allowedChildMap[nodeType] || [];
  const { edges } = useNodeStore();
  const hasChildren = edges.some(edge => edge.source === selectedNode.id);

  const handleAddChild = (childType) => {
    addNode(childType, selectedNode.id);
  };

  const handleDeleteNode = () => {
    if (window.confirm(`Are you sure you want to delete this ${nodeType} and all its descendants?`)) {
      deleteNode(selectedNode.id);
      setSelectedNode(null);
    }
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'account': return '📄';
      case 'loan': return '💵';
      case 'collateral': return '🏦';
      default: return '📋';
    }
  };

  const getNodeColorClasses = (type) => {
    switch (type) {
      case 'account': return {
        bg: 'bg-blue-100',
        bgHover: 'hover:bg-blue-200',
        text: 'text-blue-800'
      };
      case 'loan': return {
        bg: 'bg-green-100',
        bgHover: 'hover:bg-green-200',
        text: 'text-green-800'
      };
      case 'collateral': return {
        bg: 'bg-purple-100',
        bgHover: 'hover:bg-purple-200',
        text: 'text-purple-800'
      };
      default: return {
        bg: 'bg-gray-100',
        bgHover: 'hover:bg-gray-200',
        text: 'text-gray-800'
      };
    }
  };

  const colorClasses = getNodeColorClasses(nodeType);

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`${colorClasses.bg} rounded-full w-12 h-12 flex items-center justify-center`}>
            <span className="text-2xl">{getNodeIcon(nodeType)}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">{nodeType}</h2>
            <p className="text-sm text-gray-500">ID: {selectedNode.id}</p>
          </div>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Node Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Node Details</h3>
        <div className="space-y-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-700">Type</div>
            <div className="text-sm text-gray-600 capitalize">{nodeType}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-700">Unique ID</div>
            <div className="text-sm text-gray-600 font-mono">{selectedNode.id}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-700">Label</div>
            <div className="text-sm text-gray-600">{selectedNode.data?.label || 'No label'}</div>
          </div>
        </div>
      </div>

      {/* Add Child Nodes */}
      {allowedChildren.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Add Child Node</h3>
          <div className="space-y-2">
            {allowedChildren.map((childType) => (
                             <button
                 key={childType}
                 onClick={() => handleAddChild(childType)}
                 className={`w-full ${getNodeColorClasses(childType).bg} ${getNodeColorClasses(childType).bgHover} ${getNodeColorClasses(childType).text} px-4 py-3 rounded-lg transition-colors flex items-center space-x-3`}
               >
                <span className="text-xl">{getNodeIcon(childType)}</span>
                <span className="font-medium capitalize">Add {childType}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Node Data Display */}
      {selectedNode.data && Object.keys(selectedNode.data).length > 3 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Node Data</h3>
          <div className="bg-gray-50 rounded-lg p-3">
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify(selectedNode.data, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Delete Node */}
      <div className="border-t pt-6">
        <button
          onClick={handleDeleteNode}
          className="w-full bg-red-100 hover:bg-red-200 text-red-800 px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          <span className="font-medium">
            Delete {nodeType} {hasChildren && '& Descendants'}
          </span>
        </button>
      </div>
    </div>
  );
} 