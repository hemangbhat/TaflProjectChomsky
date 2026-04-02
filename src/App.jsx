import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, BookOpen, HelpCircle, Sparkles } from 'lucide-react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';
import Hero from './components/Hero';
import HierarchyDiagram from './components/HierarchyDiagram';
import DetailPanel from './components/DetailPanel';
import ComparisonTable from './components/ComparisonTable';
import Quiz from './components/Quiz';
import { chomskyData, quizQuestions } from './data/chomskyData';
import { cn } from '@/lib/utils';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('chomsky-theme');
    return saved ? saved === 'dark' : true;
  });
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const detailPanelRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chomsky-theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const handleSelectLanguage = (id) => {
    if (selectedLanguage === id) {
      setSelectedLanguage(null);
    } else {
      setSelectedLanguage(id);
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 150);
    }
  };

  const selectedData = chomskyData.find((l) => l.id === selectedLanguage);

  const glowingDots = [
    { color: '#22c55e', label: 'Regular', delay: 0 },
    { color: '#3b82f6', label: 'Context-Free', delay: 0.1 },
    { color: '#f97316', label: 'Context-Sensitive', delay: 0.2 },
    { color: '#ef4444', label: 'Recursively Enumerable', delay: 0.3 },
  ];

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className={cn(
          "relative min-h-screen overflow-x-hidden",
          isDark ? "text-white" : "text-gray-900"
        )}
        style={{
          background: isDark
            ? 'linear-gradient(180deg, #000000 0%, #0a0a0f 20%, #0f172a 40%, #1e1b4b 60%, #0f172a 80%, #000000 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 20%, #e0e7ff 50%, #f8fafc 80%, #ffffff 100%)'
        }}
      >
        <BackgroundEffects isDark={isDark} />
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />

        <main className="relative">
          {/* Hero Section */}
          <Hero isDark={isDark} isLoaded={isLoaded} />

          {/* Hierarchy Section */}
          <motion.section
            id="hierarchy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="relative py-32 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-5xl mx-auto">
              <SectionHeader icon={Layers} title="Language Hierarchy" color="blue" isDark={isDark} />

              <HierarchyDiagram
                data={chomskyData}
                selectedId={selectedLanguage}
                onSelect={handleSelectLanguage}
                isDark={isDark}
              />

              <AnimatePresence mode="wait">
                {selectedData && (
                  <motion.div
                    ref={detailPanelRef}
                    key={selectedData.id}
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="mt-16"
                  >
                    <DetailPanel
                      language={selectedData}
                      onClose={() => setSelectedLanguage(null)}
                      isDark={isDark}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Comparison Section */}
          <motion.section
            id="comparison"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="relative py-32 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-5xl mx-auto">
              <SectionHeader icon={BookOpen} title="Comparison Table" color="purple" isDark={isDark} />
              <ComparisonTable data={chomskyData} isDark={isDark} />
            </div>
          </motion.section>

          {/* Quiz Section */}
          <motion.section
            id="quiz"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="relative py-32 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-5xl mx-auto">
              <SectionHeader icon={HelpCircle} title="Test Your Knowledge" color="orange" isDark={isDark} />
              <Quiz questions={quizQuestions} isDark={isDark} />
            </div>
          </motion.section>

          {/* Footer */}
          <footer className={cn(
            "relative py-24 px-4 border-t overflow-hidden",
            isDark ? "border-white/5" : "border-gray-200"
          )}>
            {/* Subtle background gradient */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20"
                style={{
                  background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
            </div>
            
            <div className="max-w-5xl mx-auto text-center relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Animated hierarchy dots */}
                <div className="flex items-center justify-center gap-4">
                  {glowingDots.map((dot, i) => (
                    <motion.div
                      key={i}
                      className="relative group cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: dot.color }}
                        animate={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            `0 0 0 0 ${dot.color}40`,
                            `0 0 20px 5px ${dot.color}60`,
                            `0 0 0 0 ${dot.color}40`,
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                      {/* Tooltip */}
                      <span className={cn(
                        "absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap",
                        "opacity-0 group-hover:opacity-100 transition-opacity",
                        isDark ? "text-gray-500" : "text-gray-400"
                      )}>
                        {dot.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Brand badge */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={cn(
                    "inline-flex items-center gap-3 px-8 py-4 rounded-2xl",
                    "backdrop-blur-xl border cursor-default",
                    isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200"
                  )}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className={cn("w-5 h-5", isDark ? "text-violet-400" : "text-violet-600")} />
                  </motion.div>
                  <span className={cn("text-base font-semibold", isDark ? "text-white" : "text-gray-900")}>
                    Chomsky Hierarchy
                  </span>
                  <span className={cn("text-base font-light", isDark ? "text-gray-400" : "text-gray-600")}>
                    Visualization Tool
                  </span>
                </motion.div>

                {/* Credit line */}
                <motion.p
                  className={cn("text-sm", isDark ? "text-gray-500" : "text-gray-500")}
                >
                  Based on{' '}
                  <span className={cn("font-medium", isDark ? "text-gray-400" : "text-gray-600")}>
                    Noam Chomsky's
                  </span>
                  {' '}work on formal language theory (1956-1959)
                </motion.p>

                {/* Subtle divider */}
                <div className="flex items-center justify-center gap-4">
                  <div className={cn("h-px w-16", isDark ? "bg-white/10" : "bg-gray-200")} />
                  <div className={cn("w-1.5 h-1.5 rounded-full", isDark ? "bg-white/20" : "bg-gray-300")} />
                  <div className={cn("h-px w-16", isDark ? "bg-white/10" : "bg-gray-200")} />
                </div>

                {/* Copyright */}
                <p className={cn("text-xs", isDark ? "text-gray-600" : "text-gray-400")}>
                  Interactive learning tool for Theory of Computation
                </p>
              </motion.div>
            </div>
          </footer>
        </main>
      </motion.div>
    </TooltipProvider>
  );
}

function SectionHeader({ icon: Icon, title, color, isDark }) {
  const colors = {
    blue: {
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-100',
      text: isDark ? 'text-blue-400' : 'text-blue-600',
      glow: 'rgba(59,130,246,0.4)',
    },
    purple: {
      bg: isDark ? 'bg-purple-500/10' : 'bg-purple-100',
      text: isDark ? 'text-purple-400' : 'text-purple-600',
      glow: 'rgba(168,85,247,0.4)',
    },
    orange: {
      bg: isDark ? 'bg-orange-500/10' : 'bg-orange-100',
      text: isDark ? 'text-orange-400' : 'text-orange-600',
      glow: 'rgba(249,115,22,0.4)',
    },
  };

  const style = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex items-center gap-5 mb-12"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
        className={cn("relative p-4 rounded-2xl", style.bg)}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [`0 0 0 0 ${style.glow}`, `0 0 30px 5px transparent`],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Icon className={cn("relative w-7 h-7", style.text)} />
      </motion.div>
      <h2 className={cn(
        "text-3xl sm:text-4xl font-bold tracking-tight",
        isDark ? "text-white" : "text-gray-900"
      )}>
        {title}
      </h2>
    </motion.div>
  );
}

export default App;
