// components/AlgorithmSelector.tsx (Compact version)
interface AlgorithmSelectorProps {
  algorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  frameCount: number;
  onFrameCountChange: (count: number) => void;
  referenceString: number[];
  onReferenceStringChange: (refString: number[]) => void;
}

export default function AlgorithmSelector({ 
  algorithm, 
  onAlgorithmChange, 
  frameCount, 
  onFrameCountChange,
  referenceString,
  onReferenceStringChange 
}: AlgorithmSelectorProps) {
  const algorithms = [
    { id: "FIFO", name: "FIFO", description: "Evicts oldest page" },
    { id: "LRU", name: "LRU", description: "Evicts least recently used" },
    { id: "OPT", name: "OPT", description: "Optimal (theoretical)" }
  ];

  const handleRefStringInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newRefString = value.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num) && num >= 0);
    if (newRefString.length > 0 && newRefString.length <= 20) {
      onReferenceStringChange(newRefString);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-indigo-100">
      <h2 className="text-lg font-semibold mb-3 text-indigo-800">Configuration</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2 text-indigo-700">Algorithm</h3>
          <div className="grid grid-cols-3 gap-2">
            {algorithms.map(algo => (
              <button
                key={algo.id}
                onClick={() => onAlgorithmChange(algo.id)}
                className={`p-2 text-xs rounded-lg border transition-colors ${
                  algorithm === algo.id 
                    ? 'bg-indigo-100 border-indigo-500 text-indigo-800 font-medium' 
                    : 'bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50'
                }`}
                title={algo.description}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-indigo-700">Frames: {frameCount}</h3>
          </div>
          <input
            type="range"
            min="1"
            max="7"
            value={frameCount}
            onChange={(e) => onFrameCountChange(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-1 text-indigo-700">Reference String</h3>
          <input
            type="text"
            value={referenceString.join(', ')}
            onChange={handleRefStringInput}
            className="w-full p-2 text-sm border border-indigo-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g., 7, 0, 1, 2, 0, 3"
          />
        </div>
      </div>
    </div>
  );
}