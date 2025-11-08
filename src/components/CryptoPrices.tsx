import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';

interface Crypto {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

export default function CryptoPrices() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    const initialCryptos: Crypto[] = [
      { symbol: 'BTC', name: 'Bitcoin', price: 43250.32, change24h: 2.45, marketCap: 845000000000, volume24h: 28500000000 },
      { symbol: 'ETH', name: 'Ethereum', price: 2285.67, change24h: 3.12, marketCap: 275000000000, volume24h: 15200000000 },
      { symbol: 'BNB', name: 'Binance Coin', price: 312.45, change24h: -1.24, marketCap: 48000000000, volume24h: 1800000000 },
      { symbol: 'SOL', name: 'Solana', price: 98.76, change24h: 5.67, marketCap: 42000000000, volume24h: 2100000000 },
      { symbol: 'XRP', name: 'Ripple', price: 0.5432, change24h: 1.89, marketCap: 29000000000, volume24h: 1200000000 },
      { symbol: 'ADA', name: 'Cardano', price: 0.4523, change24h: -2.15, marketCap: 16000000000, volume24h: 350000000 },
      { symbol: 'AVAX', name: 'Avalanche', price: 36.89, change24h: 4.32, marketCap: 13500000000, volume24h: 580000000 },
      { symbol: 'DOT', name: 'Polkadot', price: 7.23, change24h: -0.87, marketCap: 9200000000, volume24h: 290000000 },
    ];

    setCryptos(initialCryptos);

    const interval = setInterval(() => {
      setCryptos((prev) =>
        prev.map((crypto) => {
          const changePercent = (Math.random() - 0.5) * 0.5;
          const newPrice = crypto.price * (1 + changePercent / 100);
          return {
            ...crypto,
            price: newPrice,
            change24h: crypto.change24h + (Math.random() - 0.5) * 0.3,
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Live Cryptocurrency Prices</h2>
          <p className="text-gray-600 mt-1">Real-time crypto market data</p>
        </div>
        <div className="bg-emerald-100 p-3 rounded-lg">
          <Bitcoin className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cryptos.slice(0, 4).map((crypto) => (
          <div key={crypto.symbol} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{crypto.symbol.substring(0, 2)}</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">{crypto.symbol}</div>
                  <div className="text-xs text-gray-500">{crypto.name}</div>
                </div>
              </div>
              <div className={`flex items-center text-sm font-semibold ${crypto.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {crypto.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(crypto.change24h).toFixed(2)}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{formatPrice(crypto.price)}</div>
            <div className="text-xs text-gray-500">MCap: {formatLargeNumber(crypto.marketCap)}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">24h Change</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Market Cap</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Volume (24h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cryptos.map((crypto) => (
                <tr key={crypto.symbol} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{crypto.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{crypto.symbol}</div>
                        <div className="text-sm text-gray-500">{crypto.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">{formatPrice(crypto.price)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className={`inline-flex items-center font-semibold ${crypto.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {crypto.change24h >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700">{formatLargeNumber(crypto.marketCap)}</td>
                  <td className="px-6 py-4 text-right text-gray-700">{formatLargeNumber(crypto.volume24h)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
