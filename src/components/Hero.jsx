import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, ChevronDown, Layers, Cpu, Binary, Braces, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Hero({ isDark, isLoaded }) {
  const heroRef = useRef(null);
  const buttonRef = useRef(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  // Magnetic button effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400 };
  const buttonX = useSpring(mouseX, springConfig);
  const buttonY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.15;
    const distanceY = (e.clientY - centerY) * 0.15;
    mouseX.set(distanceX);
    mouseY.set(distanceY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsButtonHovered(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const floatingIcons = [
    { Icon: Layers, color: '#22c55e', delay: 0, position: 'left-[10%] top-[20%]' },
    { Icon: Cpu, color: '#3b82f6', delay: 0.2, position: 'right-[15%] top-[25%]' },
    { Icon: Binary, color: '#f97316', delay: 0.4, position: 'left-[20%] bottom-[30%]' },
    { Icon: Braces, color: '#ef4444', delay: 0.6, position: 'right-[10%] bottom-[25%]' },
  ];

  const glowingDots = [
    { color: '#22c55e', label: 'Regular', delay: 0 },
    { color: '#3b82f6', label: 'Context-Free', delay: 0.1 },
    { color: '#f97316', label: 'Context-Sensitive', delay: 0.2 },
    { color: '#ef4444', label: 'Recursively Enumerable', delay: 0.3 },
  ];

  // Animated gradient orbs for background depth
  const orbs = [
    { color: '#22c55e', size: 400, x: '20%', y: '30%', delay: 0 },
    { color: '#3b82f6', size: 350, x: '70%', y: '20%', delay: 0.5 },
    { color: '#f97316', size: 300, x: '80%', y: '70%', delay: 1 },
    { color: '#a855f7', size: 450, x: '30%', y: '80%', delay: 1.5 },
  ];

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isDark ? 0.15 : 0.1, scale: 1 }}
            transition={{ duration: 2, delay: orb.delay }}
            className="absolute rounded-full blur-[100px]"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle, ${orb.color}60 0%, transparent 70%)`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              animate={{
                x: [0, 30, 0, -30, 0],
                y: [0, -30, 0, 30, 0],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, color, delay, position }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 1 + delay, type: "spring" }}
          className={`absolute ${position} hidden lg:block`}
        >
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={cn(
              "p-4 rounded-2xl backdrop-blur-xl border",
              isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200/50"
            )}
            style={{
              boxShadow: `0 0 30px ${color}30`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color }} />
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Badge with enhanced animation */}
        <motion.div variants={itemVariants} className="mb-10">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className={cn(
              "inline-flex items-center gap-3 px-6 py-3 rounded-full",
              "backdrop-blur-2xl border relative overflow-hidden",
              isDark ? "bg-white/[0.03] border-white/[0.08]" : "bg-black/[0.02] border-black/[0.08]"
            )}
          >
            {/* Shimmer effect on badge */}
            <motion.div
              className="absolute inset-0 -translate-x-full"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              style={{
                background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}, transparent)`,
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className={cn("w-4 h-4", isDark ? "text-violet-400" : "text-violet-600")} />
            </motion.div>
            <span className={cn("text-sm font-medium tracking-wide relative", isDark ? "text-gray-300" : "text-gray-600")}>
              Theory of Computation
            </span>
          </motion.div>
        </motion.div>

        {/* Main Title with enhanced typography and hover effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className={cn("text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9]", isDark ? "text-white" : "text-gray-900")}>
            {'Chomsky'.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.1, 
                  color: ['#22c55e', '#3b82f6', '#f97316', '#ef4444'][i % 4],
                  transition: { duration: 0.2 }
                }}
                transition={{
                  delay: 0.4 + i * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="inline-block cursor-default"
              >
                {letter}
              </motion.span>
            ))}
            <br className="sm:hidden" />
            <span className="sm:inline hidden"> </span>
            {'Hierarchy'.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.1, 
                  color: ['#22c55e', '#3b82f6', '#f97316', '#ef4444'][(i + 3) % 4],
                  transition: { duration: 0.2 }
                }}
                transition={{
                  delay: 0.6 + i * 0.05,
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }}
                className="inline-block cursor-default"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Enhanced gradient subtitle with wave animation */}
        <motion.div variants={itemVariants} className="mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold relative inline-block"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 via-orange-400 to-red-500 animate-gradient bg-[length:300%_auto]">
              Visualization Tool
            </span>
            {/* Underline accent */}
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-green-400 via-blue-500 via-orange-400 to-red-500"
            />
          </motion.h2>
        </motion.div>

        {/* Enhanced description with subtle word highlight */}
        <motion.p
          variants={itemVariants}
          className={cn("text-lg sm:text-xl max-w-2xl mx-auto mb-14 leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}
        >
          Explore the classification of{' '}
          <span className={cn("font-semibold", isDark ? "text-gray-200" : "text-gray-800")}>formal languages</span>
          {' '}through interactive visualizations and{' '}
          <span className={cn("font-semibold", isDark ? "text-gray-200" : "text-gray-800")}>elegant animations</span>.
        </motion.p>

        {/* Glowing language symbols with enhanced interaction */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
              "inline-flex items-center gap-8 px-10 py-6 rounded-3xl",
              "backdrop-blur-2xl border relative overflow-hidden",
              isDark ? "bg-white/[0.02] border-white/[0.08]" : "bg-white/80 border-gray-200/50"
            )}
          >
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(90deg, #22c55e, #3b82f6, #f97316, #ef4444, #22c55e)',
                backgroundSize: '200% 100%',
                padding: 1,
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="flex items-center gap-4 relative">
              {glowingDots.map((dot, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.4 + dot.delay, type: "spring", stiffness: 200 }}
                  className="relative group cursor-pointer"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        `0 0 20px ${dot.color}40`,
                        `0 0 40px ${dot.color}60`,
                        `0 0 20px ${dot.color}40`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.5, y: -6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="relative w-5 h-5 rounded-full"
                    style={{ backgroundColor: dot.color }}
                  />
                  {/* Enhanced tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    whileHover={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "absolute -bottom-10 left-1/2 -translate-x-1/2",
                      "px-2 py-1 rounded-md text-xs whitespace-nowrap",
                      "opacity-0 group-hover:opacity-100 transition-all pointer-events-none",
                      isDark ? "bg-white/10 text-gray-300 backdrop-blur-sm" : "bg-black/5 text-gray-600"
                    )}
                  >
                    {dot.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
            <div className={cn("h-8 w-px relative", isDark ? "bg-white/10" : "bg-gray-300")} />
            <span className={cn("text-sm font-medium font-mono relative", isDark ? "text-gray-300" : "text-gray-600")}>
              Regular ⊂ CF ⊂ CS ⊂ RE
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced CTA Button with magnetic effect */}
        <motion.div variants={itemVariants} className="mb-16">
          <motion.a
            href="#hierarchy"
            ref={buttonRef}
            style={{ x: buttonX, y: buttonY }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <motion.div
              className={cn(
                "relative px-10 py-5 rounded-2xl font-semibold text-lg",
                "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600",
                "text-white shadow-2xl cursor-pointer overflow-hidden",
                "flex items-center gap-3"
              )}
              animate={{
                boxShadow: isButtonHovered 
                  ? '0 20px 60px -10px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)'
                  : '0 10px 40px -10px rgba(139, 92, 246, 0.3)',
              }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{ 
                  opacity: isButtonHovered ? 1 : 0,
                  x: isButtonHovered ? ['100%', '-100%'] : '-100%'
                }}
                transition={{ 
                  x: { duration: 0.6, ease: "easeOut" },
                  opacity: { duration: 0.2 }
                }}
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                }}
              />
              
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-[length:200%_100%]"
                animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <span className="relative flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Explore the Hierarchy
                <motion.span
                  animate={{ x: isButtonHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.a
            href="#hierarchy"
            className={cn(
              "inline-flex flex-col items-center gap-3 cursor-pointer group",
              isDark ? "text-gray-500" : "text-gray-400"
            )}
          >
            <motion.span 
              className={cn(
                "text-xs font-medium uppercase tracking-[0.2em] transition-colors",
                isDark ? "group-hover:text-white" : "group-hover:text-gray-900"
              )}
            >
              Scroll to explore
            </motion.span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center",
                "border-2 transition-all duration-300",
                isDark 
                  ? "border-white/10 group-hover:border-white/40 group-hover:bg-white/5" 
                  : "border-gray-300 group-hover:border-gray-500 group-hover:bg-black/5"
              )}
            >
              <ChevronDown className={cn(
                "w-5 h-5 transition-transform duration-300",
                "group-hover:translate-y-0.5"
              )} />
            </motion.div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Decorative elements - enhanced rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[800, 1000, 1200].map((size, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.05, 0.1, 0.05],
              scale: 1,
              rotate: 360 
            }}
            transition={{ 
              opacity: { duration: 4, repeat: Infinity, delay: i * 0.5 },
              scale: { duration: 2, delay: 0.5 + i * 0.2 },
              rotate: { duration: 60 + i * 20, repeat: Infinity, ease: "linear" }
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: size,
              height: size,
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              borderWidth: i === 0 ? 2 : 1,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}
