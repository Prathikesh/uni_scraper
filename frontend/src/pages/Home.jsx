import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import DemoVideo from "../components/DemoVideo";
import { 
  GraduationCap, 
  Search, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Brain,
  Target,
  Zap,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Play,
  X
} from "lucide-react";

export default function Home() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  const universities = [
    { 
      name: "NSBM Green University", 
      short: "NSBM",
      color: "from-green-500 to-emerald-600",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      url: "https://www.nsbm.ac.lk"
    },
    { 
      name: "Asia Pacific Institute of Information Technology", 
      short: "APIIT",
      color: "from-blue-500 to-cyan-600",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop",
      url: "https://apiit.lk"
    },
    { 
      name: "Informatics Institute of Technology", 
      short: "IIT",
      color: "from-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop&q=80",
      url: "https://www.iit.ac.lk"
    },
    { 
      name: "Horizon Campus", 
      short: "Horizon",
      color: "from-orange-500 to-red-600",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop",
      url: "https://horizoncampus.edu.lk"
    },
    { 
      name: "British College of Applied Studies", 
      short: "BCAS",
      color: "from-red-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
      url: "https://bcas.lk"
    },
    { 
      name: "CINEC Campus", 
      short: "CINEC",
      color: "from-teal-500 to-cyan-600",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      url: "https://www.cinec.edu"
    },
    { 
      name: "KIU - Kotelawala Defence University", 
      short: "KIU",
      color: "from-indigo-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=400&h=300&fit=crop",
      url: "https://kiu.ac.lk"
    },
    { 
      name: "International College of Business and Technology", 
      short: "ICBT",
      color: "from-violet-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop",
      url: "https://icbt.lk"
    },
    { 
      name: "National Institute of Business Management", 
      short: "NIBM",
      color: "from-amber-500 to-orange-600",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop",
      url: "https://nibm.lk"
    },
    { 
      name: "Sri Lanka Technological Campus", 
      short: "SLTC",
      color: "from-lime-500 to-green-600",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
      url: "https://sltc.ac.lk"
    },
    { 
      name: "Australian National College", 
      short: "ANC",
      color: "from-sky-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=400&h=300&fit=crop",
      url: "https://ancedu.com"
    },
    { 
      name: "ESOFT Metro Campus", 
      short: "ESOFT",
      color: "from-rose-500 to-pink-600",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
      url: "https://esoft.lk"
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced machine learning algorithm analyzes your qualifications and matches you with the most suitable courses.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get personalized course recommendations in seconds, not days. Our system works 24/7 for your convenience.",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Verified Information",
      description: "All course data is verified and updated regularly from official university sources for accuracy.",
      color: "green"
    },
    {
      icon: Target,
      title: "Perfect Match",
      description: "Our algorithm considers your grades, preferences, and career goals to find your ideal program.",
      color: "purple"
    }
  ];

  const benefits = [
    {
      icon: Building2,
      stat: "12+",
      label: "Partner Universities",
      description: "Top-tier institutions"
    },
    {
      icon: BookOpen,
      stat: "500+",
      label: "Course Options",
      description: "Across all fields"
    },
    {
      icon: Users,
      stat: "10K+",
      label: "Students Helped",
      description: "And counting"
    },
    {
      icon: Award,
      stat: "95%",
      label: "Success Rate",
      description: "Student satisfaction"
    }
  ];

  const testimonials = [
    {
      name: "Kasun Perera",
      role: "Software Engineering Student",
      university: "NSBM",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
      content: "UniMatch helped me find the perfect program that aligned with my A/L results and career aspirations. The recommendation was spot-on!",
      rating: 5
    },
    {
      name: "Dilini Fernando",
      role: "Business Administration Graduate",
      university: "IIT",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
      content: "I was confused about which university to choose. This platform made the decision easy with personalized recommendations.",
      rating: 5
    },
    {
      name: "Ravindu Silva",
      role: "Cyber Security Student",
      university: "APIIT",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
      content: "The AI matching system is incredibly accurate. It recommended programs I hadn't even considered, and I'm so glad I found my perfect fit!",
      rating: 5
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Select Your Level",
      description: "Choose your current qualification level from O/L to Postgraduate"
    },
    {
      number: "02",
      title: "Enter Details",
      description: "Fill in your academic qualifications and subject preferences"
    },
    {
      number: "03",
      title: "Get Matched",
      description: "Receive personalized course recommendations instantly"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">UniMatch</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors font-medium cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>How It Works</a>
              <a href="#universities" className="text-gray-600 hover:text-blue-600 transition-colors font-medium cursor-pointer" onClick={(e) => { e.preventDefault(); document.getElementById('universities')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Universities</a>
              <Link
                to="/select-level"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold hover:scale-105"
              >
                Get Started
              </Link>
            </div>
            <Link
              to="/select-level"
              className="md:hidden px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="container mx-auto max-w-7xl relative z-10"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          style={{ opacity, scale }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left space-y-8">
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-5 py-2.5 rounded-full mb-6 border border-blue-200">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-semibold">AI-Powered Course Matching</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight"
              >
                Find Your
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Dream Course
                </span>
                <span className="block text-gray-900">In Seconds</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl"
              >
                Get personalized university course recommendations powered by AI. Match with 500+ programs from Sri Lanka's top 12 universities instantly.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  to="/select-level"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-2xl transition-all font-bold text-lg flex items-center space-x-3 hover:scale-105"
                >
                  <span>Start Matching Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <button 
                  onClick={() => setShowDemoModal(true)}
                  className="group px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg border-2 border-gray-200 flex items-center space-x-3 hover:border-blue-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-blue-600 fill-blue-600" />
                  </div>
                  <span>Watch Demo</span>
                </button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center space-x-8 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/48?img=${i}`}
                      alt="Student"
                      className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    <span className="font-bold text-gray-900">10,000+</span> students matched
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Visual */}
            <motion.div 
              variants={scaleIn}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main Image Card */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=700&fit=crop&q=80"
                    alt="University Students"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  
                  {/* Bottom Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2">
                          {[15, 16, 17, 18].map((i) => (
                            <img 
                              key={i}
                              src={`https://i.pravatar.cc/40?img=${i}`}
                              alt="Student"
                              className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">+ 10,000 students matched</span>
                      </div>
                      <h3 className="text-2xl font-bold">Start Your Academic Journey Today</h3>
                      <p className="text-blue-100">Find programs that match your qualifications and aspirations</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-40"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-2xl opacity-40"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits/Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group hover:scale-105 transition-transform"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                  <benefit.icon className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">{benefit.stat}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{benefit.label}</div>
                <div className="text-sm text-gray-600">{benefit.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Why Choose Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our intelligent platform combines cutting-edge technology with comprehensive university data
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-100 group"
              >
                <div className={`bg-gradient-to-br ${
                  feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  feature.color === 'yellow' ? 'from-yellow-500 to-orange-500' :
                  feature.color === 'green' ? 'from-green-500 to-emerald-600' :
                  'from-purple-500 to-pink-600'
                } w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-4">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">Simple Process</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Three simple steps to find your ideal course in minutes
              </p>
            </motion.div>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 transform -translate-y-1/2 z-0"></div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${
                      index === 0 ? 'from-blue-500 to-blue-600' :
                      index === 1 ? 'from-indigo-500 to-indigo-600' :
                      'from-purple-500 to-purple-600'
                    } flex items-center justify-center shadow-xl relative`}>
                      <span className="text-3xl font-black text-white">{step.number}</span>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -right-24 top-1/2 transform -translate-y-1/2">
                          <ArrowRight className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-100 h-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section id="universities" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-semibold">Partner Institutions</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Top Universities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access courses from Sri Lanka's most prestigious higher education institutions
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {universities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                onClick={() => window.open(uni.url, '_blank')}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={uni.image} 
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${uni.color} opacity-70 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  
                  {/* University Short Name */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-5xl font-black text-white drop-shadow-2xl tracking-tight">
                      {uni.short}
                    </h3>
                  </div>
                </div>
                
                {/* University Full Name */}
                <div className="p-4 bg-white">
                  <p className="text-gray-900 font-bold text-sm text-center leading-tight">
                    {uni.name}
                  </p>
                </div>
                
                {/* Hover Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full mb-4">
                <Star className="w-4 h-4 fill-yellow-600" />
                <span className="text-sm font-semibold">Student Success</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                What Students Say
              </h2>
              <p className="text-xl text-gray-600">
                Real experiences from students who found their perfect match
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-4 border-white shadow-lg"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm font-semibold text-blue-600">{testimonial.university}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <motion.div 
            className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -100, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div 
          className="container mx-auto max-w-5xl text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Find Your
              <span className="block text-yellow-300">Dream Course?</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join 10,000+ students who have successfully matched with their perfect university program
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/select-level"
                className="group px-10 py-5 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all font-bold text-lg shadow-2xl hover:shadow-white/50 flex items-center space-x-3 hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <button className="px-10 py-5 bg-transparent text-white rounded-xl border-2 border-white hover:bg-white hover:text-blue-600 transition-all font-bold text-lg flex items-center space-x-3">
                <Search className="w-6 h-6" />
                <span>Browse Courses</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">Free to Use</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">Instant Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">No Registration Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-medium">Verified Information</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-12 gap-12 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-4">
              <Link to="/" className="flex items-center space-x-2 mb-6 group">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">UniMatch</span>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted AI-powered platform for finding the perfect university course in Sri Lanka. Making education decisions easier, one match at a time.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/32?img=${i+10}`}
                      alt="Student"
                      className="w-8 h-8 rounded-full border-2 border-gray-900"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Trusted by <span className="text-white font-semibold">10,000+</span> students
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-6 text-lg">Platform</h4>
              <ul className="space-y-3">
                <li><Link to="/select-level" className="hover:text-white transition-colors flex items-center space-x-2 group"><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/><span>Get Started</span></Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors flex items-center space-x-2 group"><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/><span>How It Works</span></a></li>
                <li><a href="#features" className="hover:text-white transition-colors flex items-center space-x-2 group"><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/><span>Features</span></a></li>
                <li><a href="#universities" className="hover:text-white transition-colors flex items-center space-x-2 group"><ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/><span>Universities</span></a></li>
              </ul>
            </div>

            {/* Courses */}
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-6 text-lg">Courses</h4>
              <ul className="space-y-3">
                <li><Link to="/select-level" className="hover:text-white transition-colors">O/L Programs</Link></li>
                <li><Link to="/select-level" className="hover:text-white transition-colors">A/L Programs</Link></li>
                <li><Link to="/select-level" className="hover:text-white transition-colors">Diploma Courses</Link></li>
                <li><Link to="/select-level" className="hover:text-white transition-colors">Degree Programs</Link></li>
                <li><Link to="/select-level" className="hover:text-white transition-colors">Postgraduate</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="md:col-span-2">
              <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; 2026 UniMatch. All rights reserved. Made with <span className="text-red-500">❤</span> in Sri Lanka
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Video Modal */}
      {showDemoModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowDemoModal(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl"
          >
            <div className="relative w-full bg-black">
              {/* Close Button */}
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Video Container */}
              <div className="aspect-video w-full bg-black">
                <DemoVideo />
              </div>

              {/* Info Section */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  AI-Powered Course Matching in Action
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Watch how UniMatch uses advanced AI algorithms to analyze your qualifications and recommend the perfect courses from Sri Lanka's top universities. The system considers your grades, preferences, and career goals to find your ideal match in seconds.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">⚡ Instant</div>
                    <p className="text-sm text-gray-600">Get results in seconds</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">🤖 Intelligent</div>
                    <p className="text-sm text-gray-600">AI-powered matching</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-1">🎯 Accurate</div>
                    <p className="text-sm text-gray-600">500+ verified courses</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
