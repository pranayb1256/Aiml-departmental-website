import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Distinct Cinematic Easings
const easeSmooth = [0.25, 1, 0.5, 1];
const easeExpo = [0.16, 1, 0.3, 1];
const easeInOut = [0.65, 0, 0.35, 1];

const AIMLLoadingIntro = ({ onComplete }) => {
  const [stage, setStage] = useState('hub'); // hub -> trace -> reveal -> exit
  const [isSkipped, setIsSkipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleComplete = () => {
    if (!isSkipped) {
      setIsSkipped(true);
      onComplete();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleComplete();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isSkipped) {
      const timer = setTimeout(handleComplete, 500);
      return () => clearTimeout(timer);
    }

    const timers = [];
    // Sequence
    timers.push(setTimeout(() => setStage('trace'), 1200)); // Hub pulses, then shoots energy
    timers.push(setTimeout(() => setStage('reveal'), 2800)); // Paths finish drawing, fill text
    timers.push(setTimeout(() => setStage('exit'), 4200)); // Hold, then exit
    timers.push(setTimeout(() => handleComplete(), 5000)); // Clean unmount

    return () => timers.forEach(clearTimeout);
  }, [prefersReducedMotion, isSkipped]);

  // SVG Paths for "AI & ML"
  const paths = [
    // A
    "M60,110 L90,30 L120,110 M75,85 L105,85",
    // I
    "M150,30 L150,110 M135,30 L165,30 M135,110 L165,110",
    // & (Stylized)
    "M210,110 C180,110 170,80 190,60 C210,40 200,30 190,30 C170,30 170,55 220,100",
    // M
    "M260,110 L260,30 L295,75 L330,30 L330,110",
    // L
    "M370,30 L370,110 L410,110"
  ];

  return (
    <AnimatePresence>
      {!isSkipped && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030509] overflow-hidden text-white cursor-default"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: easeSmooth }}
        >
          {/* Film Grain Texture */}
          <svg className="fixed inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-screen z-10">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>

          {/* Cinematic Ambient Lighting */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(3,5,9,0) 70%)",
            }}
            animate={{ 
              scale: stage === 'hub' ? [0.8, 1.2, 1] : (stage === 'trace' ? 1.5 : 2),
              opacity: stage === 'exit' ? 0 : 1
            }}
            transition={{ duration: 2, ease: easeInOut }}
          />

          {prefersReducedMotion ? (
            <div className="relative z-20 flex flex-col items-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4 font-['Outfit']">AI & ML</h1>
            </div>
          ) : (
            <div className="relative z-20 w-full max-w-5xl h-96 flex items-center justify-center">
              
              {/* Stage 1: The Network Hub */}
              <AnimatePresence>
                {stage === 'hub' && (
                  <motion.div
                    className="absolute flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: easeExpo }}
                  >
                    <div className="relative flex items-center justify-center">
                      <motion.div 
                        className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_30px_10px_rgba(37,99,235,0.8)]"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute border border-blue-500/30 rounded-full"
                          initial={{ width: 0, height: 0, opacity: 1 }}
                          animate={{ width: i * 100, height: i * 100, opacity: 0 }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stage 2 & 3: SVG Path Tracing & Fill */}
              {(stage === 'trace' || stage === 'reveal' || stage === 'exit') && (
                <div className="relative flex flex-col items-center">
                  
                  {/* Glassmorphic Backing (Reveals late) */}
                  <motion.div
                    className="absolute inset-0 bg-blue-900/5 backdrop-blur-lg rounded-3xl border border-white/5 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: stage === 'reveal' ? 1 : 0, 
                      scale: stage === 'reveal' ? 1 : 0.8 
                    }}
                    transition={{ duration: 1, ease: easeExpo }}
                    style={{ zIndex: -1, inset: '-40px -80px' }}
                  />

                  <svg viewBox="0 0 480 160" className="w-full max-w-[800px] h-auto overflow-visible">
                    <defs>
                      <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#60A5FA" />
                        <stop offset="50%" stopColor="#2563EB" />
                        <stop offset="100%" stopColor="#93C5FD" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Animated Outlines */}
                    {paths.map((path, i) => (
                      <motion.path
                        key={`outline-${i}`}
                        d={path}
                        fill="none"
                        stroke="url(#neonGradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: stage === 'trace' ? 1 : (stage === 'reveal' ? 1 : 1),
                          opacity: stage === 'trace' ? 1 : 0 // fades out as fill comes in
                        }}
                        transition={{ 
                          pathLength: { duration: 1.5, delay: i * 0.15, ease: easeInOut },
                          opacity: { duration: 0.5, ease: "easeOut" }
                        }}
                      />
                    ))}

                    {/* Solid Fill (Reveals in Stage 3) */}
                    <AnimatePresence>
                      {stage === 'reveal' && (
                        <motion.text
                          x="240"
                          y="110"
                          textAnchor="middle"
                          fill="url(#neonGradient)"
                          className="font-bold text-[85px] tracking-tight font-['Outfit',sans-serif]"
                          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.95 }}
                          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                          transition={{ duration: 0.8, ease: easeExpo }}
                        >
                          AI & ML
                        </motion.text>
                      )}
                    </AnimatePresence>
                  </svg>

                  {/* Subtitle */}
                  <motion.div
                    className="mt-6 flex items-center justify-center overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: stage === 'reveal' ? 1 : 0, 
                      y: stage === 'reveal' ? 0 : 20 
                    }}
                    transition={{ duration: 0.8, delay: 0.3, ease: easeExpo }}
                  >
                    <div className="h-[1px] w-12 bg-blue-500/50 mr-4" />
                    <span className="text-sm md:text-base font-mono tracking-[0.4em] text-blue-100 uppercase">
                      Department
                    </span>
                    <div className="h-[1px] w-12 bg-blue-500/50 ml-4" />
                  </motion.div>

                </div>
              )}
            </div>
          )}

          {/* Minimalist Skip Button */}
          <motion.button
            className="absolute bottom-10 right-10 text-[10px] font-mono tracking-widest text-white/30 hover:text-white transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleComplete}
          >
            SKIP [ESC]
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIMLLoadingIntro;
