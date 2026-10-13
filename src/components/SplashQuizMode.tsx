import React, { useState, useEffect } from 'react';
import { Flame, Clock, RefreshCw, Trophy, Sparkles, Zap, RotateCcw } from 'lucide-react';
import { RIDDLES, RiddleItem } from '../data/riddles';
import { RiddleCard } from './RiddleCard';
import { sounds } from '../utils/audio';
import { fireGrandCelebration } from '../utils/confetti';

interface SplashQuizModeProps {
  onRiddleSolved: (riddleId: number, coins: number) => void;
  streak: number;
}

export const SplashQuizMode: React.FC<SplashQuizModeProps> = ({
  onRiddleSolved,
  streak,
}) => {
  const [deck, setDeck] = useState<RiddleItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Initialize and shuffle deck
  const startNewQuiz = () => {
    sounds.playBubblePop();
    const shuffled = [...RIDDLES].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setQuizScore(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewQuiz();
  }, []);

  const handleSolved = (riddleId: number, earnedCoins: number) => {
    setQuizScore(prev => prev + 10);
    onRiddleSolved(riddleId, earnedCoins);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= deck.length) {
      setIsGameOver(true);
      sounds.playFanfare();
      fireGrandCelebration();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (deck.length === 0) return null;

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-3xl p-8 border-2 border-amber-200 shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 mx-auto flex items-center justify-center text-4xl mb-4 animate-bounce">
            🏆
          </div>
          <span className="text-xs font-black text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Quiz Master!
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2 mb-2">
            You Conquered the Deep Blue!
          </h2>
          <p className="text-base text-slate-600 max-w-md mx-auto mb-6">
            You solved all {deck.length} sea riddles in this run! Your brain is as vast as the ocean.
          </p>

          <div className="flex items-center justify-center gap-6 mb-8 bg-sky-50 p-4 rounded-2xl max-w-xs mx-auto border border-sky-100">
            <div>
              <div className="text-2xl font-black text-sky-900">{quizScore}</div>
              <div className="text-xs font-bold text-sky-600 uppercase">Points</div>
            </div>
            <div className="h-8 w-px bg-sky-200" />
            <div>
              <div className="text-2xl font-black text-orange-600">{streak}</div>
              <div className="text-xs font-bold text-orange-500 uppercase">Streak</div>
            </div>
          </div>

          <button
            onClick={startNewQuiz}
            className="flex items-center gap-2 mx-auto bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-sky-600/30 transition-transform active:scale-95 text-base"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Another Round</span>
          </button>
        </div>
      </div>
    );
  }

  const currentRiddle = deck[currentIndex];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Quiz Top Status */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-sky-100 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-sm">
            #{currentIndex + 1}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Question Progress</div>
            <div className="text-sm font-black text-slate-900">
              {currentIndex + 1} of {deck.length} Riddles
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-500">Score</div>
            <div className="text-sm font-black text-emerald-600">{quizScore} pts</div>
          </div>
          <button
            onClick={startNewQuiz}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Reshuffle and restart quiz"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Riddle card */}
      <RiddleCard
        riddle={currentRiddle}
        riddleNumber={currentIndex + 1}
        totalRiddles={deck.length}
        onSolved={handleSolved}
        onNext={handleNext}
        showNextButton={true}
      />
    </div>
  );
};
