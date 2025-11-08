import { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';

interface ExchangeRate {
  currency: string;
  name: string;
  rate: number;
  change: number;
}

export default function CurrencyExchange() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const mockRates: ExchangeRate[] = [
      { currency: 'EUR', name: 'Euro', rate: 0.92, change: 0.15 },
      { currency: 'GBP', name: 'British Pound', rate: 0.79, change: -0.08 },
      { currency: 'JPY', name: 'Japanese Yen', rate: 149.82, change: 0.42 },
      { currency: 'CHF', name: 'Swiss Franc', rate: 0.88, change: 0.12 },
      { currency: 'CAD', name: 'Canadian Dollar', rate: 1.36, change: -0.18 },
      { currency: 'AUD', name: 'Australian Dollar', rate: 1.53, change: 0.25 },
      { currency: 'CNY', name: 'Chinese Yuan', rate: 7.24, change: -0.05 },
      { currency: 'INR', name: 'Indian Rupee', rate: 83.12, change: 0.32 },
    ];

    setRates(mockRates);

    const interval = setInterval(() => {
      setRates((prev) =>
        prev.map((rate) => ({
          ...rate,
          rate: rate.rate * (1 + (Math.random() - 0.5) * 0.002),
          change: (Math.random() - 0.5) * 0.5,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fromRate = fromCurrency === 'USD' ? 1 : rates.find((r) => r.currency === fromCurrency)?.rate || 1;
    const toRate = toCurrency === 'USD' ? 1 : rates.find((r) => r.currency === toCurrency)?.rate || 1;
    const result = (parseFloat(amount) || 0) * (toRate / fromRate);
    setConvertedAmount(result);
  }, [amount, fromCurrency, toCurrency, rates]);

  const currencies = [{ currency: 'USD', name: 'US Dollar' }, ...rates];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {currencies.map((curr) => (
                <option key={curr.currency} value={curr.currency}>
                  {curr.currency} - {curr.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {currencies.map((curr) => (
                <option key={curr.currency} value={curr.currency}>
                  {curr.currency} - {curr.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl font-bold text-gray-900">
              {amount} {fromCurrency}
            </span>
            <ArrowRightLeft className="w-6 h-6 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-600">
              {convertedAmount.toFixed(2)} {toCurrency}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Exchange Rates (vs USD)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rates.map((rate) => (
            <div key={rate.currency} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{rate.currency}</span>
                <div className={`flex items-center text-sm ${rate.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {rate.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {Math.abs(rate.change).toFixed(2)}%
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-1">{rate.name}</div>
              <div className="text-lg font-semibold text-gray-900">{rate.rate.toFixed(4)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
