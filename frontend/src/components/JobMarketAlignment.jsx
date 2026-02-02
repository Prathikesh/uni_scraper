import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, Briefcase, Target, AlertCircle } from 'lucide-react';

export default function JobMarketAlignment({ marketData }) {
  if (!marketData) return null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'rapidly-growing':
        return 'from-emerald-600 to-teal-500';
      case 'growing':
        return 'from-blue-600 to-blue-500';
      case 'stable':
        return 'from-amber-600 to-orange-500';
      case 'declining':
        return 'from-rose-600 to-pink-500';
      default:
        return 'from-slate-600 to-slate-500';
    }
  };

  const getTrendBg = (trend) => {
    switch (trend) {
      case 'rapidly-growing':
        return 'bg-emerald-50 border-emerald-300';
      case 'growing':
        return 'bg-blue-50 border-blue-300';
      case 'stable':
        return 'bg-amber-50 border-amber-300';
      case 'declining':
        return 'bg-rose-50 border-rose-300';
      default:
        return 'bg-slate-50 border-slate-300';
    }
  };

  const trendDescriptions = {
    'rapidly-growing': 'Hot field with explosive growth',
    'growing': 'Strong market demand and expansion',
    'stable': 'Consistent opportunities and stability',
    'declining': 'Limited growth, consider alternatives'
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div variants={fadeIn} className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          📊 Job Market Analysis
        </h3>
        <p className="text-gray-600 text-lg">
          Market trends for <span className="font-bold text-blue-600">{marketData.field}</span>
        </p>
      </motion.div>

      {/* Main Score Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Alignment Score */}
        <motion.div
          variants={fadeIn}
          className={`rounded-xl p-8 border-2 bg-gradient-to-br ${getTrendColor(marketData.trend)} bg-opacity-5 ${getTrendBg(marketData.trend)}`}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900">Market Alignment</h4>
            <div className="text-4xl">{marketData.trend_icon}</div>
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className={`h-full bg-gradient-to-r ${getTrendColor(marketData.trend)}`}
              initial={{ width: 0 }}
              animate={{ width: `${marketData.alignment_score}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{marketData.alignment_score}%</p>
          <p className="text-sm text-gray-600 mt-2 font-medium">{trendDescriptions[marketData.trend]}</p>
        </motion.div>

        {/* Demand Score */}
        <motion.div
          variants={fadeIn}
          className="rounded-xl p-8 border-2 bg-gradient-to-br from-indigo-500 to-blue-500 bg-opacity-5 border-indigo-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900">Demand Level</h4>
            <Briefcase className="w-8 h-8 text-indigo-600" />
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-600 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${marketData.demand_score}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
          <p className="text-4xl font-bold text-gray-900">{marketData.demand_score}%</p>
          <p className="text-sm text-gray-600 mt-2">Jobs available now</p>
        </motion.div>

        {/* Growth Rate */}
        <motion.div
          variants={fadeIn}
          className="rounded-xl p-8 border-2 bg-gradient-to-br from-teal-500 to-emerald-500 bg-opacity-5 border-teal-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-gray-900">Annual Growth</h4>
            <TrendingUp className="w-8 h-8 text-teal-600" />
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-teal-600 to-emerald-600"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, marketData.growth_rate * 10)}%` }}
              transition={{ duration: 1 }}
            ></motion.div>
          </div>
          <p className="text-4xl font-bold text-gray-900">+{marketData.growth_rate}%</p>
          <p className="text-sm text-gray-600 mt-2">Year-over-year growth</p>
        </motion.div>
      </div>

      {/* Salary & Percentile Info */}
      <motion.div variants={fadeIn} className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Salary Percentile */}
        <div className="rounded-xl p-8 border-2 border-violet-300 bg-violet-50">
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-violet-600" />
            <span>Salary Percentile</span>
          </h4>
          <div className="flex items-end space-x-4">
            <div>
              <p className="text-5xl font-bold text-violet-600 mb-2">
                {marketData.salary_percentile}%
              </p>
              <p className="text-gray-600 text-sm">
                Higher salary potential compared to other fields
              </p>
            </div>
            {/* Mini bar chart */}
            <div className="flex-1 flex items-end space-x-1 h-24">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t transition-all ${
                    i < Math.round(marketData.salary_percentile / 10)
                      ? 'bg-gradient-to-t from-violet-600 to-violet-400'
                      : 'bg-gray-200'
                  }`}
                  style={{ height: `${20 + i * 8}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Trend Details */}
        <div className={`rounded-xl p-8 border-2 ${getTrendBg(marketData.trend)}`}>
          <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-slate-700" />
            <span>Market Trend</span>
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Status</span>
              <span className={`px-4 py-2 rounded-full font-bold text-sm ${
                marketData.trend === 'rapidly-growing'
                  ? 'bg-emerald-200 text-emerald-800'
                  : marketData.trend === 'growing'
                  ? 'bg-blue-200 text-blue-800'
                  : marketData.trend === 'stable'
                  ? 'bg-amber-200 text-amber-800'
                  : 'bg-rose-200 text-rose-800'
              }`}>
                {marketData.trend.split('-').join(' ').toUpperCase()}
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {marketData.insight}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Recommendation */}
      <motion.div
        variants={fadeIn}
        className={`rounded-xl p-8 border-2 bg-gradient-to-br ${getTrendColor(marketData.trend)} bg-opacity-5 ${getTrendBg(marketData.trend)}`}
      >
        <div className="flex items-start space-x-4">
          <div className="text-4xl flex-shrink-0">
            {marketData.alignment_score > 80 ? '🚀' : marketData.alignment_score > 60 ? '✅' : '⚠️'}
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-2">Our Recommendation</h4>
            <p className="text-gray-700 text-lg mb-4">
              {marketData.recommendation}
            </p>
            {marketData.alignment_score > 80 && (
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-gray-700 text-sm">
                  ✅ This field offers excellent career prospects with strong job demand, competitive salaries, and consistent growth opportunities.
                </p>
              </div>
            )}
            {marketData.alignment_score <= 80 && marketData.alignment_score > 60 && (
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <p className="text-gray-700 text-sm">
                  This field has good job opportunities with stable growth. Consider comparing with other options that might have higher growth rates.
                </p>
              </div>
            )}
            {marketData.alignment_score <= 60 && (
              <div className="bg-white rounded-lg p-4 border border-orange-200">
                <p className="text-gray-700 text-sm">
                  While this field has opportunities, consider exploring fields with higher growth rates and job demand for better long-term prospects.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Market Insights */}
      <motion.div variants={fadeIn} className="mt-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-200">
        <h4 className="text-xl font-bold text-gray-900 mb-6">📈 Market Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <p className="text-sm font-bold text-indigo-600 mb-2">HIRING ACTIVITY</p>
            <p className="text-lg text-gray-900 font-bold">Active</p>
            <p className="text-sm text-gray-600 mt-1">Companies are actively hiring in this field</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <p className="text-sm font-bold text-indigo-600 mb-2">COMPETITION LEVEL</p>
            <p className="text-lg text-gray-900 font-bold">
              {marketData.demand_score > 85 ? 'Moderate' : marketData.demand_score > 70 ? 'Moderate' : 'High'}
            </p>
            <p className="text-sm text-gray-600 mt-1">Expected competition for positions</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <p className="text-sm font-bold text-indigo-600 mb-2">FUTURE OUTLOOK</p>
            <p className="text-lg text-gray-900 font-bold">
              {marketData.growth_rate > 10 ? 'Excellent' : marketData.growth_rate > 5 ? 'Good' : 'Stable'}
            </p>
            <p className="text-sm text-gray-600 mt-1">Long-term industry prospects</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
