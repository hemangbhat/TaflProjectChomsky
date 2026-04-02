import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function HierarchyDiagram({ data, selectedId, onSelect, isDark }) {
  const reversedData = [...data].reverse();
  const hasSelection = selectedId !== null;
  const [hoveredCard, setHoveredCard] = useState(null);

  const colorStyles = {
    green: {
      bg: isDark ? 'bg-green-500/10' : 'bg-green-100/80',
      border: 'border-green-500/30',
      text: isDark ? 'text-green-400' : 'text-green-700',
      glow: '0 0 80px rgba(34,197,94,0.5), 0 0 120px rgba(34,197,94,0.3)',
      hoverGlow: '0 0 40px rgba(34,197,94,0.3)',
      gradient: 'from-green-500/20 via-green-500/10 to-transparent',
      accent: 'rgba(34,197,94,0.15)',
      line: '#22c55e',
    },
    blue: {
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-100/80',
      border: 'border-blue-500/30',
      text: isDark ? 'text-blue-400' : 'text-blue-700',
      glow: '0 0 80px rgba(59,130,246,0.5), 0 0 120px rgba(59,130,246,0.3)',
      hoverGlow: '0 0 40px rgba(59,130,246,0.3)',
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      accent: 'rgba(59,130,246,0.15)',
      line: '#3b82f6',
    },
    orange: {
      bg: isDark ? 'bg-orange-500/10' : 'bg-orange-100/80',
      border: 'border-orange-500/30',
      text: isDark ? 'text-orange-400' : 'text-orange-700',
      glow: '0 0 80px rgba(249,115,22,0.5), 0 0 120px rgba(249,115,22,0.3)',
      hoverGlow: '0 0 40px rgba(249,115,22,0.3)',
      gradient: 'from-orange-500/20 via-orange-500/10 to-transparent',
      accent: 'rgba(249,115,22,0.15)',
      line: '#f97316',
    },
    red: {
      bg: isDark ? 'bg-red-500/10' : 'bg-red-100/80',
      border: 'border-red-500/30',
      text: isDark ? 'text-red-400' : 'text-red-700',
      glow: '0 0 80px rgba(239,68,68,0.5), 0 0 120px rgba(239,68,68,0.3)',
      hoverGlow: '0 0 40px rgba(239,68,68,0.3)',
      gradient: 'from-red-500/20 via-red-500/10 to-transparent',
      accent: 'rgba(239,68,68,0.15)',
      line: '#ef4444',
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <TooltipProvider>
    <div className="relative w-full max-w-4xl mx-auto py-16">
      {/* Animated SVG Connecting Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradientMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colorStyles.red.line} stopOpacity="0.6" />
            <stop offset="33%" stopColor={colorStyles.orange.line} stopOpacity="0.6" />
            <stop offset="66%" stopColor={colorStyles.blue.line} stopOpacity="0.6" />
            <stop offset="100%" stopColor={colorStyles.green.line} stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main connecting line */}
        <motion.line
          x1="50%"
          y1="8%"
          x2="50%"
          y2="85%"
          stroke="url(#lineGradientMain)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Animated dots on the line */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="50%"
            r="4"
            fill={[colorStyles.red.line, colorStyles.orange.line, colorStyles.blue.line, colorStyles.green.line][i]}
            filter="url(#glow)"
            initial={{ cy: '8%', opacity: 0 }}
            animate={{
              cy: ['8%', '85%'],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: 1 + i * 0.8,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center gap-8"
        style={{ zIndex: 1 }}
      >
        {reversedData.map((language, index) => {
          const widthPercent = 92 - index * 10;
          const isSelected = selectedId === language.id;
          const isOther = hasSelection && !isSelected;
          const style = colorStyles[language.color];

          return (
            <motion.div
              key={language.id}
              variants={cardVariants}
              className="relative w-full flex justify-center"
              style={{
                zIndex: isSelected ? 50 : reversedData.length - index,
                perspective: '1200px',
              }}
              onMouseEnter={() => setHoveredCard(language.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Glow effect behind selected card */}
              <motion.div
                className="absolute rounded-3xl pointer-events-none"
                animate={{
                  opacity: isSelected ? 1 : 0,
                  scale: isSelected ? 1.02 : 1,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  width: `${widthPercent}%`,
                  height: '100%',
                  boxShadow: style.glow,
                  filter: 'blur(30px)',
                }}
              />

              <motion.div
                onClick={() => onSelect(language.id)}
                style={{ width: `${widthPercent}%` }}
                animate={{
                  y: isSelected ? 0 : [0, -8, 0],
                  scale: isSelected ? 1.05 : isOther ? 0.98 : 1,
                  opacity: isOther ? 0.4 : 1,
                  filter: isOther ? 'blur(2px)' : 'blur(0px)',
                  rotateX: hoveredCard === language.id && !hasSelection ? 2 : 0,
                  rotateY: hoveredCard === language.id && !hasSelection ? -2 : 0,
                }}
                transition={{
                  y: {
                    duration: 4 + index * 0.3,
                    repeat: isSelected ? 0 : Infinity,
                    ease: "easeInOut",
                  },
                  scale: { type: "spring", stiffness: 300, damping: 25 },
                  opacity: { duration: 0.3 },
                  filter: { duration: 0.3 },
                  rotateX: { type: "spring", stiffness: 200, damping: 20 },
                  rotateY: { type: "spring", stiffness: 200, damping: 20 },
                }}
                whileHover={!hasSelection ? {
                  scale: 1.03,
                  y: -12,
                  boxShadow: style.hoverGlow,
                  rotateX: 3,
                  rotateY: -3,
                } : {}}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative cursor-pointer rounded-3xl p-7 md:p-9
                  border-2 backdrop-blur-2xl
                  transition-colors duration-300
                  ${style.bg} ${style.border}
                  bg-gradient-to-br ${style.gradient}
                  ${isSelected ? 'ring-2 ring-white/30 border-opacity-100' : 'border-opacity-50'}
                  transform-gpu
                `}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Animated inner glow */}
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
                  animate={{
                    opacity: isSelected ? 0.8 : 0.4,
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        `radial-gradient(ellipse at 30% 20%, ${style.accent} 0%, transparent 50%)`,
                        `radial-gradient(ellipse at 70% 80%, ${style.accent} 0%, transparent 50%)`,
                        `radial-gradient(ellipse at 30% 20%, ${style.accent} 0%, transparent 50%)`,
                      ],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* Card content */}
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    {/* Type badge with pulse */}
                    <motion.div className="relative">
                        <Badge variant={language.color} className="text-xs px-4 py-2 font-bold backdrop-blur-sm bg-black/20">
                          {language.type}
                        </Badge>
                    </motion.div>

                    <div>
                      <motion.h3
                        className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}
                        animate={{ x: isSelected ? 4 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {language.name}
                      </motion.h3>
                      <motion.p
                        className={`text-xs md:text-sm mt-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                        animate={{ opacity: isSelected ? 1 : 0.8 }}
                      >
                        {language.machine}
                      </motion.p>
                    </div>
                  </div>

                  {/* Animated arrow indicator */}
                  <motion.div
                    animate={{
                      rotate: isSelected ? 180 : 0,
                      scale: isSelected ? 1.3 : 1,
                      backgroundColor: isSelected
                        ? (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)')
                        : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center
                      border ${style.border}
                    `}
                  >
                    <svg
                      className={`w-5 h-5 ${style.text}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-1/2 h-1 rounded-full"
                  style={{ backgroundColor: style.line }}
                  initial={{ width: 0, x: '-50%' }}
                  animate={{
                    width: isSelected ? '40%' : '0%',
                    x: '-50%',
                    opacity: isSelected ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </motion.div>

              {/* Connecting node between cards */}
              {index < reversedData.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.15, type: "spring" }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
                >
                  <motion.div
                    animate={{
                      y: [0, 6, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className={`
                      w-10 h-10 rounded-2xl flex items-center justify-center
                      ${isDark ? 'bg-white/5' : 'bg-black/5'}
                      backdrop-blur-xl border border-white/10
                      shadow-lg
                    `}
                  >
                    <motion.svg
                      className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ y: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subset notation with animated symbols */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        className={`mt-16 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
      >
        <div className="flex items-center justify-center gap-3 text-sm font-medium tracking-wide">
          {['Regular', '⊂', 'Context-Free', '⊂', 'Context-Sensitive', '⊂', 'RE'].map((text, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              className={text === '⊂' ? `${isDark ? 'text-gray-500' : 'text-gray-400'} text-lg` : ''}
            >
              {text === '⊂' ? (
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {text}
                </motion.span>
              ) : text}
            </motion.span>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.2 }}
          className="mt-3 text-xs"
        >
          Each inner class is a proper subset of the outer class
        </motion.p>
      </motion.div>
    </div>
    </TooltipProvider>
  );
}
