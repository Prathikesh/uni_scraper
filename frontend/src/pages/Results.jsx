import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AIInsightsDashboard from "../components/AIInsightsDashboard";
import {
  ArrowLeft,
  ExternalLink,
  Award,
  TrendingUp,
  CheckCircle,
  Star,
  BookOpen,
  Globe,
  FileText,
  Download,
  Share2,
  Filter,
  Building2,
  MapPin,
  Sparkles
} from "lucide-react";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, [data, navigate]);

  const downloadPDF = async () => {
  setIsGeneratingPDF(true);
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    
    // --- 1. Define Professional Color Palette ---
    const theme = {
      primary: [15, 23, 42],      // Slate 900 (Deep Navy - Header)
      textDark: [51, 65, 85],     // Slate 700 (Main Text)
      textMuted: [100, 116, 139], // Slate 500 (Metadata)
      accent: [37, 99, 235],      // Blue 600 (Buttons/Links)
      success: [22, 163, 74],     // Green 600 (High Scores)
      cardBg: [255, 255, 255],    // White (Card Background)
      cardBorder: [226, 232, 240] // Light Gray (Card Border)
    };

    let yPosition = margin;

    // --- 2. Header Section ---
    // Dark Navy Header Background
    pdf.setFillColor(...theme.primary);
    pdf.rect(0, 0, pageWidth, 50, 'F');

    // Title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(26);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Course Recommendations', margin, 20);

    // Subtitle / Report Info
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(203, 213, 225); // Slate 300
    pdf.text(`REPORT GENERATED FOR: ${info.title.toUpperCase()}`, margin, 30);
    pdf.text(`DATE: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, margin, 36);

    // Summary Tag
    pdf.setFillColor(51, 65, 85); // Slate 700 pill
    pdf.roundedRect(margin, 41, 45, 6, 1, 1, 'F');
    pdf.setFontSize(8);
    pdf.setTextColor(255, 255, 255);
    pdf.text(`${recommendations.length} MATCHES FOUND`, margin + 22.5, 44, { align: 'center', baseline: 'middle' });

    yPosition = 65; // Start content below header

    // --- 3. Content Loop ---
    recommendations.forEach((course) => {
      const scorePercent = (course.final_score * 100).toFixed(0);
      
      // Calculate layout dynamic height based on title length
      // We reserve width for title (pageWidth - margins - badge width - padding)
      const titleWidth = pageWidth - (margin * 2) - 45; 
      pdf.setFontSize(13);
      pdf.setFont('helvetica', 'bold');
      const splitTitle = pdf.splitTextToSize(course.course_name, titleWidth);
      const titleHeight = splitTitle.length * 6; // Approx 6mm per line
      
      const cardHeight = Math.max(45, titleHeight + 35); // Dynamic card height
      
      // Page Break Check
      if (yPosition + cardHeight > pageHeight - 20) {
        pdf.addPage();
        yPosition = margin + 10;
      }

      // --- A. Card Container ---
      // Draw Border
      pdf.setDrawColor(...theme.cardBorder);
      pdf.setLineWidth(0.4);
      pdf.setFillColor(...theme.cardBg);
      pdf.roundedRect(margin, yPosition, pageWidth - (margin * 2), cardHeight, 2, 2, 'FD');

      // Draw Left Accent Strip (Green)
      pdf.setFillColor(...theme.success);
      pdf.rect(margin, yPosition, 2, cardHeight, 'F'); // 2mm strip on left

      // --- B. Course Title ---
      pdf.setTextColor(...theme.primary);
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(13);
      pdf.text(splitTitle, margin + 8, yPosition + 12);

      // --- C. Institution Name ---
      const instY = yPosition + 12 + titleHeight; // Place below title
      pdf.setTextColor(...theme.textMuted);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text(getInstitutionDisplayName(course.institution).toUpperCase(), margin + 8, instY);

      // --- D. Match Score Badge (Top Right) ---
      const badgeWidth = 28;
      const badgeHeight = 8;
      const badgeX = pageWidth - margin - badgeWidth - 6;
      const badgeY = yPosition + 8;

      // Badge Background (Green Pill)
      pdf.setFillColor(...theme.success);
      pdf.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 4, 4, 'F');
      
      // Badge Text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${scorePercent}% Match`, badgeX + (badgeWidth/2), badgeY + 4, { align: 'center', baseline: 'middle' });

      // --- E. Progress Bar ---
      const barY = yPosition + cardHeight - 15;
      const barX = margin + 8;
      const barWidth = 60;
      
      // Label
      pdf.setFontSize(8);
      pdf.setTextColor(...theme.textMuted);
      pdf.text('Compatibility Score:', barX, barY - 4);

      // Background Line
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(2);
      pdf.line(barX, barY, barX + barWidth, barY);

      // Fill Line
      pdf.setDrawColor(...theme.success);
      pdf.line(barX, barY, barX + (barWidth * course.final_score), barY);

      // --- F. "View Course" Button (Bottom Right) ---
      const btnWidth = 32;
      const btnHeight = 9;
      const btnX = pageWidth - margin - btnWidth - 6;
      const btnY = yPosition + cardHeight - 16;

      // Button Shape
      pdf.setFillColor(...theme.accent); // Blue
      pdf.roundedRect(btnX, btnY, btnWidth, btnHeight, 1, 1, 'F');

      // Button Text
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      // Using baseline middle for perfect centering
      pdf.textWithLink('VIEW DETAILS', btnX + (btnWidth/2), btnY + 4.5, { 
        align: 'center', 
        baseline: 'middle',
        url: course.source_url 
      });

      // Advance Y Position
      yPosition += cardHeight + 6; // Add gap between cards
    });

    // --- 4. Footer ---
    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      
      // Footer Divider
      pdf.setDrawColor(...theme.cardBorder);
      pdf.setLineWidth(0.5);
      pdf.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

      // Footer Text
      pdf.setFontSize(8);
      pdf.setTextColor(...theme.textMuted);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Generated by CourseFinder AI', margin, pageHeight - 10);
      pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
    }

    // Save File
    const fileName = `Course_Report_${info.title.replace(/[^a-z0-9]/gi, '_')}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    setIsGeneratingPDF(false);
  }
};
  if (!data) {
    return null;
  }

  const { level, recommendations } = data;

  const levelInfo = {
    OL: {
      title: "O/L Qualifications",
      color: "green",
      gradient: "from-green-500 to-emerald-600",
      lightBg: "from-green-50 to-emerald-50",
      icon: BookOpen,
      description: "Foundation & Certificate Programs"
    },
    AL: {
      title: "A/L Qualifications",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      lightBg: "from-blue-50 to-indigo-50",
      icon: Award,
      description: "Undergraduate Degree Programs"
    },
    DIPLOMA: {
      title: "Diploma Qualifications",
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      lightBg: "from-purple-50 to-violet-50",
      icon: FileText,
      description: "Advanced Diploma & Degree Programs"
    },
    HND: {
      title: "HND Qualifications",
      color: "orange",
      gradient: "from-orange-500 to-amber-600",
      lightBg: "from-orange-50 to-amber-50",
      icon: TrendingUp,
      description: "Top-up Degree Programs"
    },
    BSC: {
      title: "Degree Qualifications",
      color: "red",
      gradient: "from-red-500 to-rose-600",
      lightBg: "from-red-50 to-rose-50",
      icon: Award,
      description: "Postgraduate Programs"
    },
    POSTGRAD: {
      title: "Postgraduate Qualifications",
      color: "indigo",
      gradient: "from-indigo-500 to-purple-600",
      lightBg: "from-indigo-50 to-purple-50",
      icon: Award,
      description: "Masters & Doctoral Programs"
    }
  };

  const info = levelInfo[level] || levelInfo.OL;
  const IconComponent = info.icon;

  const getScoreColor = (score) => {
    if (score >= 0.8) return {
      bg: "from-green-500 to-emerald-600",
      text: "text-green-600",
      badge: "bg-green-100 text-green-700 border-green-300"
    };
    if (score >= 0.6) return {
      bg: "from-blue-500 to-cyan-600",
      text: "text-blue-600",
      badge: "bg-blue-100 text-blue-700 border-blue-300"
    };
    if (score >= 0.4) return {
      bg: "from-yellow-500 to-orange-500",
      text: "text-yellow-600",
      badge: "bg-yellow-100 text-yellow-700 border-yellow-300"
    };
    return {
      bg: "from-gray-400 to-gray-500",
      text: "text-gray-600",
      badge: "bg-gray-100 text-gray-700 border-gray-300"
    };
  };

  const getScoreLabel = (score) => {
    if (score >= 0.8) return "Excellent Match";
    if (score >= 0.6) return "Good Match";
    if (score >= 0.4) return "Fair Match";
    return "Possible Match";
  };

  const getInstitutionDisplayName = (institution) => {
    const institutionMap = {
      "anc": "ANC Education",
      "apiit": "APIIT Sri Lanka",
      "bcas": "BCAS Campus",
      "cinec": "CINEC Campus",
      "esoft": "ESOFT Metro Campus",
      "horizon": "Horizon Campus",
      "icbt": "ICBT Campus",
      "iit": "Informatics Institute of Technology",
      "kiu": "KIU University",
      "nibm": "National Institute of Business Management",
      "nsbm": "NSBM Green University",
      "sltc": "SLTC Research University"
    };
    return institutionMap[institution?.toLowerCase()] || institution || "University";
  };

  const getCourseImage = (courseName) => {
    const name = courseName.toLowerCase();
    
    // Match course keywords to relevant Unsplash search terms
    // Check most specific matches first
    if (name.includes('civil engineering') || name.includes('civil')) {
      return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop';
    } else if (name.includes('mechanical engineering') || name.includes('mechanical')) {
      return 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=250&fit=crop';
    } else if (name.includes('electrical engineering') || name.includes('electrical')) {
      return 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop';
    } else if (name.includes('mechatronics') || name.includes('mechatronic') || name.includes('robotics') || name.includes('automation')) {
      return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop';
    } else if (name.includes('information technology') || name.includes('mit') || name.includes('msc in it')) {
      return 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop';
    } else if (name.includes('computer') || name.includes('computing') || name.includes('software') || name.includes('programming')) {
      return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop';
    } else if (name.includes('data') || name.includes('analytics') || name.includes('data science')) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop';
    } else if (name.includes('cyber') || name.includes('security') || name.includes('network')) {
      return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop';
    } else if (name.includes('engineering')) {
      return 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=250&fit=crop';
    } else if (name.includes('business') || name.includes('management') || name.includes('administration') || name.includes('mba')) {
      return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop';
    } else if (name.includes('pharmaceutical') || name.includes('pharmacy') || name.includes('pharmacology')) {
      return 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop';
    } else if (name.includes('medicine') || name.includes('medical') || name.includes('health') || name.includes('nursing')) {
      return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop';
    } else if (name.includes('psychology') || name.includes('counseling') || name.includes('mental health')) {
      return 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop';
    } else if (name.includes('law') || name.includes('legal') || name.includes('llb') || name.includes('llm')) {
      return 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop';
    } else if (name.includes('accounting') || name.includes('finance') || name.includes('banking')) {
      return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop';
    } else if (name.includes('digital marketing') || name.includes('social media marketing') || name.includes('online marketing')) {
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop';
    } else if (name.includes('marketing') || name.includes('advertising')) {
      return 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=250&fit=crop';
    } else if (name.includes('design') || name.includes('graphic') || name.includes('creative')) {
      return 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop';
    } else if (name.includes('architecture')) {
      return 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop';
    } else if (name.includes('hotel') || name.includes('hospitality') || name.includes('tourism')) {
      return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop';
    } else if (name.includes('education') || name.includes('teaching')) {
      return 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop';
    } else if (name.includes('media') || name.includes('journalism') || name.includes('communication')) {
      return 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop';
    } else if (name.includes('art') || name.includes('fine art')) {
      return 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=250&fit=crop';
    } else if (name.includes('logistics') || name.includes('transportation') || name.includes('supply chain')) {
      return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=250&fit=crop';
    } else if (name.includes('marine') || name.includes('maritime') || name.includes('ocean') || name.includes('naval') || name.includes('nautical') || name.includes('shipping')) {
      return 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop';
    } else if (name.includes('refresher') || name.includes('updating') || name.includes('training') || name.includes('professional development') || name.includes('support level')) {
      return 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop';
    } else if (name.includes('quantity surveying') || name.includes('surveying') || name.includes('construction management')) {
      return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop';
    } else if (name.includes('diploma') || name.includes('certificate')) {
      return 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop';
    } else if (name.includes('foundation')) {
      return 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop';
    } else {
      // Default education/university image
      return 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Professional Header */}
        <div className="mb-8">
          <Link
            to="/select-level"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="font-medium">Back to Search</span>
          </Link>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="print-header w-full">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Course Recommendations
              </h1>
              <p className="text-gray-600">
                {info.title} • Found {recommendations.length} {recommendations.length === 1 ? 'course' : 'courses'} matching your profile
              </p>
            </div>
            
            <div className="flex items-center gap-2 no-print">
              <button
                onClick={downloadPDF}
                disabled={isGeneratingPDF}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span className="font-medium">Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    <span className="font-medium">Download PDF Report</span>
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'My Course Recommendations',
                      text: `Found ${recommendations.length} matching courses!`,
                    });
                  }
                }}
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* No Results State */}
        {recommendations.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No Courses Found
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any courses matching your qualifications.
              Try adjusting your criteria or select a different level.
            </p>
            <Link
              to="/select-level"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Different Qualifications
            </Link>
          </div>
        )}

        {/* Results Grid View */}
        {recommendations.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((course, index) => {
              const scoreColors = getScoreColor(course.final_score);
              const scorePercent = (course.final_score * 100).toFixed(0);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  className="group relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden print-card"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getCourseImage(course.course_name)} 
                      alt={course.course_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Rank Badge - Overlay on Image */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${info.gradient} shadow-lg flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                    </div>

                    {/* AI Badge */}
                    <div className="absolute top-4 left-16 z-10">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 shadow-lg backdrop-blur-sm">
                        <Sparkles className="w-3 h-3" />
                        AI Match
                      </div>
                    </div>

                    {/* Match Score Badge - Overlay on Image */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`px-3 py-1.5 rounded-lg ${scoreColors.badge} border-2 backdrop-blur-sm shadow-lg`}>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${scoreColors.text} leading-none`}>
                            {scorePercent}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Course Name */}
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-3 line-clamp-3 leading-tight"
                      title={course.course_name}
                    >
                      {course.course_name}
                    </h3>

                    {/* Institution */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                      <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-medium truncate">{getInstitutionDisplayName(course.institution)}</span>
                    </div>

                    {/* Match Label */}
                    <div className="mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${scoreColors.badge}`}>
                        <CheckCircle className="w-3 h-3 mr-1.5" />
                        {getScoreLabel(course.final_score)}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500">
                          Compatibility
                        </span>
                        <span className="text-xs font-bold text-gray-700">
                          {scorePercent}/100
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${scoreColors.bg}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${scorePercent}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * index }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={course.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mr-2" />
                        Details
                      </a>
                      <a
                        href={course.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r ${info.gradient} text-white rounded-lg hover:shadow-lg transition-all text-sm font-medium`}
                      >
                        Apply
                      </a>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-${info.color}-200 transition-colors pointer-events-none`}></div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* AI Insights Section */}
        {data?.ai_insights && (
          <motion.div
            className="mt-16 pt-12 border-t-2 border-gray-200"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AIInsightsDashboard aiInsights={data.ai_insights} />
          </motion.div>
        )}

        {/* Bottom Actions */}
        {recommendations.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/select-level"
              className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Different Level
            </Link>
            <button
              onClick={downloadPDF}
              disabled={isGeneratingPDF}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  <span>Download PDF Report</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
