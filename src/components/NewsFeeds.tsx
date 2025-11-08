import { Newspaper, Clock } from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  category: string;
  summary: string;
}

export default function NewsFeeds() {
  const news: NewsItem[] = [
    {
      id: 1,
      title: 'Federal Reserve Signals Potential Rate Cuts in 2024',
      source: 'Financial Times',
      time: '2 hours ago',
      category: 'Central Banking',
      summary: 'The Federal Reserve hints at possible interest rate reductions as inflation shows signs of cooling.',
    },
    {
      id: 2,
      title: 'Tech Stocks Rally on Strong Earnings Reports',
      source: 'Bloomberg',
      time: '4 hours ago',
      category: 'Markets',
      summary: 'Major technology companies exceed earnings expectations, driving broader market gains.',
    },
    {
      id: 3,
      title: 'Gold Prices Hit New Highs Amid Economic Uncertainty',
      source: 'Reuters',
      time: '5 hours ago',
      category: 'Commodities',
      summary: 'Investors flock to safe-haven assets as global economic concerns persist.',
    },
    {
      id: 4,
      title: 'Cryptocurrency Market Sees Renewed Institutional Interest',
      source: 'CoinDesk',
      time: '6 hours ago',
      category: 'Crypto',
      summary: 'Major financial institutions announce new digital asset investment strategies.',
    },
    {
      id: 5,
      title: 'Oil Prices Surge on Supply Concerns',
      source: 'Wall Street Journal',
      time: '7 hours ago',
      category: 'Energy',
      summary: 'Geopolitical tensions in key producing regions drive crude oil prices higher.',
    },
    {
      id: 6,
      title: 'Electric Vehicle Sales Break Records in Q4',
      source: 'CNBC',
      time: '8 hours ago',
      category: 'Automotive',
      summary: 'EV manufacturers report unprecedented demand as charging infrastructure expands.',
    },
    {
      id: 7,
      title: 'Emerging Markets Attract Global Investment Flows',
      source: 'Financial Times',
      time: '10 hours ago',
      category: 'Global Markets',
      summary: 'Developing economies see increased foreign direct investment amid shifting economic dynamics.',
    },
    {
      id: 8,
      title: 'AI Companies Dominate Venture Capital Funding',
      source: 'TechCrunch',
      time: '12 hours ago',
      category: 'Technology',
      summary: 'Artificial intelligence startups secure record-breaking funding rounds from major investors.',
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Central Banking': 'bg-blue-100 text-blue-700',
      'Markets': 'bg-emerald-100 text-emerald-700',
      'Commodities': 'bg-amber-100 text-amber-700',
      'Crypto': 'bg-purple-100 text-purple-700',
      'Energy': 'bg-orange-100 text-orange-700',
      'Automotive': 'bg-teal-100 text-teal-700',
      'Global Markets': 'bg-indigo-100 text-indigo-700',
      'Technology': 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Financial News</h2>
          <p className="text-gray-600 mt-1">Stay updated with the latest market developments</p>
        </div>
        <div className="bg-emerald-100 p-3 rounded-lg">
          <Newspaper className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {news.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                {item.category}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {item.time}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.summary}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">{item.source}</span>
              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                Read more →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
