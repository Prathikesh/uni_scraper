import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, BookOpen, Zap } from 'lucide-react';

export default function SkillGapAnalyzer({ skillAnalysis }) {
  if (!skillAnalysis) return null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const getReadinessColor = (score) => {
    if (score > 80) return 'from-green-500 to-emerald-500';
    if (score > 60) return 'from-blue-500 to-cyan-500';
    if (score > 40) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getReadinessBg = (score) => {
    if (score > 80) return 'bg-green-50 border-green-200';
    if (score > 60) return 'bg-blue-50 border-blue-200';
    if (score > 40) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const readinessIcons = {
    "Highly Ready": "🎯",
    "Ready": "✅",
    "Needs Preparation": "⚠️",
    "Requires Foundation": "📚"
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div variants={fadeIn} className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          🎓 Skill Gap Analysis
        </h3>
        <p className="text-gray-600 text-lg">
          for <span className="font-bold text-blue-600">{skillAnalysis.course}</span>
        </p>
      </motion.div>

      {/* Readiness Score */}
      <motion.div
        variants={fadeIn}
        className={`mb-8 rounded-xl p-8 border-2 ${getReadinessBg(skillAnalysis.readiness_score)}`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-bold text-gray-600 mb-2">YOUR READINESS SCORE</p>
            <h4 className="text-4xl font-bold text-gray-900">
              {Math.round(skillAnalysis.readiness_score)}%
            </h4>
            <p className="text-lg font-bold mt-2 text-gray-700">
              {readinessIcons[skillAnalysis.readiness_level]} {skillAnalysis.readiness_level}
            </p>
          </div>

          {/* Circular Progress */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${(skillAnalysis.readiness_score / 100) * 283} 283`}
                className={`text-${skillAnalysis.readiness_score > 80 ? 'green' : skillAnalysis.readiness_score > 60 ? 'blue' : skillAnalysis.readiness_score > 40 ? 'yellow' : 'red'}-500`}
                initial={{ strokeDasharray: '0 283' }}
                animate={{ strokeDasharray: `${(skillAnalysis.readiness_score / 100) * 283} 283` }}
                transition={{ duration: 1.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{Math.round(skillAnalysis.readiness_score)}%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Possessed Skills */}
        <motion.div variants={fadeIn}>
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <span>Your Skills ({skillAnalysis.possessed_skills?.length || 0})</span>
          </h4>
          <div className="space-y-3">
            {skillAnalysis.possessed_skills && skillAnalysis.possessed_skills.length > 0 ? (
              skillAnalysis.possessed_skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{skill}</span>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 italic">No existing skills identified</p>
            )}
          </div>
        </motion.div>

        {/* Skill Gaps */}
        <motion.div variants={fadeIn}>
          <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <span>Skills to Develop ({skillAnalysis.gaps_count || 0})</span>
          </h4>
          <div className="space-y-3">
            {skillAnalysis.skill_gaps && skillAnalysis.skill_gaps.length > 0 ? (
              skillAnalysis.skill_gaps.map((skill, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeIn}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3"
                >
                  <Zap className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{skill}</span>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 italic">You possess all required skills!</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Required Skills */}
      <motion.div variants={fadeIn} className="mb-8">
        <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <span>Required Skills for This Course</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillAnalysis.required_skills && skillAnalysis.required_skills.map((skill, idx) => {
            const isPossessed = skillAnalysis.possessed_skills?.some(
              p => p.toLowerCase() === skill.toLowerCase() || 
                   skill.toLowerCase().includes(p.toLowerCase()) ||
                   p.toLowerCase().includes(skill.toLowerCase())
            );

            return (
              <motion.div
                key={idx}
                variants={fadeIn}
                className={`rounded-lg p-4 border-2 flex items-center justify-between ${
                  isPossessed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <span className="text-gray-700 font-medium">{skill}</span>
                {isPossessed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recommendations */}
      {skillAnalysis.prerequisites && skillAnalysis.prerequisites.length > 0 && (
        <motion.div
          variants={fadeIn}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200"
        >
          <h4 className="text-xl font-bold text-gray-900 mb-4">📚 Recommended Prerequisites</h4>
          <div className="space-y-4">
            {skillAnalysis.prerequisites.map((prereq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-blue-100">
                <h5 className="font-bold text-gray-900 mb-2">{prereq.course}</h5>
                <p className="text-gray-600 text-sm mb-2">{prereq.reason}</p>
                <p className="text-blue-600 font-bold text-sm">⏱️ Duration: {prereq.duration}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Tips */}
      <motion.div variants={fadeIn} className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
        <h4 className="text-xl font-bold text-gray-900 mb-4">💡 Preparation Tips</h4>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <span className="text-purple-600 text-xl">🎯</span>
            <span className="text-gray-700">
              Focus on developing your skill gaps before enrollment to maximize success
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-purple-600 text-xl">📚</span>
            <span className="text-gray-700">
              Consider online courses or tutorials for the identified skill gaps
            </span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-purple-600 text-xl">👥</span>
            <span className="text-gray-700">
              Connect with alumni or current students to learn about preparation strategies
            </span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
