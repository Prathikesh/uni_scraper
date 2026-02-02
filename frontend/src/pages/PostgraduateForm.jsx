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
  TrendingUp
} from "lucide-react";

export default function PostgraduateForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    highest_degree: "",
    postgrad_field: "",
    research_experience: false,
    gpa: 0,
    english: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/recommend/postgrad", formData);
      navigate("/results", { state: { data: response.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get recommendations. Make sure the API is running.");
      setLoading(false);
    }
  };

  const fieldCount = formData.highest_degree ? 1 : 0;
  const studyFieldCount = formData.postgrad_field ? 1 : 0;
  const gpaCount = formData.gpa > 0 ? 1 : 0;
  const checkboxCount = [formData.research_experience, formData.english].filter(Boolean).length;
  const progressPercent = (fieldCount * 25) + (studyFieldCount * 25) + (gpaCount * 25) + (checkboxCount * 12.5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      
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
              className="inline-flex items-center space-x-2 text-indigo-700 hover:text-indigo-800 font-medium group"
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
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-indigo-100">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Postgraduate Qualifications
                </h1>
                <p className="text-gray-600">
                  Enter your postgraduate details to discover advanced courses
                </p>
              </div>

              {/* Progress Card */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-indigo-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Form Completion</span>
                  <span className="text-sm font-bold text-indigo-600">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl text-white">
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
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-indigo-100">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Highest Degree */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Highest Degree <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.highest_degree}
                      onChange={(e) => setFormData({ ...formData, highest_degree: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg font-medium"
                      required
                    >
                      <option value="">Select your highest degree</option>
                      <option value="Bachelor's">Bachelor's Degree</option>
                      <option value="Master's">Master's Degree</option>
                      <option value="MBA">MBA</option>
                      <option value="PhD">PhD</option>
                      <option value="Professional Doctorate">Professional Doctorate</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      Select your highest academic qualification
                    </p>
                  </div>

                  {/* Field of Study */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Field of Study <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.postgrad_field}
                      onChange={(e) => setFormData({ ...formData, postgrad_field: e.target.value })}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg font-medium"
                      required
                    >
                      <option value="">Select your field of study</option>
                      <option value="Computer Science">Computer Science & IT</option>
                      <option value="Business">Business & Management</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Medicine">Medicine & Health Sciences</option>
                      <option value="Psychology">Psychology & Counseling</option>
                      <option value="Finance">Finance & Economics</option>
                      <option value="Law">Law</option>
                      <option value="Education">Education</option>
                      <option value="Data Science">Data Science & AI</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Public Health">Public Health</option>
                      <option value="Social Sciences">Social Sciences</option>
                      <option value="Marine">Marine Studies</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      Select your postgraduate field of study
                    </p>
                  </div>

                  {/* GPA */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      GPA <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={formData.gpa}
                        onChange={(e) => setFormData({ ...formData, gpa: e.target.value === "" ? "" : parseFloat(e.target.value) })}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg font-medium"
                        placeholder="e.g., 3.5"
                        required
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Your Grade Point Average (0-4 scale)
                    </p>
                  </div>

                  {/* Checkboxes */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Additional Qualifications
                    </label>
                    <div className="space-y-3">
                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.research_experience 
                            ? 'bg-indigo-50 border-indigo-500 shadow-md' 
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.research_experience}
                          onChange={(e) => setFormData({ ...formData, research_experience: e.target.checked })}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.research_experience 
                              ? 'bg-indigo-500 border-indigo-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.research_experience && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-gray-900">Research Experience</span>
                        </div>
                      </motion.label>

                      <motion.label 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.english 
                            ? 'bg-indigo-50 border-indigo-500 shadow-md' 
                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
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
                              ? 'bg-indigo-500 border-indigo-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.english && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <span className="font-medium text-gray-900">English Proficiency</span>
                        </div>
                      </motion.label>
                    </div>
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
                    className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl ${
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
