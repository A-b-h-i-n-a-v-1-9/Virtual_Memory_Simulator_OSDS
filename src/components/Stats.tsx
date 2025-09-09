// components/Stats.tsx (Updated with progress bars for visual appeal)
interface StatsProps {
  hits: number;
  faults: number;
  total: number;
}

export default function Stats({ hits, faults, total }: StatsProps) {
  const hitRate = total > 0 ? (hits / total) * 100 : 0;
  const faultRate = total > 0 ? (faults / total) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100">
      <h3 className="text-xl font-semibold mb-6 text-indigo-900 border-b pb-3">Simulation Metrics</h3>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-green-800">Hits: {hits}</span>
            <span className="text-green-700">{hitRate.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${hitRate}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-medium text-red-800">Faults: {faults}</span>
            <span className="text-red-700">{faultRate.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-red-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: `${faultRate}%` }}></div>
          </div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl text-center border border-indigo-100 shadow-inner">
          <div className="text-sm font-medium text-indigo-700 mb-1">Total Page References</div>
          <div className="text-3xl font-bold text-indigo-900">{total}</div>
        </div>
      </div>
    </div>
  );
}