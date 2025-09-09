// components/ExplanationBox.tsx (Updated with arrows and more detailed, algorithm-specific explanations)
import { motion } from "framer-motion";

interface ExplanationBoxProps {
  text: string;
  algorithm: string;
  fault: boolean;
  step: any;
}

export default function ExplanationBox({ text, algorithm, fault, step }: ExplanationBoxProps) {
  const getAlgorithmSpecificExplanation = () => {
    if (!fault) return "";
    switch (algorithm) {
      case "FIFO":
        return "FIFO selects the page that has been in memory the longest (first-in). This can lead to suboptimal replacements if the oldest page is still frequently used.";
      case "LRU":
        return "LRU tracks usage timestamps and replaces the page with the oldest timestamp (least recently used). This approximates optimal behavior for programs with locality.";
      case "OPT":
        return "OPT looks ahead in the reference string to replace the page that won't be needed for the longest time. This is a theoretical minimum for faults.";
      default:
        return "";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-indigo-100 p-8"
    >
      <div className="flex items-center mb-6">
        <div className={`w-5 h-5 rounded-full mr-4 shadow ${fault ? 'bg-red-500' : 'bg-green-500'}`}></div>
        <h3 className="text-xl font-semibold text-indigo-900">
          {fault ? `Page Fault - ${algorithm} Replacement` : "Page Hit - No Replacement Needed"}
        </h3>
      </div>
      
      <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shadow-inner">
        <p className="text-indigo-800 leading-relaxed">{text}</p>
        <p className="mt-3 text-indigo-700 italic">{getAlgorithmSpecificExplanation()}</p>
      </div>
      
      {/* Visual Explanation with Arrows */}
      <div className={`p-6 rounded-xl border shadow-sm ${fault ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
        <h4 className="font-medium mb-4 ${fault ? 'text-red-800' : 'text-green-800'}">Step Visualization:</h4>
        <div className="flex flex-col space-y-4 items-center">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold shadow ${fault ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              {step.page}
            </div>
            <span className="text-indigo-800 font-medium">{fault ? 'Not in memory' : 'Found in memory'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <div className={`px-4 py-2 rounded-full font-medium text-sm shadow ${fault ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
              {fault ? 'Page Fault' : 'Page Hit'}
            </div>
          </div>
          
          {fault && step.replacedPage !== undefined && (
            <div className="flex items-center space-x-4 mt-4">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-100 text-amber-800 rounded-xl font-bold shadow">
                {step.replacedPage}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="text-indigo-800 font-medium">Evicted</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-800 rounded-xl font-bold shadow">
                {step.page}
              </div>
              <span className="text-indigo-800 font-medium">Loaded</span>
            </div>
          )}
          
          {fault && step.replacedPage === undefined && (
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-indigo-800 font-medium">Empty Frame</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-800 rounded-xl font-bold shadow">
                {step.page}
              </div>
              <span className="text-indigo-800 font-medium">Loaded Directly</span>
            </div>
          )}
          
          {!fault && algorithm === "LRU" && (
            <div className="flex items-center space-x-4 mt-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-800 rounded-xl font-bold shadow">
                {step.page}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-indigo-800 font-medium">Timestamp Updated</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}