import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export default function StockPrices() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const initialStocks: Stock[] = [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 215.32, change: 2.14, changePercent: 1.00 },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 425.67, change: -3.45, changePercent: -0.80 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.89, change: 1.78, changePercent: 1.26 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.23, change: 4.32, changePercent: 2.48 },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 242.56, change: -5.67, changePercent: -2.28 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 523.45, change: 8.92, changePercent: 1.73 },
    ];

    setStocks(initialStocks);

    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((stock) => {
          const changeAmount = (Math.random() - 0.5) * 0.5;
          const newPrice = stock.price + changeAmount;
          const newChange = stock.change + changeAmount;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          return {
            ...stock,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Stock Prices</h3>
      <div className="space-y-3">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{stock.symbol}</div>
              <div className="text-sm text-gray-500">{stock.name}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-gray-900">
                ${stock.price.toFixed(2)}
              </div>
              <div className={`flex items-center justify-end text-sm font-semibold ${stock.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {stock.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
