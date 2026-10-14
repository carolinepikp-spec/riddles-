import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Lightbulb, CheckCircle2, XCircle, ArrowRight, Sparkles, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { RiddleItem } from '../data/riddles';
import { sounds, readAloudText, stopSpeaking } from '../utils/audio';
import { fireOceanConfetti } from '../utils/confetti';

interface RiddleCardProps {
  riddle: RiddleItem;
  riddleNumber?: number;
  totalRiddles?: number;
  onSolved: (riddleId: number, earnedCoins: number) => void;
  onNext?: () => void;
  showNextButton?: boolean;
}

export const RiddleCard: React.FC<RiddleCardProps> = ({
  riddle,
  riddleNumber,
  totalRiddles,
  onSolved,
  onNext,
  showNextButton = true,
}) => {
  const [displayOptions, setDisplayOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [shakeWrong, setShakeWrong] = useState<boolean>(false);

  // Check if an option matches the answer
  const isMatchingAnswer = (option: string) => {
    const opt = option.toLowerCase().trim();
    const ans = riddle.answer.toLowerCase().trim();
    if (opt === ans) return true;
    return riddle.aliases.some(alias => opt === alias.toLowerCase().trim());
  };

  // Reset local state and shuffle options so answers are never in a fixed position
  useEffect(() => {
    const shuffled = [...riddle.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setDisplayOptions(shuffled);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
    setEliminatedOptions([]);
    setIsSpeaking(false);
    setShakeWrong(false);
    stopSpeaking();
  }, [riddle.id]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    sounds.playBubblePop();
    setIsSpeaking(true);
    const textToRead = `${riddle.riddle} Think carefully!`;
    const started = readAloudText(textToRead, () => {
      setIsSpeaking(false);
    });
    if (!started) {
      setIsSpeaking(false);
    }
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered && isCorrect) return; // already solved

    sounds.playBubblePop();
    setSelectedOption(option);

    if (isMatchingAnswer(option)) {
      setIsAnswered(true);
      setIsCorrect(true);
      sounds.playCorrectSound();
      fireOceanConfetti();
      onSolved(riddle.id, 10);
    } else {
      setIsAnswered(true);
      setIsCorrect(false);
      setShakeWrong(true);
      sounds.playEncouragingBoop();
      setTimeout(() => setShakeWrong(false), 600);
    }
  };

  const handleUse5050Clue = () => {
    sounds.playCoinSound();
    const wrongOptions = displayOptions.filter(opt => !isMatchingAnswer(opt));
    // Pick 2 wrong options to eliminate
    const shuffledWrong = [...wrongOptions].sort(() => Math.random() - 0.5);
    setEliminatedOptions(shuffledWrong.slice(0, 2));
  };

  return (
    <div className={`relative bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-xl transition-all duration-300 ${
      isAnswered && isCorrect
        ? 'border-emerald-300 ring-4 ring-emerald-100 shadow-emerald-200/50'
        : shakeWrong
        ? 'border-rose-400 translate-x-1 shadow-rose-200/50'
        : 'border-sky-100 shadow-sky-100/60'
    }`}>
      {/* Top Meta Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
            {riddle.category}
          </span>
          {riddleNumber && totalRiddles && (
            <span className="text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
              Riddle {riddleNumber} of {totalRiddles}
            </span>
          )}
        </div>

        {/* Listen / Voice button */}
        <button
          onClick={handleSpeak}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 border ${
            isSpeaking
              ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
              : 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200'
          }`}
          title="Listen to this riddle read aloud"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-amber-700" />
              <span>Stop Voice</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Read Aloud</span>
            </>
          )}
        </button>
      </div>

      {/* The Riddle Text */}
      <div className="relative mb-6">
        <div className="flex items-start gap-3">
          <span className="text-3xl sm:text-4xl select-none animate-sway">
            {riddle.emoji}
          </span>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug tracking-tight">
              "{riddle.riddle}"
            </h2>
          </div>
        </div>
      </div>

      {/* Clues and Assist bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            sounds.playBubblePop();
            setShowHint(!showHint);
          }}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            showHint
              ? 'bg-amber-100 text-amber-900 border-amber-300'
              : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          <span>{showHint ? 'Hide Clue' : 'Wise Turtle Clue'}</span>
        </button>

        {eliminatedOptions.length === 0 && !isCorrect && (
          <button
            onClick={handleUse5050Clue}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition-all active:scale-95"
            title="Remove 2 wrong answers"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Eliminate 2 Wrong</span>
          </button>
        )}
      </div>

      {/* Revealed Hint Box */}
      {showHint && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-sm animate-fadeIn">
          <div className="flex items-center gap-2 font-bold mb-1 text-amber-900">
            <span className="text-base">🐢</span>
            <span>Wise Turtle's Hint:</span>
          </div>
          <p className="font-medium text-amber-800 leading-relaxed">
            {riddle.hint}
          </p>
        </div>
      )}

      {/* Multiple Choice Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {displayOptions.map((option, idx) => {
          const isEliminated = eliminatedOptions.includes(option);
          const isSelected = selectedOption === option;
          const isThisOptionCorrect = isMatchingAnswer(option);

          let btnStyle = 'bg-white hover:bg-sky-50 text-slate-800 border-2 border-sky-100 hover:border-sky-300';

          if (isAnswered && isCorrect) {
            if (isThisOptionCorrect) {
              btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md shadow-emerald-200';
            } else {
              btnStyle = 'bg-slate-50 text-slate-400 border-2 border-slate-100 opacity-60';
            }
          } else if (isSelected && !isCorrect) {
            btnStyle = 'bg-rose-50 text-rose-700 border-2 border-rose-400 animate-gentle-bounce';
          }

          if (isEliminated) {
            btnStyle = 'bg-slate-50 text-slate-300 border-dashed border-2 border-slate-200 opacity-40 cursor-not-allowed line-through';
          }

          return (
            <button
              key={idx}
              disabled={isEliminated || (isAnswered && isCorrect)}
              onClick={() => handleSelectOption(option)}
              className={`flex items-center justify-between p-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-150 active:scale-98 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-sky-100/70 text-sky-800 flex items-center justify-center text-xs font-black">
                  {['A', 'B', 'C', 'D'][idx]}
                </span>
                <span className="text-left">{option}</span>
              </div>

              {isAnswered && isThisOptionCorrect && (
                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
              )}
              {isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Feedback / Educational Discovery */}
      {isAnswered && isCorrect && (
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 mb-5 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0 animate-bounce">
              {riddle.emoji}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-black text-emerald-800">
                  Splashtastic! Answer: {riddle.answer}
                </span>
                <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  +10 🪙
                </span>
              </div>
              <p className="text-xs sm:text-sm text-teal-900/90 font-medium leading-relaxed">
                <strong className="text-teal-950 font-bold">Sea Secret:</strong> {riddle.funFact}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Wrong Answer Encouragement */}
      {isAnswered && !isCorrect && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-5 text-rose-900 text-xs sm:text-sm font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌊</span>
            <span>Nice try, sailor! Take another guess or tap the Wise Turtle Clue!</span>
          </div>
          <button
            onClick={() => {
              sounds.playBubblePop();
              setShowHint(true);
            }}
            className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg shrink-0"
          >
            Show Clue
          </button>
        </div>
      )}

      {/* Next Button Footer */}
      {isAnswered && isCorrect && showNextButton && onNext && (
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              sounds.playBubblePop();
              onNext();
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-base px-6 py-3 rounded-2xl shadow-lg shadow-teal-500/25 transition-transform active:scale-95"
          >
            <span>Next Sea Mystery</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
