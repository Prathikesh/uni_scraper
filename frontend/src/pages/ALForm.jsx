import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Award
} from "lucide-react";

export default function ALForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [resultTiming, setResultTiming] = useState("after");
  
  const [formData, setFormData] = useState({
    stream: "Science",
    al_passes: 0,
    english: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend/al", formData);
      navigate("/results", { state: { data: response.data } });
    } catch (err) {
      // Handle validation errors (array of objects) or simple string errors
      let errorMessage = "Failed to get recommendations. Make sure the API is running.";
      
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        
        // If detail is an array of validation errors
        if (Array.isArray(detail)) {
          errorMessage = detail.map(e => e.msg || JSON.stringify(e)).join(", ");
        } 
        // If detail is a simple string
        else if (typeof detail === "string") {
          errorMessage = detail;
        }
        // If detail is an object
        else if (typeof detail === "object") {
          errorMessage = detail.msg || JSON.stringify(detail);
        }
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const progressPercent = ((formData.al_passes / 3) * 60) + (formData.english ? 40 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/select-level" 
              className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Selection</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-blue-100">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  A/L Qualifications
                </h1>
                <p className="text-gray-600">
                  Enter your Advanced Level results to find your perfect course match
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-blue-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Form Completion</span>
                  <span className="text-sm font-bold text-blue-600">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-xl text-white">
                <Award className="w-8 h-8 mb-4" />
                <h3 className="text-lg font-bold mb-2">Your Benefits</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>AI-powered course matching</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Stream-specific recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>University comparison</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Instant results</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-blue-100">
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
                            ? 'bg-blue-50 border-blue-500 shadow-md' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
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
                              ? 'bg-blue-500 border-blue-500' 
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
                            ? 'bg-blue-50 border-blue-500 shadow-md' 
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
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
                              ? 'bg-blue-500 border-blue-500' 
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

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      A/L Stream <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.stream}
                      onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-medium"
                    >
                      <option value="Science">Science Stream</option>
                      <option value="Commerce">Commerce Stream</option>
                      <option value="Arts">Arts Stream</option>
                      <option value="Technology">Technology Stream</option>
                      <option value="Maths">Maths Stream</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      Select your A/L stream
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Number of A/L Passes <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="3"
                      value={formData.al_passes}
                      onChange={(e) => setFormData({ ...formData, al_passes: e.target.value === '' ? '' : parseInt(e.target.value) })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-lg font-medium"
                      placeholder="Enter number (0-3)"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Number of subjects passed at A/Level
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Additional Qualifications
                    </label>
                    <motion.label 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.english 
                          ? 'bg-blue-50 border-blue-500 shadow-md' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
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
                            ? 'bg-blue-500 border-blue-500' 
                            : 'border-gray-300'
                        }`}>
                          {formData.english && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className="font-medium text-gray-900">English (Credit Pass)</span>
                      </div>
                    </motion.label>
                  </div>

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

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
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
