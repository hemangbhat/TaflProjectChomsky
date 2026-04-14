import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, BookOpen, Code, Lightbulb, Sparkles, Zap, FileCode, Terminal, ChevronRight, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function DetailPanel({ language, onClose, isDark }) {
  const [activeTab, setActiveTab] = useState('grammar');
  
  if (!language) return null;

  const colorStyles = {
    green: {
      bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
      border: 'border-green-500/30',
      text: isDark ? 'text-green-400' : 'text-green-600',
      accent: 'bg-green-500',
      glow: '0 0 80px rgba(34,197,94,0.3)',
      gradient: 'from-green-500/10 via-transparent to-transparent',
      badgeVariant: 'green',
    },
    blue: {
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      border: 'border-blue-500/30',
      text: isDark ? 'text-blue-400' : 'text-blue-600',
      accent: 'bg-blue-500',
      glow: '0 0 80px rgba(59,130,246,0.3)',
      gradient: 'from-blue-500/10 via-transparent to-transparent',
      badgeVariant: 'blue',
    },
    orange: {
      bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
      border: 'border-orange-500/30',
      text: isDark ? 'text-orange-400' : 'text-orange-600',
      accent: 'bg-orange-500',
      glow: '0 0 80px rgba(249,115,22,0.3)',
      gradient: 'from-orange-500/10 via-transparent to-transparent',
      badgeVariant: 'orange',
    },
    red: {
      bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
      border: 'border-red-500/30',
      text: isDark ? 'text-red-400' : 'text-red-600',
      accent: 'bg-red-500',
      glow: '0 0 80px rgba(239,68,68,0.3)',
      gradient: 'from-red-500/10 via-transparent to-transparent',
      badgeVariant: 'red',
    },
  };

  const style = colorStyles[language.color];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 60, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1
      }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute -inset-4 rounded-[2rem] opacity-50 pointer-events-none"
        style={{ boxShadow: style.glow, filter: 'blur(40px)' }}
      />

      <div
        className={cn(
          "relative rounded-3xl p-8 md:p-10 border backdrop-blur-2xl overflow-hidden",
          style.bg, style.border
        )}
      >
        {/* Animated gradient background */}
        <motion.div
          className={cn("absolute inset-0 bg-gradient-to-br pointer-events-none", style.gradient)}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={cn("absolute w-1 h-1 rounded-full", style.accent)}
              style={{
                left: `${10 + i * 12}%`,
                top: `${5 + (i % 4) * 25}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={cn("text-sm px-4 py-1.5 rounded-full text-white font-bold shadow-lg", style.accent)}
                >
                  {language.type}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={cn("text-sm font-medium flex items-center gap-1", style.text)}
                >
                  <Sparkles className="w-4 h-4" />
                  {language.power}
                </motion.span>
              </div>
              <motion.h2
                className={cn("text-3xl md:text-4xl font-bold", isDark ? "text-white" : "text-gray-900")}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {language.name}
              </motion.h2>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={cn(
                "rounded-2xl h-12 w-12",
                isDark ? "hover:bg-white/10" : "hover:bg-black/10"
              )}
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <X className={cn("w-5 h-5", isDark ? "text-gray-400" : "text-gray-600")} />
              </motion.div>
            </Button>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className={cn("text-base md:text-lg mb-10 leading-relaxed", isDark ? "text-gray-300" : "text-gray-700")}
          >
            {language.description}
          </motion.p>

          {/* Tabs Section */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="grammar" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={cn(
                "w-full grid grid-cols-3 h-14 rounded-2xl p-1.5 relative",
                isDark ? "bg-white/5" : "bg-gray-100"
              )}>
                {/* Animated background indicator */}
                <motion.div
                  className="absolute h-[calc(100%-12px)] rounded-xl bg-gradient-to-r from-violet-500 to-purple-500"
                  layoutId="activeTab"
                  style={{
                    width: 'calc(33.333% - 4px)',
                    left: activeTab === 'grammar' ? '6px' : activeTab === 'machine' ? 'calc(33.333% + 2px)' : 'calc(66.666% - 2px)',
                    top: '6px',
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                
                <TabsTrigger
                  value="grammar"
                  className="relative z-10 rounded-xl data-[state=active]:bg-transparent data-[state=active]:text-white flex items-center gap-2 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Grammar</span>
                </TabsTrigger>
                <TabsTrigger
                  value="machine"
                  className="relative z-10 rounded-xl data-[state=active]:bg-transparent data-[state=active]:text-white flex items-center gap-2 transition-colors"
                >
                  <Cpu className="w-4 h-4" />
                  <span className="hidden sm:inline">Machine</span>
                </TabsTrigger>
                <TabsTrigger
                  value="examples"
                  className="relative z-10 rounded-xl data-[state=active]:bg-transparent data-[state=active]:text-white flex items-center gap-2 transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span className="hidden sm:inline">Examples</span>
                </TabsTrigger>
              </TabsList>

              {/* Grammar Tab */}
              <TabsContent value="grammar" className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="grammar"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={cn(
                      "p-6 rounded-2xl backdrop-blur-xl border",
                      isDark ? "bg-white/5" : "bg-white/80",
                      style.border
                    )}
                  >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className={cn("p-3 rounded-xl border", style.bg, style.border)}
                    >
                      <FileCode className={cn("w-6 h-6", style.text)} />
                    </motion.div>
                    <div>
                      <h3 className={cn("font-bold text-xl", isDark ? "text-white" : "text-gray-900")}>
                        {language.grammar}
                      </h3>
                      <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                        Production Rules Format
                      </p>
                    </div>
                  </div>

                  <div className={cn(
                    "relative p-5 rounded-2xl font-mono text-sm leading-relaxed overflow-x-auto",
                    isDark ? "bg-black/40" : "bg-gray-100"
                  )}>
                    <motion.div
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      animate={{
                        background: [
                          `linear-gradient(90deg, transparent 0%, ${style.glow.replace('0 0 80px ', '')}20 50%, transparent 100%)`,
                        ],
                        x: ['-100%', '100%'],
                      }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    />
                    <code className={cn("relative", isDark ? "text-gray-300" : "text-gray-700")}>
                      {language.grammarRules}
                    </code>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant={style.badgeVariant}>Formal Grammar</Badge>
                    <Badge variant="secondary">{language.type}</Badge>
                    <Badge variant="outline">Generative</Badge>
                  </div>
                </motion.div>
                </AnimatePresence>
              </TabsContent>

              {/* Machine Tab */}
              <TabsContent value="machine" className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="machine"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={cn(
                      "p-6 rounded-2xl backdrop-blur-xl border",
                      isDark ? "bg-white/5" : "bg-white/80",
                      style.border
                    )}
                  >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      whileHover={{ rotate: -10, scale: 1.1 }}
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(255,255,255,0)',
                          '0 0 30px 10px rgba(255,255,255,0.1)',
                          '0 0 0 0 rgba(255,255,255,0)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={cn("p-3 rounded-xl border", style.bg, style.border)}
                    >
                      <Terminal className={cn("w-6 h-6", style.text)} />
                    </motion.div>
                    <div>
                      <h3 className={cn("font-bold text-xl", isDark ? "text-white" : "text-gray-900")}>
                        {language.machine}
                      </h3>
                      <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                        Computational Model
                      </p>
                    </div>
                  </div>

                  <p className={cn("text-base leading-relaxed mb-6", isDark ? "text-gray-300" : "text-gray-700")}>
                    {language.machineDescription}
                  </p>

                  {/* Machine visualization - specific per automaton type */}
                  <div className={cn(
                    "p-6 rounded-2xl border relative overflow-hidden",
                    isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
                  )}>
                    {language.id === 'regular' && (
                      /* ── Finite Automaton: 4 states, labeled transitions, self-loop ── */
                      <div className="flex flex-col items-center gap-4">
                        <svg viewBox="0 0 480 160" className="w-full max-w-lg" style={{ overflow: 'visible' }}>
                          <defs>
                            <marker id="arrowFA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill={isDark ? '#9ca3af' : '#6b7280'} />
                            </marker>
                            <marker id="arrowFAColor" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                            </marker>
                          </defs>
                          {/* Start arrow */}
                          <motion.line x1="10" y1="80" x2="48" y2="80" stroke={isDark ? '#9ca3af' : '#6b7280'} strokeWidth="2" markerEnd="url(#arrowFA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
                          {/* States */}
                          {[
                            { x: 70, label: 'q₀', sub: 'Start' },
                            { x: 180, label: 'q₁', sub: '' },
                            { x: 290, label: 'q₂', sub: '' },
                            { x: 400, label: 'q₃', sub: 'Accept', accept: true },
                          ].map((s, i) => (
                            <g key={i}>
                              <motion.circle cx={s.x} cy={80} r={24} fill="none" stroke={s.accept ? '#22c55e' : (isDark ? '#6b7280' : '#9ca3af')} strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.12, type: 'spring' }} />
                              {s.accept && <motion.circle cx={s.x} cy={80} r={20} fill="none" stroke="#22c55e" strokeWidth={1.5} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />}
                              <text x={s.x} y={84} textAnchor="middle" fill={s.accept ? '#22c55e' : (isDark ? '#d1d5db' : '#374151')} fontSize={13} fontWeight={600} fontFamily="Inter, system-ui">{s.label}</text>
                              {s.sub && <text x={s.x} y={118} textAnchor="middle" fill={isDark ? '#6b7280' : '#9ca3af'} fontSize={10} fontFamily="Inter, system-ui">{s.sub}</text>}
                            </g>
                          ))}
                          {/* Transitions */}
                          {[
                            { x1: 94, x2: 156, label: 'a' },
                            { x1: 204, x2: 266, label: 'b' },
                            { x1: 314, x2: 376, label: 'c' },
                          ].map((t, i) => (
                            <g key={`t-${i}`}>
                              <motion.line x1={t.x1} y1={80} x2={t.x2} y2={80} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowFA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }} />
                              <text x={(t.x1 + t.x2) / 2} y={68} textAnchor="middle" fill="#22c55e" fontSize={12} fontWeight={700} fontFamily="monospace">{t.label}</text>
                            </g>
                          ))}
                          {/* Self-loop on q1 */}
                          <motion.path d="M 172 56 C 160 20 200 20 188 56" fill="none" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowFA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1, duration: 0.5 }} />
                          <text x={180} y={28} textAnchor="middle" fill="#22c55e" fontSize={11} fontWeight={700} fontFamily="monospace">a,b</text>
                          {/* Animated traversal dot */}
                          <motion.circle r={4} fill="#22c55e" animate={{ cx: [70, 180, 290, 400], cy: [80, 80, 80, 80], opacity: [1, 1, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }} />
                        </svg>
                        <p className={cn("text-xs text-center", isDark ? "text-gray-500" : "text-gray-400")}>Finite Automaton — transitions depend only on current state and input symbol</p>
                      </div>
                    )}

                    {language.id === 'context-free' && (
                      /* ── Pushdown Automaton: states + stack ── */
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-start gap-8 justify-center flex-wrap">
                          {/* State diagram */}
                          <svg viewBox="0 0 320 160" className="w-full max-w-xs" style={{ overflow: 'visible' }}>
                            <defs>
                              <marker id="arrowPDA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill={isDark ? '#9ca3af' : '#6b7280'} />
                              </marker>
                            </defs>
                            <motion.line x1="10" y1="80" x2="48" y2="80" stroke={isDark ? '#9ca3af' : '#6b7280'} strokeWidth="2" markerEnd="url(#arrowPDA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
                            {[
                              { x: 70, label: 'q₀', sub: 'Start' },
                              { x: 160, label: 'q₁', sub: 'Read/Push' },
                              { x: 250, label: 'q₂', sub: 'Accept', accept: true },
                            ].map((s, i) => (
                              <g key={i}>
                                <motion.circle cx={s.x} cy={80} r={24} fill="none" stroke={s.accept ? '#3b82f6' : (isDark ? '#6b7280' : '#9ca3af')} strokeWidth={2} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + i * 0.12, type: 'spring' }} />
                                {s.accept && <motion.circle cx={s.x} cy={80} r={20} fill="none" stroke="#3b82f6" strokeWidth={1.5} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />}
                                <text x={s.x} y={84} textAnchor="middle" fill={s.accept ? '#3b82f6' : (isDark ? '#d1d5db' : '#374151')} fontSize={13} fontWeight={600} fontFamily="Inter, system-ui">{s.label}</text>
                                <text x={s.x} y={118} textAnchor="middle" fill={isDark ? '#6b7280' : '#9ca3af'} fontSize={9} fontFamily="Inter, system-ui">{s.sub}</text>
                              </g>
                            ))}
                            <motion.line x1={94} y1={80} x2={136} y2={80} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowPDA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
                            <text x={115} y={70} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={700} fontFamily="monospace">a, ε→A</text>
                            <motion.line x1={184} y1={80} x2={226} y2={80} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowPDA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.65 }} />
                            <text x={205} y={70} textAnchor="middle" fill="#3b82f6" fontSize={11} fontWeight={700} fontFamily="monospace">b, A→ε</text>
                            {/* Self-loop */}
                            <motion.path d="M 152 56 C 140 20 180 20 168 56" fill="none" stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowPDA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
                            <text x={160} y={26} textAnchor="middle" fill="#3b82f6" fontSize={10} fontWeight={700} fontFamily="monospace">a, A→AA</text>
                          </svg>
                          {/* Stack visualization */}
                          <div className="flex flex-col items-center gap-2">
                            <span className={cn("text-xs font-semibold uppercase tracking-wider mb-1", isDark ? "text-gray-400" : "text-gray-500")}>Stack (LIFO)</span>
                            <div className={cn("w-20 border-2 rounded-lg overflow-hidden", isDark ? "border-blue-500/40" : "border-blue-300")}>
                              {['A', 'A', 'A', '$'].map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + i * 0.15 }}
                                  className={cn(
                                    "px-3 py-2 text-center text-sm font-mono font-bold border-b",
                                    isDark ? "border-white/10" : "border-gray-200",
                                    i === 0 ? (isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-700") : (isDark ? "bg-white/5 text-gray-400" : "bg-gray-50 text-gray-600")
                                  )}
                                >
                                  {item}
                                </motion.div>
                              ))}
                            </div>
                            <motion.span
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className={cn("text-[10px] mt-1", isDark ? "text-gray-500" : "text-gray-400")}
                            >
                              ↑ Top
                            </motion.span>
                          </div>
                        </div>
                        <p className={cn("text-xs text-center", isDark ? "text-gray-500" : "text-gray-400")}>Pushdown Automaton — FA augmented with an infinite stack for nested structures</p>
                      </div>
                    )}

                    {language.id === 'context-sensitive' && (
                      /* ── Linear Bounded Automaton: states + bounded tape ── */
                      <div className="flex flex-col items-center gap-4">
                        {/* Bounded tape */}
                        <div className="flex flex-col items-center gap-3">
                          <span className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Bounded Tape (input length)</span>
                          <div className="flex items-center gap-0">
                            {/* Left boundary */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("w-2 h-12 rounded-l-lg", isDark ? "bg-orange-500/40" : "bg-orange-300")} />
                            {['a', 'a', 'b', 'b', 'c', 'c'].map((cell, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.08 }}
                                className={cn(
                                  "w-12 h-12 flex items-center justify-center font-mono font-bold text-lg border",
                                  isDark ? "border-white/10" : "border-gray-300",
                                  i === 2 ? (isDark ? "bg-orange-500/20 text-orange-400 border-orange-500/50" : "bg-orange-100 text-orange-700 border-orange-400") : (isDark ? "bg-white/5 text-gray-300" : "bg-white text-gray-700")
                                )}
                              >
                                {cell}
                              </motion.div>
                            ))}
                            {/* Right boundary */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("w-2 h-12 rounded-r-lg", isDark ? "bg-orange-500/40" : "bg-orange-300")} />
                          </div>
                          {/* Read/write head */}
                          <motion.div
                            animate={{ x: [-60, -12, 36, -12, -60] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                          >
                            <div className={cn("w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent", isDark ? "border-b-orange-400" : "border-b-orange-500")} />
                            <span className={cn("text-[10px] font-bold mt-1", isDark ? "text-orange-400" : "text-orange-600")}>R/W Head</span>
                          </motion.div>
                        </div>
                        {/* State diagram mini */}
                        <svg viewBox="0 0 260 80" className="w-full max-w-xs" style={{ overflow: 'visible' }}>
                          <defs>
                            <marker id="arrowLBA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill={isDark ? '#9ca3af' : '#6b7280'} />
                            </marker>
                          </defs>
                          {[
                            { x: 40, label: 'q₀' },
                            { x: 130, label: 'q₁' },
                            { x: 220, label: 'q₂', accept: true },
                          ].map((s, i) => (
                            <g key={i}>
                              <motion.circle cx={s.x} cy={40} r={20} fill="none" stroke={s.accept ? '#f97316' : (isDark ? '#6b7280' : '#9ca3af')} strokeWidth={1.5} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.1, type: 'spring' }} />
                              {s.accept && <circle cx={s.x} cy={40} r={16} fill="none" stroke="#f97316" strokeWidth={1} />}
                              <text x={s.x} y={44} textAnchor="middle" fill={s.accept ? '#f97316' : (isDark ? '#d1d5db' : '#374151')} fontSize={12} fontWeight={600} fontFamily="Inter, system-ui">{s.label}</text>
                            </g>
                          ))}
                          <motion.line x1={60} y1={40} x2={110} y2={40} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowLBA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
                          <motion.line x1={150} y1={40} x2={200} y2={40} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowLBA)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
                        </svg>
                        <p className={cn("text-xs text-center", isDark ? "text-gray-500" : "text-gray-400")}>Linear Bounded Automaton — Turing Machine with tape restricted to input length</p>
                      </div>
                    )}

                    {language.id === 'recursively-enumerable' && (
                      /* ── Turing Machine: states + infinite tape + R/W head ── */
                      <div className="flex flex-col items-center gap-4">
                        {/* Infinite tape */}
                        <div className="flex flex-col items-center gap-3">
                          <span className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-gray-400" : "text-gray-500")}>Infinite Tape</span>
                          <div className="flex items-center gap-0">
                            <span className={cn("text-lg mx-1 font-mono", isDark ? "text-gray-600" : "text-gray-400")}>···</span>
                            {['B', '1', '0', '1', '1', '0', 'B', 'B'].map((cell, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.06 }}
                                className={cn(
                                  "w-10 h-12 flex items-center justify-center font-mono font-bold text-sm border",
                                  isDark ? "border-white/10" : "border-gray-300",
                                  i === 3 ? (isDark ? "bg-red-500/20 text-red-400 border-red-500/50" : "bg-red-100 text-red-700 border-red-400") :
                                  cell === 'B' ? (isDark ? "bg-white/[0.02] text-gray-600" : "bg-gray-100 text-gray-400") :
                                  (isDark ? "bg-white/5 text-gray-300" : "bg-white text-gray-700")
                                )}
                              >
                                {cell}
                              </motion.div>
                            ))}
                            <span className={cn("text-lg mx-1 font-mono", isDark ? "text-gray-600" : "text-gray-400")}>···</span>
                          </div>
                          {/* Read/write head */}
                          <motion.div
                            animate={{ x: [-40, 0, 40, 0, -40] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                          >
                            <div className={cn("w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent", isDark ? "border-b-red-400" : "border-b-red-500")} />
                            <span className={cn("text-[10px] font-bold mt-1", isDark ? "text-red-400" : "text-red-600")}>R/W Head</span>
                          </motion.div>
                        </div>
                        {/* State diagram */}
                        <svg viewBox="0 0 360 90" className="w-full max-w-sm" style={{ overflow: 'visible' }}>
                          <defs>
                            <marker id="arrowTM" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill={isDark ? '#9ca3af' : '#6b7280'} />
                            </marker>
                          </defs>
                          {[
                            { x: 40, label: 'q₀' },
                            { x: 120, label: 'q₁' },
                            { x: 200, label: 'q₂' },
                            { x: 280, label: 'qₐ', accept: true },
                            { x: 280, cy: 75, label: 'qᵣ', reject: true },
                          ].map((s, i) => (
                            <g key={i}>
                              <motion.circle cx={s.x} cy={s.cy || 35} r={18} fill="none" stroke={s.accept ? '#22c55e' : s.reject ? '#ef4444' : (isDark ? '#6b7280' : '#9ca3af')} strokeWidth={1.5} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.1, type: 'spring' }} />
                              {s.accept && <circle cx={s.x} cy={35} r={14} fill="none" stroke="#22c55e" strokeWidth={1} />}
                              <text x={s.x} y={(s.cy || 35) + 4} textAnchor="middle" fill={s.accept ? '#22c55e' : s.reject ? '#ef4444' : (isDark ? '#d1d5db' : '#374151')} fontSize={11} fontWeight={600} fontFamily="Inter, system-ui">{s.label}</text>
                            </g>
                          ))}
                          {/* Transitions */}
                          <motion.line x1={58} y1={35} x2={102} y2={35} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowTM)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.1 }} />
                          <text x={80} y={26} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={700} fontFamily="monospace">1→X,R</text>
                          <motion.line x1={138} y1={35} x2={182} y2={35} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowTM)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2 }} />
                          <text x={160} y={26} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={700} fontFamily="monospace">0→Y,R</text>
                          <motion.line x1={218} y1={35} x2={262} y2={35} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowTM)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />
                          <text x={240} y={26} textAnchor="middle" fill="#22c55e" fontSize={9} fontWeight={700} fontFamily="monospace">B→B,R</text>
                          {/* Reject branch */}
                          <motion.line x1={218} y1={50} x2={262} y2={70} stroke={isDark ? '#6b7280' : '#9ca3af'} strokeWidth={1.5} markerEnd="url(#arrowTM)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4 }} />
                        </svg>
                        <p className={cn("text-xs text-center", isDark ? "text-gray-500" : "text-gray-400")}>Turing Machine — infinite tape, read/write head, can simulate any algorithm</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge variant={style.badgeVariant}>Automaton</Badge>
                    <Badge variant="secondary">Recognizer</Badge>
                    <Badge variant="outline">{language.power}</Badge>
                  </div>
                </motion.div>
                </AnimatePresence>
              </TabsContent>

              {/* Examples Tab */}
              <TabsContent value="examples" className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key="examples"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={cn(
                      "p-6 rounded-2xl backdrop-blur-xl border",
                      isDark ? "bg-white/5" : "bg-white/80",
                      style.border
                    )}
                  >
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className={cn("p-3 rounded-xl border", style.bg, style.border)}
                    >
                      <Zap className={cn("w-6 h-6", style.text)} />
                    </motion.div>
                    <div>
                      <h3 className={cn("font-bold text-xl", isDark ? "text-white" : "text-gray-900")}>
                        Example Languages
                      </h3>
                      <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                        Real-world applications
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {language.examples.map((example, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        whileHover={{
                          x: 8,
                          backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
                        }}
                        className={cn(
                          "flex items-center gap-4 p-5 rounded-2xl cursor-default",
                          isDark ? "bg-white/5" : "bg-gray-50",
                          "border border-transparent hover:border-white/10",
                          "transition-all duration-300"
                        )}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            style.bg
                          )}
                        >
                          <Lightbulb className={cn("w-5 h-5", style.text)} />
                        </motion.div>
                        <div className="flex-1">
                          <span className={cn("text-base font-medium", isDark ? "text-gray-200" : "text-gray-700")}>
                            {example}
                          </span>
                        </div>
                        <Badge variant={style.badgeVariant} className="shrink-0">
                          #{index + 1}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
