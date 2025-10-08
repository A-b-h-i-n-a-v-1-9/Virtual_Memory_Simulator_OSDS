import { useState, useEffect } from "react";
import FrameView from "./components/FrameView";
import Controls from "./components/Controls";
import ReferenceBar from "./components/ReferenceBar";
import ExplanationBox from "./components/ExplanationBox";
import Stats from "./components/Stats";
import AlgorithmSelector from "./components/AlgorithmSelector";
import { simulateFIFO, simulateLRU, simulateOPT } from "./utils/algorithms";
import type { Step } from "./utils/algorithms";

export default function App() {
  const [referenceString, setReferenceString] = useState<number[]>([7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]);
  const [frameCount, setFrameCount] = useState(3);
  const [algorithm, setAlgorithm] = useState("FIFO");
  const [index, setIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const simulateAlgorithm = (): Step[] => {
    switch (algorithm) {
      case "FIFO":
        return simulateFIFO(referenceString, frameCount);
      case "LRU":
        return simulateLRU(referenceString, frameCount);
      case "OPT":
        return simulateOPT(referenceString, frameCount);
      default:
        return simulateFIFO(referenceString, frameCount);
    }
  };

  const steps = simulateAlgorithm();
  const currentStep: Step = steps[index];

  const faultsSoFar = steps.slice(0, index + 1).filter(s => s.fault).length;
  const hitsSoFar = (index + 1) - faultsSoFar;

  const handleNext = () => {
    if (index < steps.length - 1) setIndex(index + 1);
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const handleReset = () => setIndex(0);

  const handleAlgorithmChange = (newAlgorithm: string) => {
    setAlgorithm(newAlgorithm);
    setIndex(0);
  };

  const handleFrameCountChange = (count: number) => {
    setFrameCount(count);
    setIndex(0);
  };

  const handleReferenceStringChange = (newRefString: number[]) => {
    setReferenceString(newRefString);
    setIndex(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // ✅ Fixed type for interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && index < steps.length - 1) {
      interval = setInterval(() => {
        setIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, index, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-900 mb-3">Virtual Memory Simulator</h1>
          <p className="text-xl text-indigo-700 max-w-2xl mx-auto">An interactive tool to visualize demand paging and page replacement algorithms.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <AlgorithmSelector 
              algorithm={algorithm} 
              onAlgorithmChange={handleAlgorithmChange}
              frameCount={frameCount}
              onFrameCountChange={handleFrameCountChange}
              referenceString={referenceString}
              onReferenceStringChange={handleReferenceStringChange}
            />
            <Stats hits={hitsSoFar} faults={faultsSoFar} total={referenceString.length} />
          </div>

          {/* Main */}
          <div className="lg:col-span-4 space-y-6">
            {showIntro && (
              <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6 lg:p-8 relative overflow-hidden">
                <button 
                  onClick={() => setShowIntro(false)}
                  className="absolute top-4 right-4 text-indigo-400 hover:text-indigo-600 transition-colors"
                >
                  ✖
                </button>
                <h2 className="text-2xl font-bold mb-4 text-indigo-900">Understanding Demand Paging</h2>
                <p className="mb-2 text-indigo-800">Demand paging is a memory management strategy in modern operating systems. Pages are loaded into memory only when needed, optimizing usage.</p>
                <p className="mb-2 text-indigo-800">When a requested page isn’t in memory, a <span className="font-semibold text-red-600">page fault</span> occurs. The OS selects a victim page to replace and loads the required one.</p>
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-900">Reference String Sequence</h3>
              <ReferenceBar refs={referenceString} currentIndex={index} />
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-900">Physical Memory Frames</h3>
              <FrameView 
                frames={currentStep.frames} 
                current={currentStep.page} 
                fault={currentStep.fault} 
                replacedPage={currentStep.replacedPage} 
              />
            </div>

            <ExplanationBox 
              text={currentStep.explanation} 
              algorithm={algorithm}
              fault={currentStep.fault}
              step={currentStep}
            />

            <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-6">
              <Controls 
                onPrev={handlePrev} 
                onNext={handleNext} 
                onReset={handleReset} 
                onAutoPlay={toggleAutoPlay} 
                isAutoPlaying={isAutoPlaying} 
              />
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-indigo-700">Step {index + 1} / {steps.length}</p>
                {index === steps.length - 1 && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow mt-2 inline-block">
                    Complete
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-sm text-indigo-600">
          <p>Developed as an educational tool for operating systems concepts.</p>
          {!showIntro && (
            <button 
              onClick={() => setShowIntro(true)}
              className="mt-3 text-indigo-700 hover:text-indigo-900 font-semibold inline-flex items-center transition-colors"
            >
              Reopen Introduction
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
