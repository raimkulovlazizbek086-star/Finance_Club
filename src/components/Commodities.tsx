import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Commodity {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
}

export default function Commodities() {
  const [commodities, setCommodities] = useState<Commodity[]>([]);

  useEffect(() => {
    const initialCommodities: Commodity[] = [
      { symbol: 'GC', name: 'Gold', price: 2089.50, change: 15.30, changePercent: 0.74, unit: '/oz' },
      { symbol: 'SI', name: 'Silver', price: 24.67, change: -0.23, changePercent: -0.92, unit: '/oz' },
      { symbol: 'CL', name: 'Crude Oil', price: 76.84, change: 1.45, changePercent: 1.92, unit: '/bbl' },
      { symbol: 'NG', name: 'Natural Gas', price: 2.89, change: -0.08, changePercent: -2.69, unit: '/MMBtu' },
      { symbol: 'HG', name: 'Copper', price: 3.87, change: 0.05, changePercent: 1.31, unit: '/lb' },
      { symbol: 'PL', name: 'Platinum', price: 945.20, change: 8.60, changePercent: 0.92, unit: '/oz' },
    ];

    setCommodities(initialCommodities);

    const interval = setInterval(() => {
      setCommodities((prev) =>
        prev.map((commodity) => {
          const changeAmount = (Math.random() - 0.5) * (commodity.price * 0.002);
          const newPrice = commodity.price + changeAmount;
          const newChange = commodity.change + changeAmount;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          return {
            ...commodity,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Commodities</h3>
      <div className="space-y-3">
        {commodities.map((commodity) => (
          <div key={commodity.symbol} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{commodity.name}</div>
              <div className="text-sm text-gray-500">{commodity.symbol}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">
                ${commodity.price.toFixed(2)}{commodity.unit}
              </div>
              <div className={`flex items-center justify-end text-sm font-semibold ${commodity.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {commodity.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)} ({commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
