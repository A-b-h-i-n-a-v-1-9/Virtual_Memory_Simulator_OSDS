import { motion } from "framer-motion";

interface ReferenceBarProps {
  refs: number[];
  currentIndex: number;
}

export default function ReferenceBar({ refs, currentIndex }: ReferenceBarProps) {
  return (
    <div className="flex gap-2 justify-center flex-wrap max-w-5xl mx-auto p-2 overflow-x-auto">
      {refs.map((r, i) => (
        <motion.div 
          key={i} 
          className="relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: i === currentIndex ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div 
            className={`w-12 h-12 flex items-center justify-center rounded-lg font-medium text-lg shadow
              ${i === currentIndex ? 'bg-indigo-600 text-white' : i < currentIndex ? 'bg-indigo-200 text-indigo-900' : 'bg-white text-indigo-700 border border-indigo-300'}`}
            aria-label={`Page reference ${r}, ${i === currentIndex ? 'current' : i < currentIndex ? 'processed' : 'pending'}`}
          >
            {r}
          </div>
          {i === currentIndex && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-indigo-700 font-medium whitespace-nowrap text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm mt-1 block">Current</span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
}