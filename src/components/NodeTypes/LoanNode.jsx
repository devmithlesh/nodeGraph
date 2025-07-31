import { Handle, Position } from '@xyflow/react'

export default function LoanNode({ data, selected }) {
  return (
    <div className={`bg-white border-2 text-center p-4 rounded-lg shadow-lg transition-all ${
      selected ? 'border-green-500 shadow-xl' : 'border-gray-200'
    }`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-green-500"
      />
      
      <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
        <span className="text-2xl">💵</span>
      </div>
      
      <div className="font-semibold text-gray-800 mb-1">Loan</div>
      <div className="text-sm text-gray-600 whitespace-pre-wrap">{data.label}</div>
      
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 !bg-green-500"
      />
    </div>
  )
}
