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

                  {/* Machine visualization */}
                  <div className={cn(
                    "p-6 rounded-2xl border relative overflow-hidden",
                    isDark ? "bg-black/30 border-white/10" : "bg-gray-50 border-gray-200"
                  )}>
                    <div className="flex items-center justify-center gap-4">
                      {/* States representation */}
                      {[1, 2, 3].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                          className="flex flex-col items-center gap-2"
                        >
                          <motion.div
                            animate={{
                              boxShadow: i === 1 ? [
                                `0 0 0 0 transparent`,
                                `0 0 20px 5px ${style.glow.replace('0 0 80px ', '')}`,
                                `0 0 0 0 transparent`,
                              ] : 'none',
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                            className={cn(
                              "w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm border-2",
                              i === 1 ? cn(style.border, style.text) : isDark ? "border-white/20 text-gray-400" : "border-gray-300 text-gray-500"
                            )}
                          >
                            q{i}
                          </motion.div>
                          <span className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                            {i === 0 ? 'Start' : i === 2 ? 'Accept' : 'State'}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Animated transitions */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ top: '30%' }}>
                      <motion.path
                        d="M 80 30 Q 120 0 160 30"
                        fill="none"
                        stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <motion.path
                        d="M 180 30 Q 220 0 260 30"
                        fill="none"
                        stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      />
                    </svg>
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
