import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function QualificationForm() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // O/L Form State
  const [olData, setOlData] = useState({
    english: false,
    maths: false,
    science: false,
    passes: 0
  });

  // A/L Form State
  const [alData, setAlData] = useState({
    stream: "Science",
    al_passes: 0,
    english: false,
    maths: false
  });

  // Diploma Form State
  const [diplomaData, setDiplomaData] = useState({
    diploma_field: "",
    institution_recognized: false,
    english: false
  });

  // HND Form State
  const [hndData, setHndData] = useState({
    hnd_field: "",
    gpa: null,
    english: false
  });

  // BSc Form State
  const [bscData, setBscData] = useState({
    degree_field: "",
    gpa: 0,
    english: false
  });

  // Postgrad Form State
  const [postgradData, setPostgradData] = useState({
    highest_degree: "",
    research_experience: false,
    gpa: 0,
    english: false
  });

  const levelInfo = {
    ol: { title: "O/L Qualifications", icon: "📖", color: "green" },
    al: { title: "A/L Qualifications", icon: "📚", color: "blue" },
    diploma: { title: "Diploma Details", icon: "📜", color: "purple" },
    hnd: { title: "HND Details", icon: "🎓", color: "orange" },
    bsc: { title: "Degree Details", icon: "🎯", color: "red" },
    postgrad: { title: "Postgraduate Details", icon: "👨‍🎓", color: "indigo" }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    let payload;
    let endpoint;

    switch (level) {
      case "ol":
        payload = olData;
        endpoint = "http://127.0.0.1:8000/recommend/ol";
        break;
      case "al":
        payload = alData;
        endpoint = "http://127.0.0.1:8000/recommend/al";
        break;
      case "diploma":
        payload = diplomaData;
        endpoint = "http://127.0.0.1:8000/recommend/diploma";
        break;
      case "hnd":
        payload = hndData;
        endpoint = "http://127.0.0.1:8000/recommend/hnd";
        break;
      case "bsc":
        payload = bscData;
        endpoint = "http://127.0.0.1:8000/recommend/bsc";
        break;
      case "postgrad":
        payload = postgradData;
        endpoint = "http://127.0.0.1:8000/recommend/postgrad";
        break;
      default:
        setError("Invalid level");
        setLoading(false);
        return;
    }

    try {
      const response = await axios.post(endpoint, payload);
      navigate("/results", { state: { data: response.data } });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to get recommendations. Make sure the API is running.");
      setLoading(false);
    }
  };

  const info = levelInfo[level] || levelInfo.ol;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/select-level" className="inline-block text-blue-600 hover:text-blue-700 mb-4">
              ← Back to Selection
            </Link>
            <div className={`inline-block bg-${info.color}-100 rounded-full p-4 mb-4`}>
              <span className="text-5xl">{info.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {info.title}
            </h1>
            <p className="text-gray-600">
              Fill in your details to get personalized course recommendations
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* O/L Form */}
              {level === "ol" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Number of O/L Passes
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="15"
                      value={olData.passes}
                      onChange={(e) => setOlData({ ...olData, passes: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter number of passes (0-15)"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject Passes
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={olData.english}
                        onChange={(e) => setOlData({ ...olData, english: e.target.checked })}
                        className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">English</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={olData.maths}
                        onChange={(e) => setOlData({ ...olData, maths: e.target.checked })}
                        className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">Mathematics</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={olData.science}
                        onChange={(e) => setOlData({ ...olData, science: e.target.checked })}
                        className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">Science</span>
                    </label>
                  </div>
                </>
              )}

              {/* A/L Form */}
              {level === "al" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stream
                    </label>
                    <select
                      value={alData.stream}
                      onChange={(e) => setAlData({ ...alData, stream: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Science">Science</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                      <option value="Technology">Technology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of A/L Passes
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={alData.al_passes}
                      onChange={(e) => setAlData({ ...alData, al_passes: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0-4"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alData.english}
                        onChange={(e) => setAlData({ ...alData, english: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">English (Credit pass)</span>
                    </label>

                    <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alData.maths}
                        onChange={(e) => setAlData({ ...alData, maths: e.target.checked })}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">Mathematics</span>
                    </label>
                  </div>
                </>
              )}

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-${info.color}-600 hover:bg-${info.color}-700 text-white font-semibold py-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Finding Courses...
                  </span>
                ) : (
                  "Get Recommendations"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
