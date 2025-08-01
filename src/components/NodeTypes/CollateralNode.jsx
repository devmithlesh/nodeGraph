import { Handle, Position } from '@xyflow/react'

export default function CollateralNode({ data, selected }) {
  return (
    <div className={`bg-white border-2 text-center p-4 rounded-lg shadow-lg transition-all ${
      selected ? 'border-purple-500 shadow-xl ring-2 ring-purple-200' : 'border-gray-200'
    }`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 !bg-purple-500"
        style={{ opacity: 0.3 }}
      />
      
      <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
        <span className="text-2xl">🏦</span>
      </div>
      
      <div className="font-semibold text-gray-800 mb-1">Collateral</div>
      <div className="text-sm text-gray-600">{data.label}</div>
    </div>
  )
}
