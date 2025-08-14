import { useState, useEffect } from "react";
import { Calculator, Heart, Zap } from "lucide-react";

export default function LoadingScreen({ onLoadComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  const loadingTexts = [
    "กำลังเตรียมตัวคำนวณ...",
    "กำลังโหลดสูตร Harris-Benedict...",
    "กำลังตั้งค่าเครื่องมือ...",
    "เกือบเสร็จแล้ว...",
    "พร้อมใช้งาน!",
  ];

  useEffect(() => {
    // Show logo animation
    setTimeout(() => setShowLogo(true), 300);

    // Loading progress animation
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + Math.random() * 12 + 3;

          // Change text based on progress
          if (newProgress > 80 && currentText < 4) {
            setCurrentText(4);
          } else if (newProgress > 60 && currentText < 3) {
            setCurrentText(3);
          } else if (newProgress > 40 && currentText < 2) {
            setCurrentText(2);
          } else if (newProgress > 20 && currentText < 1) {
            setCurrentText(1);
          }

          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (onLoadComplete) onLoadComplete();
            }, 800);
            return 100;
          }
          return newProgress;
        });
      }, 120);

      return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentText, onLoadComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute inset-0">
        <svg
          className="absolute bottom-0 w-full h-full opacity-20"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="waveGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient
              id="waveGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Wave 1 */}
          <path
            fill="url(#waveGradient1)"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,197.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse"
            style={{ animationDuration: "4s" }}
          />

          {/* Wave 2 */}
          <path
            fill="url(#waveGradient2)"
            d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,218.7C672,224,768,192,864,181.3C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse"
            style={{ animationDuration: "6s", animationDelay: "1s" }}
          />

          {/* Wave 3 */}
          <path
            fill="url(#waveGradient1)"
            fillOpacity="0.3"
            d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,192C672,171,768,149,864,154.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-pulse"
            style={{ animationDuration: "8s", animationDelay: "0.5s" }}
          />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo Animation */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            showLogo ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <div className="relative">
            {/* Outer Ring */}
            <div
              className="w-32 h-32 border-4 border-white/20 rounded-full animate-spin"
              style={{ animationDuration: "3s" }}
            >
              <div className="absolute top-2 left-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>

            {/* Inner Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Calculator className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>

            {/* Orbiting Elements */}
            <div
              className="absolute inset-0 animate-spin"
              style={{ animationDuration: "4s" }}
            >
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full"></div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
            BMR Calculator
          </h1>
          <p className="text-xl text-blue-200 animate-fade-in-up">
            เครื่องคำนวณอัตราการเผาผลาญพื้นฐาน
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-full max-w-md mb-8">
          {/* Progress Bar */}
          <div className="relative bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>

            {/* Shimmer Effect */}
            <div
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
              style={{
                left: `${Math.max(0, loadingProgress - 10)}%`,
                animationDuration: "1.5s",
              }}
            ></div>
          </div>

          {/* Progress Percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-blue-200 text-sm font-medium">
              {loadingTexts[currentText]}
            </span>
            <span className="text-white font-bold text-lg">
              {Math.round(loadingProgress)}%
            </span>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex space-x-8 mb-8">
          {[
            {
              icon: Calculator,
              delay: "0s",
              color: "from-blue-400 to-cyan-500",
            },
            { icon: Heart, delay: "0.3s", color: "from-red-400 to-pink-500" },
            {
              icon: Zap,
              delay: "0.6s",
              color: "from-yellow-400 to-orange-500",
            },
          ].map(({ icon: Icon, delay, color }, index) => (
            <div
              key={index}
              className="animate-bounce"
              style={{ animationDelay: delay, animationDuration: "2s" }}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-3 h-3 bg-white/60 rounded-full animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-8 text-center">
          <p className="text-blue-200 text-sm">
            ✨ เตรียมพบกับประสบการณ์การคำนวณ BMR ที่แม่นยำ
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
}
