interface ControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
  onAutoPlay: () => void;
  isAutoPlaying: boolean;
}

export default function Controls({ onPrev, onNext, onReset, onAutoPlay, isAutoPlaying }: ControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button 
        onClick={onPrev} 
        className="col-span-1 px-4 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Previous
      </button>
      <button 
        onClick={onNext} 
        className="col-span-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        Next Step
      </button>
      <button 
        onClick={onReset} 
        className="col-span-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
        Reset
      </button>
      <button 
        onClick={onAutoPlay} 
        className="col-span-1 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        {isAutoPlaying ? 'Pause' : 'Auto-Play'}
      </button>
    </div>
  );
}