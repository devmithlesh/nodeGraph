import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { getLayoutedElements } from '../utils/layoutUtils';
import { allowedChildMap } from '../utils/nodeRules';

// Mock data for accounts and loans
const mockAccountData = {
  accountType: 'Savings Account',
  balance: 25430.50,
  status: 'Active',
  interestRate: 2.5,
  recentTransactions: [
    { type: 'Deposit', amount: 1200.00, date: '2024-12-01' },
    { type: 'Withdrawal', amount: -450.00, date: '2024-11-28' },
    { type: 'Interest Credit', amount: 52.30, date: '2024-11-30' }
  ]
};

const mockLoanData = {
  loanType: 'Personal Loan',
  principal: 15000.00,
  interestRate: 8.5,
  term: 36,
  monthlyPayment: 473.50,
  remainingBalance: 12450.00,
  paymentHistory: {
    lastPayment: 473.50,
    nextDueDate: '2024-12-15',
    daysPastDue: 0
  }
};

const mockCollateralData = {
  collateralType: 'Real Estate',
  assetValue: 250000.00,
  appraisalDate: '2024-11-15',
  status: 'Active',
  coverageRatio: 85.5,
  propertyDetails: {
    address: '123 Main St, City, State',
    propertyType: 'Residential',
    squareFootage: 2200,
    yearBuilt: 2010
  },
  insurance: {
    policyNumber: 'INS-2024-001',
    coverageAmount: 275000.00,
    expiryDate: '2025-06-30'
  }
};

export const useNodeStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  setSelectedNode: (node) => set({ selectedNode: node }),

  setLayoutedElements: ({ nodes, edges }) => set({ nodes, edges }),

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  connectNodes: (source, target) => {
    const newEdge = {
      id: `${source}-${target}`,
      source,
      target,
      type: 'smoothstep',
      animated: true,
    };
    const updatedEdges = [...get().edges, newEdge];
    set({ edges: updatedEdges });
  },

  addNode: (type, parentId = null) => {
    // Validate root node creation (only Account and Loan can be root)
    if (!parentId) {
      const rootTypes = ['account', 'loan'];
      if (!rootTypes.includes(type)) {
        console.error(`Cannot add ${type} as root node. Only Account and Loan can be root nodes.`);
        return;
      }
    }
    
    // Validate parent-child relationship
    if (parentId) {
      const parentNode = get().nodes.find(n => n.id === parentId);
      if (!parentNode) {
        console.error('Parent node not found');
        return;
      }
      
      // Extract base type from ReactFlow type (e.g., 'accountNode' -> 'account')
      const parentBaseType = parentNode.type.replace('Node', '').toLowerCase();
      const allowedChildren = allowedChildMap[parentBaseType] || [];
      if (!allowedChildren.includes(type)) {
        console.error(`Cannot add ${type} as child of ${parentBaseType}`);
        return;
      }
    }

    const id = uuid();
    
    // Add mock data based on node type
    let nodeData = { 
      label: `${type.charAt(0).toUpperCase() + type.slice(1)}`,
      id: id,
      type: type
    };

    if (type === 'account') {
      nodeData = { ...nodeData, ...mockAccountData };
    } else if (type === 'loan') {
      nodeData = { ...nodeData, ...mockLoanData };
    } else if (type === 'collateral') {
      nodeData = { ...nodeData, ...mockCollateralData };
    }

    const newNode = {
      id,
      type: `${type}Node`, // Convert 'account' to 'accountNode', etc.
      data: nodeData,
      position: { x: 0, y: 0 },
    };

    // Only create edge if there's a parent
    const newEdge = parentId
      ? { 
          id: `${parentId}-${id}`, 
          source: parentId, 
          target: id,
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
        }
      : null;

    const updatedNodes = [...get().nodes, newNode];
    const updatedEdges = newEdge ? [...get().edges, newEdge] : get().edges;
    const layouted = getLayoutedElements(updatedNodes, updatedEdges);
    set({ nodes: layouted.nodes, edges: layouted.edges });
  },

  deleteNode: (nodeId) => {
    const allNodes = get().nodes;
    const allEdges = get().edges;
    
    // Find all descendants by following edges
    const toDelete = [nodeId];
    const collectDescendants = (id) => {
      allEdges.forEach(edge => {
        if (edge.source === id) {
          toDelete.push(edge.target);
          collectDescendants(edge.target);
        }
      });
    };
    collectDescendants(nodeId);

    const remainingNodes = allNodes.filter(n => !toDelete.includes(n.id));
    const remainingEdges = allEdges.filter(e => !toDelete.includes(e.source) && !toDelete.includes(e.target));
    const layouted = getLayoutedElements(remainingNodes, remainingEdges);
    set({ nodes: layouted.nodes, edges: layouted.edges, selectedNode: null });
  },

  clearAll: () => {
    set({ nodes: [], edges: [], selectedNode: null });
  },

  // Create sample data demonstrating proper relationships
  createSampleData: () => {
    const sampleNodes = [
      {
        id: 'account-1',
        type: 'account',
        data: { 
          label: 'Account',
          id: 'account-1',
          type: 'account',
          ...mockAccountData
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'loan-1',
        type: 'loan',
        data: { 
          label: 'Loan',
          id: 'loan-1',
          type: 'loan',
          ...mockLoanData
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'collateral-1',
        type: 'collateral',
        data: { 
          label: 'Collateral',
          id: 'collateral-1',
          type: 'collateral',
          ...mockCollateralData
        },
        position: { x: 0, y: 0 },
      }
    ];

    const sampleEdges = [
      {
        id: 'account-1-loan-1',
        source: 'account-1',
        target: 'loan-1',
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
      },
      {
        id: 'loan-1-collateral-1',
        source: 'loan-1',
        target: 'collateral-1',
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
      }
    ];

    const layouted = getLayoutedElements(sampleNodes, sampleEdges);
    set({ nodes: layouted.nodes, edges: layouted.edges, selectedNode: null });
  },
}));