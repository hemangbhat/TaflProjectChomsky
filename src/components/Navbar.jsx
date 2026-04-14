import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Sun, Moon, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar({ isDark, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const { scrollY } = useScroll();
  const navBackdrop = useTransform(scrollY, [0, 100], [10, 20]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = ['hierarchy', 'venn', 'comparison', 'quiz'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hierarchy', href: '#hierarchy', id: 'hierarchy' },
    { name: 'Venn', href: '#venn', id: 'venn' },
    { name: 'Comparison', href: '#comparison', id: 'comparison' },
    { name: 'Quiz', href: '#quiz', id: 'quiz' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className={cn(
        "fixed top-4 left-4 right-4 z-50 px-6 py-4 rounded-2xl",
        "backdrop-blur-2xl border transition-all duration-300",
        isDark 
          ? cn("border-white/10", isScrolled ? "bg-black/60 shadow-2xl shadow-black/20" : "bg-black/40")
          : cn("border-gray-200", isScrolled ? "bg-white/80 shadow-xl shadow-black/5" : "bg-white/60")
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 group"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(34,197,94,0.4)',
                '0 0 20px rgba(59,130,246,0.4)',
                '0 0 20px rgba(239,68,68,0.4)',
                '0 0 20px rgba(34,197,94,0.4)',
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-green-500 via-blue-500 to-red-500"
          >
            <span className="relative text-white font-bold text-sm">CH</span>
          </motion.div>
          <div className="hidden sm:block">
            <span className={cn("font-bold text-lg", isDark ? "text-white" : "text-gray-900")}>
              Chomsky
            </span>
            <span className={cn("font-light text-lg ml-1", isDark ? "text-gray-400" : "text-gray-600")}>
              Hierarchy
            </span>
          </div>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => {
            const isActive = activeSection === link.id;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={cn(
                  "relative px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  isDark 
                    ? cn("text-gray-400 hover:text-white", isActive && "text-white")
                    : cn("text-gray-600 hover:text-gray-900", isActive && "text-gray-900")
                )}
              >
                {(hoveredLink === link.name || isActive) && (
                  <motion.div
                    layoutId="navHover"
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      isDark 
                        ? cn("bg-white/10", isActive && "bg-gradient-to-r from-violet-500/20 to-purple-500/20")
                        : cn("bg-black/5", isActive && "bg-gradient-to-r from-violet-500/10 to-purple-500/10")
                    )}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  {isActive && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full bg-violet-500"
                    />
                  )}
                  {link.name}
                </span>
              </motion.a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
              "rounded-xl",
              isDark ? "hover:bg-white/10" : "hover:bg-black/5"
            )}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ y: 20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ y: 20, opacity: 0, rotate: 90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5 text-indigo-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden rounded-xl",
              isDark ? "hover:bg-white/10" : "hover:bg-black/5"
            )}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-900")} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className={cn("h-5 w-5", isDark ? "text-white" : "text-gray-900")} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className={cn("mt-4 pt-4 border-t", isDark ? "border-white/10" : "border-gray-200")}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-gray-900 hover:bg-black/5"
                    )}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
