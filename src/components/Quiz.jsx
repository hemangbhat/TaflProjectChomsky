import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Sparkles, Zap, Award, Target, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function Quiz({ questions: allQuestions, isDark }) {
  const QUIZ_SIZE = 8;

  // Shuffle and pick subset of questions
  const shuffleAndPick = useCallback(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length));
  }, [allQuestions]);

  const [questions, setQuestions] = useState(() => shuffleAndPick());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [shake, setShake] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showStreakBonus, setShowStreakBonus] = useState(false);

  const question = questions[currentQuestion];
  const progressValue = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = useCallback((index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === question.correct;
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(score + 1);
      if (newStreak >= 3 && newStreak % 3 === 0) {
        setShowStreakBonus(true);
        setTimeout(() => setShowStreakBonus(false), 2000);
      }
    } else {
      setStreak(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setAnswers([...answers, { questionId: question.id, selected: index, correct: question.correct }]);
  }, [showResult, question, score, answers, streak]);

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  }, [currentQuestion, questions.length]);

  const handleRestart = useCallback(() => {
    setQuestions(shuffleAndPick());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
    setStreak(0);
  }, [shuffleAndPick]);

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const rating = percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Keep Practicing';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Card className={cn(
          "relative w-full max-w-2xl mx-auto overflow-hidden",
          "backdrop-blur-2xl border-2",
          isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200"
        )}>
          <CardContent className="p-10 text-center">
            {/* Confetti effect for high scores */}
            {percentage >= 80 && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={cn(
                      "absolute w-2 h-2 rounded-full",
                      ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'][i % 5]
                    )}
                    initial={{
                      x: '50%',
                      y: '50%',
                      scale: 0,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1.5, 0],
                      opacity: [0, 1, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: i * 0.08,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                  />
                ))}
              </div>
            )}

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className={cn(
                "relative w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center",
                percentage >= 80 ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20" :
                percentage >= 60 ? "bg-gradient-to-br from-yellow-500/20 to-amber-500/20" :
                "bg-gradient-to-br from-red-500/20 to-orange-500/20"
              )}
              style={{
                boxShadow: `0 0 80px ${
                  percentage >= 80 ? 'rgba(34,197,94,0.4)' :
                  percentage >= 60 ? 'rgba(234,179,8,0.4)' :
                  'rgba(239,68,68,0.4)'
                }`
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {percentage >= 80 ? (
                  <Award className="w-16 h-16 text-green-400" />
                ) : percentage >= 60 ? (
                  <Trophy className="w-16 h-16 text-yellow-400" />
                ) : (
                  <Target className="w-16 h-16 text-red-400" />
                )}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Badge
                variant={percentage >= 80 ? "green" : percentage >= 60 ? "orange" : "red"}
                className="mb-4 text-sm px-4 py-1"
              >
                {rating}
              </Badge>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={cn("text-3xl font-bold mb-4", isDark ? "text-white" : "text-gray-900")}
            >
              Quiz Complete!
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mb-6"
            >
              <span className={cn(
                "text-6xl font-bold",
                percentage >= 80 ? "text-green-400" :
                percentage >= 60 ? "text-yellow-400" :
                "text-red-400"
              )}>
                {score}
              </span>
              <span className={cn("text-3xl font-bold", isDark ? "text-gray-500" : "text-gray-400")}>
                /{questions.length}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={cn("mb-8 text-lg leading-relaxed", isDark ? "text-gray-400" : "text-gray-600")}
            >
              {percentage >= 80
                ? 'Outstanding! You have mastered the Chomsky hierarchy!'
                : percentage >= 60
                ? 'Good progress! Review the topics you missed and try again.'
                : 'Keep learning! Focus on understanding each language type.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                variant="glow"
                size="lg"
                onClick={handleRestart}
                className="px-10 py-6 text-lg rounded-2xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Again with New Questions
              </Button>
              <p className={cn("mt-4 text-xs", isDark ? "text-gray-500" : "text-gray-400")}>
                {allQuestions.length} questions in pool — each attempt selects {QUIZ_SIZE} random questions
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Card className={cn(
        "relative w-full max-w-2xl mx-auto overflow-hidden",
        "backdrop-blur-2xl border-2",
        isDark ? "bg-white/5 border-white/10" : "bg-white/80 border-gray-200"
      )}>
        <CardContent className="p-8 md:p-10">
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: showResult
                ? selectedAnswer === question.correct
                  ? 'radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, transparent 70%)'
                  : 'radial-gradient(circle at center, rgba(239,68,68,0.15) 0%, transparent 70%)'
                : 'transparent'
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className={cn(
                  "p-2 rounded-xl",
                  isDark ? "bg-purple-500/20" : "bg-purple-100"
                )}
              >
                <Zap className={cn("w-5 h-5", isDark ? "text-purple-400" : "text-purple-600")} />
              </motion.div>
              <span className={cn("text-sm font-medium", isDark ? "text-gray-400" : "text-gray-600")}>
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </motion.div>

            <motion.div
              key={score}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3"
            >
              {/* Streak indicator */}
              {streak >= 2 && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                    "bg-gradient-to-r from-orange-500/20 to-yellow-500/20",
                    "border border-orange-500/30"
                  )}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-bold text-orange-400">{streak}x</span>
                </motion.div>
              )}
              
              <div className="flex items-center gap-2">
                <Sparkles className={cn("w-4 h-4", isDark ? "text-yellow-400" : "text-yellow-500")} />
                <span className={cn(
                  "text-sm font-bold px-4 py-2 rounded-full",
                  isDark ? "bg-white/10 text-white" : "bg-gray-100 text-gray-700"
                )}>
                  {score} points
                </span>
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="relative mb-8">
            <Progress value={progressValue} className="h-3" />
            <motion.div
              className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-full pointer-events-none"
              initial={false}
            >
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>

          {/* Streak bonus notification */}
          <AnimatePresence>
            {showStreakBonus && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 z-50"
              >
                <div className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl",
                  "bg-gradient-to-r from-orange-500 to-yellow-500",
                  "text-white font-bold shadow-lg shadow-orange-500/30"
                )}>
                  <Star className="w-5 h-5" />
                  <span>{streak}x Streak Bonus!</span>
                  <Star className="w-5 h-5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.h3
              key={currentQuestion}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className={cn(
                "text-xl md:text-2xl font-bold mb-8 leading-relaxed",
                isDark ? "text-white" : "text-gray-900"
              )}
            >
              {question.question}
            </motion.h3>
          </AnimatePresence>

          {/* Options */}
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="space-y-4 mb-8"
          >
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrectness = showResult && (isSelected || isCorrect);

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={!showResult ? {
                    scale: 1.02,
                    x: 8,
                    boxShadow: isDark
                      ? '0 0 30px rgba(99,102,241,0.2)'
                      : '0 0 30px rgba(99,102,241,0.1)'
                  } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={cn(
                    "relative w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4",
                    "border-2 overflow-hidden",
                    !showResult && cn(
                      isDark ? "bg-white/5 border-white/10 hover:border-white/30" : "bg-gray-50 border-gray-200 hover:border-gray-400"
                    ),
                    showResult && isCorrect && "bg-green-500/20 border-green-500",
                    showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500",
                    showResult && !isSelected && !isCorrect && cn(
                      isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200",
                      "opacity-40"
                    )
                  )}
                  style={{
                    boxShadow: showCorrectness && isCorrect
                      ? '0 0 40px rgba(34,197,94,0.3)'
                      : showCorrectness && !isCorrect && isSelected
                      ? '0 0 40px rgba(239,68,68,0.3)'
                      : 'none'
                  }}
                >
                  {/* Option letter/icon */}
                  <motion.span
                    animate={{
                      scale: showCorrectness ? [1, 1.3, 1] : 1,
                      rotate: showCorrectness && isCorrect ? [0, 360] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
                      !showResult && cn(isDark ? "bg-white/10 text-white" : "bg-gray-200 text-gray-700"),
                      showResult && isCorrect && "bg-green-500 text-white",
                      showResult && isSelected && !isCorrect && "bg-red-500 text-white",
                      showResult && !isSelected && !isCorrect && cn(isDark ? "bg-white/10 text-white" : "bg-gray-200 text-gray-700")
                    )}
                  >
                    {showCorrectness ? (
                      isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </motion.span>

                  <span className={cn("flex-1 font-medium text-base", isDark ? "text-gray-200" : "text-gray-800")}>
                    {option}
                  </span>

                  {/* Correct indicator for correct answer when wrong selected */}
                  {showResult && isCorrect && !isSelected && (
                    <Badge variant="green" className="shrink-0">
                      Correct
                    </Badge>
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mb-8"
              >
                <div className={cn(
                  "p-6 rounded-2xl border-2",
                  selectedAnswer === question.correct
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-orange-500/10 border-orange-500/30"
                )}>
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={cn(
                        "p-2 rounded-xl shrink-0",
                        selectedAnswer === question.correct ? "bg-green-500/20" : "bg-orange-500/20"
                      )}
                    >
                      <Sparkles className={cn(
                        "w-5 h-5",
                        selectedAnswer === question.correct ? "text-green-400" : "text-orange-400"
                      )} />
                    </motion.div>
                    <div>
                      <h4 className={cn(
                        "font-bold mb-2",
                        selectedAnswer === question.correct ? "text-green-400" : "text-orange-400"
                      )}>
                        {selectedAnswer === question.correct ? 'Correct!' : 'Explanation'}
                      </h4>
                      <p className={cn("text-sm leading-relaxed", isDark ? "text-gray-300" : "text-gray-700")}>
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Button
                  variant="glow"
                  size="lg"
                  onClick={handleNext}
                  className="w-full py-6 text-lg rounded-2xl"
                >
                  {currentQuestion < questions.length - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  ) : (
                    <>
                      View Results
                      <Trophy className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
