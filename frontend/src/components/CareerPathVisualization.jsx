import { motion } from 'framer-motion';
import { TrendingUp, Award, DollarSign, Zap, Target, Calendar } from 'lucide-react';

export default function CareerPathVisualization({ careerPath }) {
  if (!careerPath) return null;

  const careers = careerPath.career_options || [];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div variants={fadeIn} className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 Your Career Roadmap
        </h3>
        <p className="text-gray-600 text-lg">
          Projected progression in <span className="font-bold text-blue-600 capitalize">{careerPath.field.replace('-', ' ')}</span>
        </p>
      </motion.div>

      {/* Career Progression Timeline */}
      <motion.div variants={fadeIn} className="mb-12">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Career Timeline</h4>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>

          {/* Timeline items */}
          <div className="space-y-6">
            {careers.map((career, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white font-bold text-sm">{career.years_exp}+</span>
                </div>

                {/* Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-1">
                        {career.role}
                      </h5>
                      <p className="text-gray-600 text-sm">
                        After {career.years_exp} years of experience
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-bold text-green-600">+{career.growth}% growth</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{career.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Salary */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-bold text-gray-600">SALARY RANGE</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">
                        ${(career.salary_min / 1000).toFixed(0)}K - ${(career.salary_max / 1000).toFixed(0)}K
                      </p>
                    </div>

                    {/* Demand */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-gray-600">DEMAND</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${career.demand}%` }}
                          ></div>
                        </div>
                        <span className="text-lg font-bold text-gray-900">{career.demand}%</span>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-gray-600">TIME TO REACH</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{career.years_exp} years</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div variants={fadeIn} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="w-6 h-6 text-purple-600" />
          <h4 className="text-xl font-bold text-gray-900">Career Insights</h4>
        </div>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold mt-1">💡</span>
            <span className="text-gray-700">
              This field shows consistent demand in the job market with strong growth potential
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold mt-1">📈</span>
            <span className="text-gray-700">
              Expected salary progression: {careers[0]?.salary_max || 'N/A'} → {careers[careers.length - 1]?.salary_max || 'N/A'}
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-purple-600 font-bold mt-1">⏱️</span>
            <span className="text-gray-700">
              Typical journey to senior role: {careers[careers.length - 1]?.years_exp || '10'} years
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
