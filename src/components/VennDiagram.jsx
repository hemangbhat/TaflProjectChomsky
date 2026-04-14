import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const languageLevels = [
  {
    id: 'recursively-enumerable',
    label: 'Recursively Enumerable',
    shortLabel: 'RE (Type 0)',
    color: '#ef4444',
    colorLight: 'rgba(239,68,68,0.12)',
    colorMid: 'rgba(239,68,68,0.25)',
    borderColor: 'rgba(239,68,68,0.5)',
    machine: 'Turing Machine',
  },
  {
    id: 'context-sensitive',
    label: 'Context-Sensitive',
    shortLabel: 'CS (Type 1)',
    color: '#f97316',
    colorLight: 'rgba(249,115,22,0.14)',
    colorMid: 'rgba(249,115,22,0.28)',
    borderColor: 'rgba(249,115,22,0.5)',
    machine: 'Linear Bounded Automaton',
  },
  {
    id: 'context-free',
    label: 'Context-Free',
    shortLabel: 'CF (Type 2)',
    color: '#3b82f6',
    colorLight: 'rgba(59,130,246,0.14)',
    colorMid: 'rgba(59,130,246,0.28)',
    borderColor: 'rgba(59,130,246,0.5)',
    machine: 'Pushdown Automaton',
  },
  {
    id: 'regular',
    label: 'Regular',
    shortLabel: 'REG (Type 3)',
    color: '#22c55e',
    colorLight: 'rgba(34,197,94,0.18)',
    colorMid: 'rgba(34,197,94,0.35)',
    borderColor: 'rgba(34,197,94,0.5)',
    machine: 'Finite Automaton',
  },
];

export default function VennDiagram({ onSelect, selectedId, isDark }) {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  // Ellipse dimensions — outermost is largest, innermost smallest
  const ellipses = [
    { rx: 280, ry: 200 },  // RE
    { rx: 220, ry: 155 },  // CS
    { rx: 160, ry: 112 },  // CF
    { rx: 100, ry: 72 },   // Regular
  ];

  const centerX = 320;
  const centerY = 220;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full"
    >
      <div className={cn(
        "relative rounded-3xl overflow-hidden p-8",
        "backdrop-blur-2xl border-2",
        isDark ? "bg-white/[0.02] border-white/[0.08]" : "bg-white/90 border-gray-200/50"
      )}>
        {/* Section intro */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={cn("text-center text-sm mb-6", isDark ? "text-gray-400" : "text-gray-600")}
        >
          Each inner class is a <span className="font-semibold">proper subset</span> of the outer class — click any ring to explore
        </motion.p>

        {/* SVG Diagram */}
        <div className="flex justify-center">
          <svg
            viewBox="0 0 640 440"
            className="w-full max-w-2xl"
            style={{ overflow: 'visible' }}
          >
            <defs>
              {languageLevels.map((level, i) => (
                <radialGradient key={`grad-${level.id}`} id={`vennGrad-${level.id}`}>
                  <stop offset="0%" stopColor={level.colorMid} />
                  <stop offset="70%" stopColor={level.colorLight} />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              ))}
              <filter id="vennGlow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Render ellipses from outermost to innermost */}
            {languageLevels.map((level, i) => {
              const ellipse = ellipses[i];
              const isHovered = hoveredLevel === level.id;
              const isSelected = selectedId === level.id;
              const isActive = isHovered || isSelected;

              return (
                <g key={level.id}>
                  {/* Pulsing glow ring behind active ellipse */}
                  {isActive && (
                    <motion.ellipse
                      cx={centerX}
                      cy={centerY}
                      rx={ellipse.rx + 4}
                      ry={ellipse.ry + 4}
                      fill="none"
                      stroke={level.color}
                      strokeWidth="2"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        strokeWidth: [2, 4, 2],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      filter="url(#vennGlow)"
                    />
                  )}

                  {/* Main ellipse */}
                  <motion.ellipse
                    cx={centerX}
                    cy={centerY}
                    rx={ellipse.rx}
                    ry={ellipse.ry}
                    fill={`url(#vennGrad-${level.id})`}
                    stroke={isActive ? level.color : level.borderColor}
                    strokeWidth={isActive ? 3 : 1.5}
                    strokeDasharray={isActive ? "none" : "none"}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredLevel(level.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    onClick={() => onSelect(level.id)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      delay: 0.2 + i * 0.15,
                      type: "spring",
                      stiffness: 80,
                      damping: 15,
                    }}
                    whileHover={{
                      strokeWidth: 3,
                      filter: `drop-shadow(0 0 12px ${level.color})`,
                    }}
                  />

                  {/* Label positioned at the top of each ellipse */}
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredLevel(level.id)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    onClick={() => onSelect(level.id)}
                  >
                    {/* Label at top arc of each ellipse */}
                    <text
                      x={centerX}
                      y={centerY - ellipse.ry + (i === 0 ? 22 : 18)}
                      textAnchor="middle"
                      fill={isActive ? level.color : (isDark ? '#9ca3af' : '#6b7280')}
                      fontSize={i === 0 ? 14 : 13}
                      fontWeight={isActive ? 700 : 500}
                      fontFamily="Inter, system-ui, sans-serif"
                      className="select-none transition-all pointer-events-none"
                    >
                      {level.label}
                    </text>
                    <text
                      x={centerX}
                      y={centerY - ellipse.ry + (i === 0 ? 38 : 34)}
                      textAnchor="middle"
                      fill={isDark ? '#6b7280' : '#9ca3af'}
                      fontSize={10}
                      fontFamily="Inter, system-ui, sans-serif"
                      className="select-none pointer-events-none"
                    >
                      {level.shortLabel} — {level.machine}
                    </text>
                  </motion.g>
                </g>
              );
            })}

            {/* Center label */}
            <motion.text
              x={centerX}
              y={centerY + 5}
              textAnchor="middle"
              fill={isDark ? '#d1d5db' : '#374151'}
              fontSize={13}
              fontWeight={600}
              fontFamily="Inter, system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="select-none"
            >
              Finite
            </motion.text>
            <motion.text
              x={centerX}
              y={centerY + 22}
              textAnchor="middle"
              fill={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={11}
              fontFamily="Inter, system-ui, sans-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="select-none"
            >
              Languages
            </motion.text>

            {/* Animated particles flowing between rings */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`particle-${i}`}
                cx={centerX}
                r={3}
                fill={languageLevels[i].color}
                opacity={0.6}
                animate={{
                  cy: [
                    centerY - ellipses[3].ry,
                    centerY - ellipses[0].ry - 10,
                  ],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 1,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </svg>
        </div>

        {/* Subset notation below */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className={cn("text-center mt-6 text-sm font-medium tracking-wide", isDark ? "text-gray-400" : "text-gray-600")}
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {['Regular', '⊂', 'Context-Free', '⊂', 'Context-Sensitive', '⊂', 'RE'].map((text, i) => (
              <motion.span
                key={i}
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
        </motion.div>

        {/* Hover tooltip card */}
        {hoveredLevel && !selectedId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl",
              "backdrop-blur-xl border shadow-xl",
              isDark ? "bg-white/10 border-white/20" : "bg-white border-gray-200"
            )}
          >
            <p className={cn("text-sm font-medium", isDark ? "text-white" : "text-gray-900")}>
              Click to view details about{' '}
              <span style={{ color: languageLevels.find(l => l.id === hoveredLevel)?.color }}>
                {languageLevels.find(l => l.id === hoveredLevel)?.label}
              </span>
              {' '}Languages
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
