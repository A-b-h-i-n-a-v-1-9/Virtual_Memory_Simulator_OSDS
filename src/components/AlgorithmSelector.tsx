import { useState } from "react";
import { Plus, X, Shuffle } from "lucide-react";

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
  const [inputValue, setInputValue] = useState("");

  const algorithms = [
    { id: "FIFO", name: "FIFO", description: "Evicts oldest page" },
    { id: "LRU", name: "LRU", description: "Evicts least recently used" },
    { id: "OPT", name: "OPT", description: "Optimal (theoretical)" }
  ];

  const handleAddNumber = () => {
    const num = parseInt(inputValue.trim(), 10);
    if (isNaN(num) || num < 0) return; // only positive integers

    const newList = [...referenceString, num].slice(0, 20); // limit to 20 numbers
    onReferenceStringChange(newList);
    setInputValue("");
  };

  const handleRemove = (index: number) => {
    const updated = referenceString.filter((_, i) => i !== index);
    onReferenceStringChange(updated.length > 0 ? updated : []); // prevent crash
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddNumber();
    }
  };

  const handleRandomize = () => {
    const randomArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 10)
    );
    onReferenceStringChange(randomArray);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-indigo-100">
      <h2 className="text-lg font-semibold mb-3 text-indigo-800">Configuration</h2>

      <div className="space-y-5">
        {/* Algorithm Selection */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-indigo-700">Algorithm</h3>
          <div className="grid grid-cols-3 gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.id}
                onClick={() => onAlgorithmChange(algo.id)}
                className={`p-2 text-xs rounded-lg border transition-colors ${
                  algorithm === algo.id
                    ? "bg-indigo-100 border-indigo-500 text-indigo-800 font-medium"
                    : "bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                }`}
                title={algo.description}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Frame Count Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-indigo-700">
              Frames: {frameCount}
            </h3>
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

        {/* Reference String Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-sm font-medium text-indigo-700">
              Reference String
            </h3>
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 transition-colors"
              title="Generate random sequence"
            >
              <Shuffle size={14} /> Randomize
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-2 text-sm border border-indigo-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a number & press Enter"
            />
            <button
              onClick={handleAddNumber}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
              title="Add number"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Display added numbers */}
          <div className="flex flex-wrap gap-2 mt-3">
            {referenceString.length > 0 ? (
              referenceString.map((num, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm flex items-center gap-1"
                >
                  {num}
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-700 rounded-full p-0.5 transition-colors"
                    title="Remove number"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic">No numbers added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
