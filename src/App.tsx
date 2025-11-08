import { useState } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import CurrencyExchange from './components/CurrencyExchange';
import CryptoPrices from './components/CryptoPrices';
import MarketIndices from './components/MarketIndices';
import StockPrices from './components/StockPrices';
import Commodities from './components/Commodities';
import TopMovers from './components/TopMovers';
import NewsFeeds from './components/NewsFeeds';
import InvestmentCalculator from './components/InvestmentCalculator';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        {activeSection === 'home' && <Hero />}

        {activeSection === 'markets' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <MarketIndices />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <StockPrices />
              <Commodities />
            </div>
            <TopMovers />
          </div>
        )}

        {activeSection === 'crypto' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CryptoPrices />
          </div>
        )}

        {activeSection === 'currency' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <CurrencyExchange />
          </div>
        )}

        {activeSection === 'news' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <NewsFeeds />
          </div>
        )}

        {activeSection === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InvestmentCalculator />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
