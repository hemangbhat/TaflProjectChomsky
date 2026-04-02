import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function BackgroundEffects({ isDark }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const orbs = [
    {
      color: isDark ? 'rgba(34,197,94,0.4)' : 'rgba(34,197,94,0.2)',
      size: 'w-[500px] h-[500px]',
      position: '-top-48 -left-48',
      animation: { x: [0, 120, 60, 0], y: [0, 60, 120, 0] },
      duration: 25,
    },
    {
      color: isDark ? 'rgba(59,130,246,0.4)' : 'rgba(59,130,246,0.2)',
      size: 'w-[450px] h-[450px]',
      position: 'top-1/4 -right-32',
      animation: { x: [0, -100, -50, 0], y: [0, 100, 50, 0] },
      duration: 30,
    },
    {
      color: isDark ? 'rgba(249,115,22,0.35)' : 'rgba(249,115,22,0.15)',
      size: 'w-[400px] h-[400px]',
      position: 'bottom-1/3 left-1/4',
      animation: { x: [0, 80, 40, 0], y: [0, -80, -40, 0] },
      duration: 28,
    },
    {
      color: isDark ? 'rgba(239,68,68,0.35)' : 'rgba(239,68,68,0.15)',
      size: 'w-[350px] h-[350px]',
      position: '-bottom-32 right-1/4',
      animation: { x: [0, -60, -30, 0], y: [0, -60, -30, 0] },
      duration: 22,
    },
    {
      color: isDark ? 'rgba(168,85,247,0.3)' : 'rgba(168,85,247,0.12)',
      size: 'w-[300px] h-[300px]',
      position: 'top-1/2 left-1/2',
      animation: { x: [0, 50, -50, 0], y: [0, -50, 50, 0], scale: [1, 1.1, 0.9, 1] },
      duration: 20,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Layered gradient orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.size} ${orb.position} rounded-full`}
          animate={orb.animation}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
        />
      ))}

      {/* Cursor glow - larger and more visible */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 40%, transparent 70%)',
        }}
      />

      {/* Secondary cursor glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Animated grid with fade */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-white/20' : 'bg-black/10'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
            : 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
