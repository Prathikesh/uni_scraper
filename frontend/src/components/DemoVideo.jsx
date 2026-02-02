import { useEffect, useRef } from 'react';

export default function DemoVideo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let currentFrame = 0;
    const totalFrames = 360; // 6 second loop at 60fps

    const drawFrame = (frameNumber) => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const progress = frameNumber / totalFrames;

      // Title with better styling
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('UniMatch AI Demo', 60, 70);

      ctx.font = '16px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = 'rgba(147, 197, 253, 0.8)';
      ctx.fillText('AI-Powered Course Recommendation System', 60, 100);

      // Scene 1: Student Form (0-120 frames)
      if (progress < 0.33) {
        const sceneProgress = progress / 0.33;
        
        // Card background
        ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
        ctx.beginPath();
        ctx.roundRect(50, 130, 320, 280, 12);
        ctx.fill();

        // Border
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('📝 Step 1: Student Profile', 70, 170);

        ctx.font = '15px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, Math.min(1, sceneProgress * 2))';
        const items = [
          '🎓 Qualification: A/L (Science Stream)',
          '📊 A/L Passes: 3',
          '🔬 Subjects: Physics, Chemistry, Biology',
          '🎯 Interest: Software Engineering',
          '✅ English: Proficient',
          '✅ Mathematics: Excellent'
        ];
        
        items.forEach((item, idx) => {
          ctx.fillText(item, 70, 210 + idx * 32);
        });

        // Checkmark animation
        if (sceneProgress > 0.8) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(400, 165);
          ctx.lineTo(410, 175);
          ctx.lineTo(425, 155);
          ctx.stroke();
        }
      }

      // Scene 2: AI Processing (120-240 frames)
      if (progress >= 0.33 && progress < 0.66) {
        const sceneProgress = (progress - 0.33) / 0.33;

        // Left side - profile card (smaller)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
        ctx.beginPath();
        ctx.roundRect(50, 130, 280, 150, 10);
        ctx.fill();

        ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
        ctx.fillText('✓ Profile Loaded', 70, 160);

        // Right side - AI Processing
        ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
        ctx.beginPath();
        ctx.roundRect(400, 130, 320, 280, 12);
        ctx.fill();

        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('🤖 Step 2: AI Analysis', 420, 170);

        // Progress bars with labels
        ctx.font = '13px "Segoe UI", Arial, sans-serif';
        const processes = [
          { label: '🧠 Semantic Analysis', color: '#3b82f6' },
          { label: '📈 ML Scoring', color: '#8b5cf6' },
          { label: '🎯 Field Matching', color: '#ec4899' },
          { label: '⭐ Grade Analysis', color: '#f59e0b' }
        ];

        processes.forEach((process, idx) => {
          const barProgress = Math.min(1, (sceneProgress * 5) - (idx * 0.3));
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.fillText(process.label, 420, 215 + idx * 50);
          
          // Progress bar background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.roundRect(420, 230 + idx * 50, 280, 18, 6);
          ctx.fill();
          
          // Progress bar fill
          ctx.fillStyle = process.color;
          ctx.beginPath();
          ctx.roundRect(420, 230 + idx * 50, 280 * barProgress, 18, 6);
          ctx.fill();
          
          // Percentage text
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.font = 'bold 12px "Segoe UI", Arial, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(`${Math.round(barProgress * 100)}%`, 715, 244 + idx * 50);
          ctx.textAlign = 'left';
        });
      }

      // Scene 3: Results (240-360 frames)
      if (progress >= 0.66) {
        const sceneProgress = (progress - 0.66) / 0.34;

        // Results header
        ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
        ctx.beginPath();
        ctx.roundRect(50, 130, 670, 60, 12);
        ctx.fill();

        ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('✨ Step 3: Personalized Recommendations', 70, 173);

        // Result cards
        const courses = [
          { name: 'BSc (Hons) Software Engineering', uni: 'APIIT', score: 98 },
          { name: 'BSc Computer Science (Cloud Tech)', uni: 'IIT', score: 96 },
          { name: 'BEng Software Engineering (Hons)', uni: 'NSBM', score: 94 }
        ];

        courses.forEach((course, idx) => {
          const cardOpacity = Math.min(1, (sceneProgress * 5) - (idx * 0.25));
          const yOffset = 30 * (1 - cardOpacity);

          // Card background
          ctx.fillStyle = `rgba(59, 130, 246, ${0.12 * cardOpacity})`;
          ctx.beginPath();
          ctx.roundRect(50, 220 + idx * 85 + yOffset, 670, 70, 10);
          ctx.fill();

          ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * cardOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Rank and course name
          ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * cardOpacity})`;
          ctx.font = 'bold 16px "Segoe UI", Arial, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(`${idx + 1}. ${course.name}`, 70, 250 + idx * 85 + yOffset);

          // University and location
          ctx.font = '14px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = `rgba(147, 197, 253, ${0.85 * cardOpacity})`;
          ctx.fillText(`🏫 ${course.uni} Sri Lanka`, 70, 273 + idx * 85 + yOffset);

          // Score label
          ctx.fillStyle = `rgba(255, 255, 255, ${0.75 * cardOpacity})`;
          ctx.font = '13px "Segoe UI", Arial, sans-serif';
          ctx.fillText('Match Score:', 500, 250 + idx * 85 + yOffset);

          // Score bar background
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.beginPath();
          ctx.roundRect(500, 260 + idx * 85 + yOffset, 200, 22, 6);
          ctx.fill();

          // Score bar fill - gradient
          const scoreGradient = ctx.createLinearGradient(500, 0, 700, 0);
          scoreGradient.addColorStop(0, '#22c55e');
          scoreGradient.addColorStop(1, '#10b981');
          ctx.fillStyle = scoreGradient;
          ctx.beginPath();
          ctx.roundRect(500, 260 + idx * 85 + yOffset, 200 * (course.score / 100), 22, 6);
          ctx.fill();

          // Score percentage text
          ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * cardOpacity})`;
          ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`${course.score}%`, 600, 277 + idx * 85 + yOffset);
          ctx.textAlign = 'left';
        });

        // Final CTA
        if (sceneProgress > 0.6) {
          ctx.fillStyle = 'rgba(255, 255, 255, Math.min(0.9, (sceneProgress - 0.6) * 3))';
          ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
          ctx.fillText('🚀 Ready to find your perfect course? Click "Get Started"', 50, 530);
        }
      }

      // Bottom progress bar
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, height - 8, width, 8);

      const barGradient = ctx.createLinearGradient(0, 0, width * progress, 0);
      barGradient.addColorStop(0, '#3b82f6');
      barGradient.addColorStop(0.5, '#8b5cf6');
      barGradient.addColorStop(1, '#ec4899');
      ctx.fillStyle = barGradient;
      ctx.fillRect(0, height - 8, width * progress, 8);
    };

    const animate = () => {
      drawFrame(currentFrame);
      currentFrame = (currentFrame + 1) % totalFrames;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="w-full h-full"
    />
  );
}
