import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Mover {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function TopMovers() {
  const [gainers, setGainers] = useState<Mover[]>([]);
  const [losers, setLosers] = useState<Mover[]>([]);

  useEffect(() => {
    const initialGainers: Mover[] = [
      { symbol: 'AMD', name: 'Advanced Micro Devices', price: 187.45, change: 15.67, changePercent: 9.13 },
      { symbol: 'PLTR', name: 'Palantir Technologies', price: 24.89, change: 2.34, changePercent: 10.37 },
      { symbol: 'RIVN', name: 'Rivian Automotive', price: 18.92, change: 1.67, changePercent: 9.68 },
      { symbol: 'SNAP', name: 'Snap Inc.', price: 12.45, change: 1.12, changePercent: 9.88 },
      { symbol: 'COIN', name: 'Coinbase Global', price: 167.23, change: 13.45, changePercent: 8.74 },
    ];

    const initialLosers: Mover[] = [
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 478.23, change: -45.67, changePercent: -8.72 },
      { symbol: 'PYPL', name: 'PayPal Holdings', price: 62.34, change: -5.89, changePercent: -8.63 },
      { symbol: 'ZM', name: 'Zoom Video Communications', price: 68.12, change: -6.23, changePercent: -8.38 },
      { symbol: 'SPOT', name: 'Spotify Technology', price: 187.45, change: -16.78, changePercent: -8.22 },
      { symbol: 'UBER', name: 'Uber Technologies', price: 67.89, change: -5.67, changePercent: -7.71 },
    ];

    setGainers(initialGainers);
    setLosers(initialLosers);

    const interval = setInterval(() => {
      setGainers((prev) =>
        prev.map((mover) => {
          const adjustment = (Math.random() - 0.4) * 0.3;
          const newPrice = mover.price * (1 + adjustment / 100);
          const newChange = mover.change + (mover.price * adjustment / 100);
          const newChangePercent = mover.changePercent + adjustment;
          return {
            ...mover,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );

      setLosers((prev) =>
        prev.map((mover) => {
          const adjustment = (Math.random() - 0.6) * 0.3;
          const newPrice = mover.price * (1 + adjustment / 100);
          const newChange = mover.change + (mover.price * adjustment / 100);
          const newChangePercent = mover.changePercent + adjustment;
          return {
            ...mover,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
          <h3 className="text-xl font-bold text-gray-900">Top Gainers</h3>
        </div>
        <div className="space-y-3">
          {gainers.map((gainer, index) => (
            <div key={gainer.symbol} className="flex items-center p-3 border border-emerald-100 rounded-lg bg-emerald-50/30 hover:bg-emerald-50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm mr-3">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{gainer.symbol}</div>
                <div className="text-sm text-gray-500 truncate">{gainer.name}</div>
              </div>
              <div className="text-right ml-3">
                <div className="font-bold text-gray-900">${gainer.price.toFixed(2)}</div>
                <div className="text-sm font-semibold text-emerald-600">
                  +{gainer.change.toFixed(2)} (+{gainer.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingDown className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-bold text-gray-900">Top Losers</h3>
        </div>
        <div className="space-y-3">
          {losers.map((loser, index) => (
            <div key={loser.symbol} className="flex items-center p-3 border border-red-100 rounded-lg bg-red-50/30 hover:bg-red-50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-red-100 text-red-700 rounded-full font-bold text-sm mr-3">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{loser.symbol}</div>
                <div className="text-sm text-gray-500 truncate">{loser.name}</div>
              </div>
              <div className="text-right ml-3">
                <div className="font-bold text-gray-900">${loser.price.toFixed(2)}</div>
                <div className="text-sm font-semibold text-red-600">
                  {loser.change.toFixed(2)} ({loser.changePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
