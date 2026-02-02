import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Target,
  User,
  ArrowRight,
  Home,
  Sparkles
} from "lucide-react";

export default function SelectLevel() {
  const levels = [
    {
      id: "ol",
      name: "O/L Students",
      description: "Ordinary Level qualifications",
      icon: BookOpen,
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-200",
      hoverBorder: "hover:border-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-700",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop"
    },
    {
      id: "al",
      name: "A/L Students",
      description: "Advanced Level qualifications",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-200",
      hoverBorder: "hover:border-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-700",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop"
    },
    {
      id: "diploma",
      name: "Diploma Holders",
      description: "Diploma qualifications",
      icon: Award,
      color: "from-purple-500 to-violet-600",
      borderColor: "border-purple-200",
      hoverBorder: "hover:border-purple-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-700",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop"
    },
    {
      id: "hnd",
      name: "HND Holders",
      description: "Higher National Diploma",
      icon: TrendingUp,
      color: "from-orange-500 to-amber-600",
      borderColor: "border-orange-200",
      hoverBorder: "hover:border-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-700",
      image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=300&fit=crop"
    },
    {
      id: "bsc",
      name: "Degree Holders",
      description: "Bachelor's degree qualifications",
      icon: Target,
      color: "from-red-500 to-rose-600",
      borderColor: "border-red-200",
      hoverBorder: "hover:border-red-500",
      bgLight: "bg-red-50",
      textColor: "text-red-700",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop"
    },
    {
      id: "postgrad",
      name: "Postgraduate",
      description: "Master's & PhD programs",
      icon: User,
      color: "from-indigo-500 to-purple-600",
      borderColor: "border-indigo-200",
      hoverBorder: "hover:border-indigo-500",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-700",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group"
            >
              <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Personalized Learning Path</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Select Your Qualification Level
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the option that best matches your current qualifications and let our AI find the perfect courses for you
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {levels.map((level) => (
            <motion.div
              key={level.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <Link
                to={`/form/${level.id}`}
                className={`block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${level.borderColor} ${level.hoverBorder}`}
              >
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={level.image} 
                    alt={level.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                      <level.icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                    {level.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {level.description}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className={`flex items-center justify-between ${level.bgLight} rounded-lg p-3`}>
                    <span className={`text-sm font-semibold ${level.textColor}`}>
                      Get Started
                    </span>
                    <ArrowRight className={`w-5 h-5 ${level.textColor} group-hover:translate-x-2 transition-transform`} />
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`h-1 bg-gradient-to-r ${level.color}`}></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 max-w-3xl mx-auto shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600 mb-6">
              Not sure which level to select? Our AI-powered system will analyze your qualifications and recommend the most suitable courses regardless of your choice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Smart Matching</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                <GraduationCap className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">12+ Universities</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">500+ Courses</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
