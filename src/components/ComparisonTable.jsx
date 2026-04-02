import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Info, ChevronRight, Sparkles } from 'lucide-react';

export default function ComparisonTable({ data, isDark }) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const colorStyles = {
    green: {
      text: isDark ? 'text-green-400' : 'text-green-600',
      bg: isDark ? 'bg-green-500/10' : 'bg-green-50',
      border: 'border-green-500/30',
      glow: 'rgba(34,197,94,0.3)',
      dot: '#22c55e',
      badgeVariant: 'green',
    },
    blue: {
      text: isDark ? 'text-blue-400' : 'text-blue-600',
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      border: 'border-blue-500/30',
      glow: 'rgba(59,130,246,0.3)',
      dot: '#3b82f6',
      badgeVariant: 'blue',
    },
    orange: {
      text: isDark ? 'text-orange-400' : 'text-orange-600',
      bg: isDark ? 'bg-orange-500/10' : 'bg-orange-50',
      border: 'border-orange-500/30',
      glow: 'rgba(249,115,22,0.3)',
      dot: '#f97316',
      badgeVariant: 'orange',
    },
    red: {
      text: isDark ? 'text-red-400' : 'text-red-600',
      bg: isDark ? 'bg-red-500/10' : 'bg-red-50',
      border: 'border-red-500/30',
      glow: 'rgba(239,68,68,0.3)',
      dot: '#ef4444',
      badgeVariant: 'red',
    },
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full"
      >
        <div className={cn(
          "relative rounded-3xl overflow-hidden",
          "backdrop-blur-2xl border-2",
          isDark ? "bg-white/[0.02] border-white/[0.08]" : "bg-white/90 border-gray-200/50"
        )}>
          {/* Animated background glow on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: hoveredRow !== null
                ? `radial-gradient(ellipse 80% 50% at 50% ${25 + hoveredRow * 18}%, ${colorStyles[data[hoveredRow]?.color]?.glow || 'transparent'} 0%, transparent 60%)`
                : 'transparent'
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow className={cn(
                  isDark ? "bg-white/[0.03]" : "bg-gray-50/80",
                  "border-b",
                  isDark ? "border-white/[0.05]" : "border-gray-200/50"
                )}>
                  {['Language Type', 'Grammar', 'Machine', 'Power', 'Example'].map((header, i) => (
                    <TableHead key={header} className={cn(isDark ? "text-gray-400" : "text-gray-500")}>
                      <motion.span
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 100 }}
                        className="text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                      >
                        {header}
                        {header === 'Power' && (
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-3.5 h-3.5 opacity-50 hover:opacity-100 transition-opacity" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Computational power increases from Regular to Recursively Enumerable</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </motion.span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((language, index) => {
                  const style = colorStyles[language.color];
                  const isHovered = hoveredRow === index;

                  return (
                    <React.Fragment key={language.id}>
                      <motion.tr
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.15 + index * 0.08,
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                        }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onClick={() => setSelectedRow(selectedRow === index ? null : index)}
                        className={cn(
                          "relative transition-all duration-300 cursor-pointer",
                          "border-b group",
                          isDark ? "border-white/[0.03]" : "border-gray-100",
                          isHovered && (isDark ? "bg-white/[0.05]" : "bg-gray-50/80"),
                          selectedRow === index && (isDark ? "bg-white/[0.08]" : "bg-gray-100/80")
                        )}
                      >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-4">
                          {/* Glowing dot indicator */}
                          <motion.div
                            animate={{
                              scale: isHovered ? 1.3 : 1,
                              boxShadow: isHovered
                                ? `0 0 20px ${style.dot}, 0 0 40px ${style.dot}40`
                                : `0 0 0 transparent`,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: style.dot }}
                          />
                          <div className="flex items-center gap-3">
                            <motion.span
                              animate={{ x: isHovered ? 4 : 0 }}
                              className={cn("font-bold", style.text)}
                            >
                              {language.shortName}
                            </motion.span>
                            <Badge variant={style.badgeVariant} className="text-[10px]">
                              {language.type}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            <motion.span
                              animate={{ x: isHovered ? 6 : 0, opacity: isHovered ? 1 : 0.8 }}
                              className={cn("text-sm", isDark ? "text-gray-300" : "text-gray-700")}
                            >
                              {language.grammar}
                            </motion.span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom" className="max-w-xs">
                            <p className="font-mono text-xs">{language.grammarRules}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>

                      <TableCell>
                        <motion.span
                          animate={{
                            scale: isHovered ? 1.02 : 1,
                            x: isHovered ? 4 : 0,
                          }}
                          className={cn("text-sm font-semibold", style.text)}
                        >
                          {language.machine}
                        </motion.span>
                      </TableCell>

                      <TableCell>
                        <motion.div
                          animate={{ opacity: isHovered ? 1 : 0.7 }}
                          className="flex items-center gap-2"
                        >
                          <div className="flex gap-0.5">
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  backgroundColor: i <= index
                                    ? style.dot
                                    : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                  scale: isHovered && i <= index ? [1, 1.2, 1] : 1,
                                }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="w-2 h-2 rounded-full"
                              />
                            ))}
                          </div>
                          <span className={cn("text-sm ml-2", isDark ? "text-gray-400" : "text-gray-600")}>
                            {language.power}
                          </span>
                        </motion.div>
                      </TableCell>

                      <TableCell>
                        <motion.div
                          animate={{
                            x: isHovered ? 8 : 0,
                          }}
                          className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm",
                            isDark ? "bg-white/5 text-gray-300" : "bg-gray-50 text-gray-700",
                            isHovered && (isDark ? "bg-white/10" : "bg-gray-100")
                          )}
                        >
                          {language.examples[0]}
                          <motion.span
                            animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0 }}
                            className={style.text}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.span>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                    
                    {/* Expanded row details */}
                    <AnimatePresence>
                      {selectedRow === index && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className={cn(
                            isDark ? "bg-white/[0.02]" : "bg-gray-50/50"
                          )}
                        >
                          <TableCell colSpan={5} className="p-0">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="p-6"
                            >
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "p-3 rounded-xl",
                                  style.bg,
                                  "border",
                                  style.border
                                )}>
                                  <Sparkles className={cn("w-5 h-5", style.text)} />
                                </div>
                                <div className="flex-1">
                                  <h4 className={cn("font-semibold mb-2", isDark ? "text-white" : "text-gray-900")}>
                                    {language.name}
                                  </h4>
                                  <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}>
                                    Recognized by {language.machine}. Grammar form: {language.grammarRules}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mt-3">
                                    {language.examples.slice(0, 3).map((ex, i) => (
                                      <Badge key={i} variant="secondary" className="text-xs">
                                        {ex}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Bottom gradient fade */}
          <div className={cn(
            "absolute bottom-0 left-0 right-0 h-8 pointer-events-none",
            "bg-gradient-to-t",
            isDark ? "from-black/20" : "from-white/50",
            "to-transparent"
          )} />
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
