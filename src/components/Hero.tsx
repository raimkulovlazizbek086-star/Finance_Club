import { TrendingUp, Users, Award, BookOpen } from 'lucide-react';

export default function Hero() {
  const features = [
    {
      icon: TrendingUp,
      title: 'Market Analysis',
      description: 'Real-time tracking of stocks, crypto, and commodities',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with fellow students passionate about finance',
    },
    {
      icon: Award,
      title: 'Investment Skills',
      description: 'Build practical knowledge for your financial future',
    },
    {
      icon: BookOpen,
      title: 'Educational Resources',
      description: 'Access tools and calculators to understand markets',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Finance Club
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Empowering students to understand financial markets, make informed investment decisions,
            and build wealth through knowledge and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            To create a community where students can learn about financial markets, investment strategies,
            and economic trends while developing the analytical skills needed to navigate the world of finance.
            We believe that financial literacy is essential for building a secure future.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl font-bold text-emerald-400 mb-1">500+</div>
              <div className="text-gray-400 text-sm">Active Members</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl font-bold text-emerald-400 mb-1">50+</div>
              <div className="text-gray-400 text-sm">Events Hosted</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-3xl font-bold text-emerald-400 mb-1">$1M+</div>
              <div className="text-gray-400 text-sm">Portfolio Simulations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
