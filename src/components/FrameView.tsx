// components/FrameView.tsx (Updated with animations and replacement arrows)
import { motion } from "framer-motion";

interface FrameViewProps {
  frames: number[];
  current: number;
  fault: boolean;
  replacedPage?: number; // Added for arrow visualization
}

export default function FrameView({ frames, current, fault, replacedPage }: FrameViewProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 justify-center mb-8 relative">
        {frames.map((f, i) => (
          <div key={i} className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: f === current ? 1.1 : 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className={`w-20 h-20 flex items-center justify-center rounded-2xl text-2xl font-bold shadow-lg border-2
                ${f === current ? (fault ? 'border-red-500 bg-red-50 text-red-900' : 'border-green-500 bg-green-50 text-green-900') : 'border-indigo-200 bg-white text-indigo-900'}`}
            >
              {f !== -1 ? f : <span className="text-indigo-300">Empty</span>}
            </motion.div>
            {f === replacedPage && fault && (
              <motion.svg
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 h-6 w-6 text-red-600"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </motion.svg>
            )}
            {f === current && fault && replacedPage === undefined && (
              <motion.svg
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-6 w-6 text-green-600 rotate-180"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </motion.svg>
            )}
          </div>
        ))}
      </div>
      
      {/* Frame labels */}
      <div className="flex gap-6 justify-center">
        {frames.map((_, i) => (
          <div key={i} className="w-20 text-center text-sm font-medium text-indigo-700">
            Frame {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}