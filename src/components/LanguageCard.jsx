import { motion } from 'framer-motion';
import { Circle, Square, Pentagon, Hexagon } from 'lucide-react';

const iconMap = {
  Circle,
  Square,
  Pentagon,
  Hexagon,
};

export default function LanguageCard({ language, isSelected, onClick, index, isDark }) {
  const Icon = iconMap[language.icon];

  const colorStyles = {
    green: {
      bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
      border: 'border-green-500/50',
      hover: 'hover:border-green-400',
      text: isDark ? 'text-green-400' : 'text-green-600',
      glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]',
      selectedGlow: 'shadow-[0_0_40px_rgba(34,197,94,0.4)]',
    },
    blue: {
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      border: 'border-blue-500/50',
      hover: 'hover:border-blue-400',
      text: isDark ? 'text-blue-400' : 'text-blue-600',
      glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      selectedGlow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
    },
    orange: {
      bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
      border: 'border-orange-500/50',
      hover: 'hover:border-orange-400',
      text: isDark ? 'text-orange-400' : 'text-orange-600',
      glow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]',
      selectedGlow: 'shadow-[0_0_40px_rgba(249,115,22,0.4)]',
    },
    red: {
      bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
      border: 'border-red-500/50',
      hover: 'hover:border-red-400',
      text: isDark ? 'text-red-400' : 'text-red-600',
      glow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]',
      selectedGlow: 'shadow-[0_0_40px_rgba(239,68,68,0.4)]',
    },
  };

  const style = colorStyles[language.color];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300
        ${style.bg} ${style.border} ${style.hover} ${style.glow}
        ${isSelected ? `${style.selectedGlow} border-opacity-100` : ''}
        ${isDark ? 'glass' : 'glass-light'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${style.bg} ${style.border} border`}>
          <Icon className={`w-6 h-6 ${style.text}`} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {language.shortName}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${style.bg} ${style.text} font-medium`}>
              {language.type}
            </span>
          </div>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {language.machine}
          </p>
        </div>
        <motion.div
          animate={{ rotate: isSelected ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${style.text}`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {language.description.substring(0, 150)}...
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
