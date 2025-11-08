import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export default function MarketIndices() {
  const [indices, setIndices] = useState<MarketIndex[]>([]);

  useEffect(() => {
    const initialIndices: MarketIndex[] = [
      { symbol: 'SPX', name: 'S&P 500', value: 4783.45, change: 23.67, changePercent: 0.50 },
      { symbol: 'DJI', name: 'Dow Jones', value: 37440.34, change: -89.23, changePercent: -0.24 },
      { symbol: 'IXIC', name: 'NASDAQ', value: 15043.97, change: 156.78, changePercent: 1.05 },
      { symbol: 'RUT', name: 'Russell 2000', value: 2045.78, change: 12.45, changePercent: 0.61 },
    ];

    setIndices(initialIndices);

    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((index) => {
          const changeAmount = (Math.random() - 0.5) * 5;
          const newValue = index.value + changeAmount;
          const newChange = index.change + changeAmount;
          const newChangePercent = (newChange / (newValue - newChange)) * 100;
          return {
            ...index,
            value: newValue,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Market Indices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {indices.map((index) => (
          <div key={index.symbol} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-500 mb-1">{index.symbol}</div>
                <div className="font-bold text-gray-900">{index.name}</div>
              </div>
              <div className={`flex items-center text-sm font-semibold ${index.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {index.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {index.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="flex items-center space-x-2">
              <span className={`font-semibold ${index.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
              </span>
              <span className={`text-sm ${index.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
