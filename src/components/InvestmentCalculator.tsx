import { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

interface Investment {
  company: string;
  symbol: string;
  historicalPrice: number;
  currentPrice: number;
  year: number;
}

export default function InvestmentCalculator() {
  const [selectedCompany, setSelectedCompany] = useState('AAPL');
  const [investmentAmount, setInvestmentAmount] = useState('1000');
  const [result, setResult] = useState<{
    shares: number;
    currentValue: number;
    profit: number;
    returnPercent: number;
  } | null>(null);

  const investments: Investment[] = [
    { company: 'Apple Inc.', symbol: 'AAPL', historicalPrice: 0.39, currentPrice: 215.32, year: 1980 },
    { company: 'Microsoft Corp.', symbol: 'MSFT', historicalPrice: 0.10, currentPrice: 425.67, year: 1986 },
    { company: 'Amazon.com Inc.', symbol: 'AMZN', historicalPrice: 1.73, currentPrice: 178.23, year: 1997 },
    { company: 'Google (Alphabet)', symbol: 'GOOGL', historicalPrice: 85.00, currentPrice: 142.89, year: 2004 },
    { company: 'Netflix Inc.', symbol: 'NFLX', historicalPrice: 1.21, currentPrice: 478.23, year: 2002 },
    { company: 'Tesla Inc.', symbol: 'TSLA', historicalPrice: 17.00, currentPrice: 242.56, year: 2010 },
    { company: 'NVIDIA Corp.', symbol: 'NVDA', historicalPrice: 0.08, currentPrice: 523.45, year: 1999 },
    { company: 'Meta (Facebook)', symbol: 'META', historicalPrice: 38.00, currentPrice: 387.45, year: 2012 },
  ];

  const handleCalculate = () => {
    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) return;

    const investment = investments.find((inv) => inv.symbol === selectedCompany);
    if (!investment) return;

    const shares = amount / investment.historicalPrice;
    const currentValue = shares * investment.currentPrice;
    const profit = currentValue - amount;
    const returnPercent = ((currentValue - amount) / amount) * 100;

    setResult({
      shares,
      currentValue,
      profit,
      returnPercent,
    });
  };

  const selectedInvestment = investments.find((inv) => inv.symbol === selectedCompany);
  const yearsHeld = selectedInvestment ? new Date().getFullYear() - selectedInvestment.year : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Historical Investment Calculator</h2>
          <p className="text-gray-600 mt-1">See what your investment would be worth today</p>
        </div>
        <div className="bg-emerald-100 p-3 rounded-lg">
          <Calculator className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => {
                setSelectedCompany(e.target.value);
                setResult(null);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
            >
              {investments.map((inv) => (
                <option key={inv.symbol} value={inv.symbol}>
                  {inv.company} ({inv.symbol}) - IPO {inv.year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Amount ($)</label>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => {
                setInvestmentAmount(e.target.value);
                setResult(null);
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Enter amount"
              min="1"
            />
          </div>
        </div>

        {selectedInvestment && (
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Investment Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">IPO Year</div>
                <div className="font-bold text-gray-900">{selectedInvestment.year}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">IPO Price</div>
                <div className="font-bold text-gray-900">${selectedInvestment.historicalPrice.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Current Price</div>
                <div className="font-bold text-gray-900">${selectedInvestment.currentPrice.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Years Held</div>
                <div className="font-bold text-gray-900">{yearsHeld} years</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Calculate Returns
        </button>

        {result && selectedInvestment && (
          <div className="mt-6 space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <h4 className="text-xl font-bold text-gray-900">Your Investment Results</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <div className="text-sm text-gray-600 mb-1">Initial Investment</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${parseFloat(investmentAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-emerald-200">
                  <div className="text-sm text-gray-600 mb-1">Shares Purchased</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {result.shares.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border-2 border-emerald-300">
                <div className="text-sm text-gray-600 mb-2">Current Value ({new Date().getFullYear()})</div>
                <div className="text-4xl font-bold text-emerald-600 mb-3">
                  ${result.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="flex items-baseline space-x-3">
                  <span className="text-lg font-semibold text-emerald-700">
                    Profit: ${result.profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-medium text-emerald-600">
                    ({result.returnPercent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}% return)
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>Note:</strong> This calculator uses split-adjusted IPO prices and assumes you held the investment
                from {selectedInvestment.year} until today ({yearsHeld} years). It does not account for dividends,
                taxes, inflation, or transaction costs. Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">The Power of Long-Term Investing</h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          This calculator demonstrates how early investments in successful companies can grow exponentially over time.
          While these examples show remarkable returns, they also highlight the importance of patience, diversification,
          and long-term thinking in building wealth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-emerald-400 mb-1">44+ years</div>
            <div className="text-sm text-gray-300">Maximum time horizon</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-emerald-400 mb-1">8 companies</div>
            <div className="text-sm text-gray-300">Historical data available</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-3xl font-bold text-emerald-400 mb-1">6,000%+</div>
            <div className="text-sm text-gray-300">Best performing returns</div>
          </div>
        </div>
      </div>
    </div>
  );
}
