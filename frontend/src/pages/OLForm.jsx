import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function OLForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [resultTiming, setResultTiming] = useState("after");
  
  const [formData, setFormData] = useState({
    english: false,
    maths: false,
    science: false,
    passes: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend/ol", formData);
      navigate("/results", { state: { data: response.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get recommendations. Make sure the API is running.");
      setLoading(false);
    }
  };

  const subjectCount = [formData.english, formData.maths, formData.science].filter(Boolean).length;
  const progressPercent = ((formData.passes / 9) * 50) + (subjectCount * 16.67);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/select-level" 
              className="inline-flex items-center space-x-2 text-green-700 hover:text-green-800 font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Selection</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Header Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-green-100">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  O/L Qualifications
                </h1>
                <p className="text-gray-600">
                  Enter your Ordinary Level results to discover suitable courses
                </p>
              </div>

              {/* Progress Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Form Completion</span>
                  <span className="text-sm font-bold text-green-600">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-xl text-white">
                <Sparkles className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-bold mb-2">What You'll Get</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Personalized course recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Match scores for each course</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Direct links to university sites</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Eligibility verification</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-green-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Result Timing Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      When are you entering your results? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          resultTiming === "before"
                            ? 'bg-green-50 border-green-500 shadow-md' 
                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="resultTiming"
                          value="before"
                          checked={resultTiming === "before"}
                          onChange={(e) => setResultTiming(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            resultTiming === "before"
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {resultTiming === "before" && (
                              <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 block">Before Results</span>
                            <span className="text-sm text-gray-600">Predicted results based on your expectations</span>
                          </div>
                        </div>
                      </motion.label>

                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-start p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          resultTiming === "after"
                            ? 'bg-green-50 border-green-500 shadow-md' 
                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="resultTiming"
                          value="after"
                          checked={resultTiming === "after"}
                          onChange={(e) => setResultTiming(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 flex-shrink-0 ${
                            resultTiming === "after"
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {resultTiming === "after" && (
                              <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 block">After Results</span>
                            <span className="text-sm text-gray-600">Actual results you have received</span>
                          </div>
                        </div>
                      </motion.label>
                    </div>
                  </div>

                  {/* Number of Passes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Number of O/L Passes <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="9"
                        value={formData.passes}
                        onChange={(e) => setFormData({ ...formData, passes: e.target.value === '' ? '' : parseInt(e.target.value) })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-lg font-medium"
                        placeholder="Enter number (0-9)"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Total number of subjects you passed in O/L examination
                    </p>
                  </div>

                  {/* Subject Passes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Key Subject Passes
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.english 
                            ? 'bg-green-50 border-green-500 shadow-md' 
                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.english}
                          onChange={(e) => setFormData({ ...formData, english: e.target.checked })}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.english 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.english && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-gray-900">English</span>
                        </div>
                      </motion.label>

                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.maths 
                            ? 'bg-green-50 border-green-500 shadow-md' 
                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.maths}
                          onChange={(e) => setFormData({ ...formData, maths: e.target.checked })}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.maths 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.maths && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-gray-900">Mathematics</span>
                        </div>
                      </motion.label>

                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.science 
                            ? 'bg-green-50 border-green-500 shadow-md' 
                            : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.science}
                          onChange={(e) => setFormData({ ...formData, science: e.target.checked })}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.science 
                              ? 'bg-green-500 border-green-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.science && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-gray-900">Science</span>
                        </div>
                      </motion.label>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">
                      Select the key subjects you have passed
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900">Error</h4>
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing Your Qualifications...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span>Get My Recommendations</span>
                      </span>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
