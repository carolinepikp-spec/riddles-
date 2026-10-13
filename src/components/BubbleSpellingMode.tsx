import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, VolumeX, Sparkles, RotateCcw, Lightbulb, ArrowRight, CheckCircle2, Shuffle } from 'lucide-react';
import { RiddleItem, RIDDLES } from '../data/riddles';
import { sounds, readAloudText, stopSpeaking } from '../utils/audio';
import { fireOceanConfetti } from '../utils/confetti';

interface BubbleSpellingModeProps {
  onRiddleSolved: (riddleId: number, coins: number) => void;
  solvedIds: number[];
}

export const BubbleSpellingMode: React.FC<BubbleSpellingModeProps> = ({
  onRiddleSolved,
  solvedIds,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedLetters, setSelectedLetters] = useState<{ id: string; char: string }[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [poolLetters, setPoolLetters] = useState<{ id: string; char: string; used: boolean }[]>([]);

  const currentRiddle: RiddleItem = RIDDLES[currentIndex];

  // Clean target word (uppercase, only letters & spaces)
  const targetWord = useMemo(() => {
    return currentRiddle.shortAnswer.toUpperCase();
  }, [currentRiddle]);

  const targetCharsNoSpace = useMemo(() => {
    return targetWord.replace(/[^A-Z]/g, '').split('');
  }, [targetWord]);

  // Initialize letter pool for the riddle
  useEffect(() => {
    setSelectedLetters([]);
    setIsCompleted(false);
    setShowHint(false);
    stopSpeaking();
    setIsSpeaking(false);

    // Letter pool: letters of word + extra random friendly distractors
    const chars = [...targetCharsNoSpace];
    const extraAlphabet = 'EARIOTNSLC'.split('');
    const extraCount = Math.min(3, 10 - chars.length > 0 ? 3 : 1);
    for (let i = 0; i < extraCount; i++) {
      const randomChar = extraAlphabet[Math.floor(Math.random() * extraAlphabet.length)];
      chars.push(randomChar);
    }

    // Shuffle
    const shuffled = chars.sort(() => Math.random() - 0.5).map((char, index) => ({
      id: `${char}-${index}-${Date.now()}`,
      char,
      used: false,
    }));

    setPoolLetters(shuffled);
  }, [currentRiddle.id]);

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    sounds.playBubblePop();
    setIsSpeaking(true);
    const started = readAloudText(`${currentRiddle.riddle} Spell the sea answer!`, () => {
      setIsSpeaking(false);
    });
    if (!started) setIsSpeaking(false);
  };

  const handleSelectBubble = (bubble: { id: string; char: string; used: boolean }) => {
    if (bubble.used || isCompleted) return;
    if (selectedLetters.length >= targetCharsNoSpace.length) return;

    sounds.playBubblePop();

    // Mark as used
    setPoolLetters(prev =>
      prev.map(p => (p.id === bubble.id ? { ...p, used: true } : p))
    );

    const newSelected = [...selectedLetters, { id: bubble.id, char: bubble.char }];
    setSelectedLetters(newSelected);

    // Check if fully spelled
    if (newSelected.length === targetCharsNoSpace.length) {
      const spelledWord = newSelected.map(s => s.char).join('');
      const targetNoSpaces = targetCharsNoSpace.join('');

      if (spelledWord === targetNoSpaces) {
        setIsCompleted(true);
        sounds.playCorrectSound();
        fireOceanConfetti();
        onRiddleSolved(currentRiddle.id, 15);
      } else {
        sounds.playEncouragingBoop();
      }
    }
  };

  const handleRemoveLetter = (index: number) => {
    if (isCompleted) return;
    sounds.playBubblePop();
    const removed = selectedLetters[index];
    setSelectedLetters(prev => prev.filter((_, i) => i !== index));

    // Free back in pool
    setPoolLetters(prev =>
      prev.map(p => (p.id === removed.id ? { ...p, used: false } : p))
    );
  };

  const handleResetLetters = () => {
    sounds.playBubblePop();
    setSelectedLetters([]);
    setPoolLetters(prev => prev.map(p => ({ ...p, used: false })));
  };

  const handleNextRiddle = () => {
    sounds.playBubblePop();
    setCurrentIndex((prev) => (prev + 1) % RIDDLES.length);
  };

  const handlePrevRiddle = () => {
    sounds.playBubblePop();
    setCurrentIndex((prev) => (prev - 1 + RIDDLES.length) % RIDDLES.length);
  };

  // Provide first letter hint
  const handleRevealFirstLetter = () => {
    sounds.playCoinSound();
    if (selectedLetters.length > 0) {
      handleResetLetters();
    }
    const firstChar = targetCharsNoSpace[0];
    const matchingBubble = poolLetters.find(p => p.char === firstChar && !p.used);
    if (matchingBubble) {
      handleSelectBubble(matchingBubble);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      {/* Mode Subheader */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-purple-50/80 border border-purple-200/80 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center text-xl shadow-xs">
            🫧
          </div>
          <div>
            <h2 className="text-lg font-black text-purple-950">Bubble Spell Challenge</h2>
            <p className="text-xs text-purple-700 font-semibold">
              Tap floating letter bubbles to spell the answer!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-purple-900 bg-purple-200/60 px-3 py-1 rounded-full">
            Riddle {currentIndex + 1} of {RIDDLES.length}
          </span>
          <button
            onClick={handleSpeak}
            className="p-2 rounded-xl bg-white border border-purple-200 text-purple-700 hover:bg-purple-100 transition-colors"
            title="Read riddle aloud"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-purple-900" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl relative overflow-hidden">
        {/* Riddle banner */}
        <div className="flex items-start gap-3.5 mb-6">
          <span className="text-3xl sm:text-4xl select-none animate-sway">
            {currentRiddle.emoji}
          </span>
          <div>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 mb-1 inline-block">
              {currentRiddle.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              "{currentRiddle.riddle}"
            </h3>
          </div>
        </div>

        {/* Word Length and Target Slots */}
        <div className="my-6">
          <div className="text-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Spell The Answer ({targetCharsNoSpace.length} letters)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 min-h-[64px] p-3 rounded-2xl bg-sky-50/60 border border-sky-100">
            {targetCharsNoSpace.map((_, idx) => {
              const letter = selectedLetters[idx];
              return (
                <button
                  key={idx}
                  onClick={() => letter && handleRemoveLetter(idx)}
                  disabled={!letter || isCompleted}
                  className={`w-11 h-12 sm:w-13 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                    letter
                      ? isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-300/50 scale-105'
                        : 'bg-white text-purple-900 shadow-sm border-2 border-purple-300 hover:border-rose-400 active:scale-95'
                      : 'border-2 border-dashed border-sky-200 bg-white/70 text-slate-300'
                  }`}
                  title={letter ? "Tap to remove letter" : "Letter slot"}
                >
                  {letter ? letter.char : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Assistant / Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>

            {selectedLetters.length === 0 && !isCompleted && (
              <button
                onClick={handleRevealFirstLetter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                <span>First Letter Clue</span>
              </button>
            )}
          </div>

          {selectedLetters.length > 0 && !isCompleted && (
            <button
              onClick={handleResetLetters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Letters</span>
            </button>
          )}
        </div>

        {showHint && (
          <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold animate-fadeIn">
            🐢 <strong>Wise Turtle:</strong> {currentRiddle.hint}
          </div>
        )}

        {/* Letter Bubbles Pool */}
        {!isCompleted && (
          <div className="bg-gradient-to-b from-sky-50 to-blue-50/60 rounded-3xl p-5 border border-sky-100 text-center">
            <div className="text-xs font-bold text-sky-800 mb-3 flex items-center justify-center gap-1">
              <span>🫧 Tap the floating bubbles:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {poolLetters.map((bubble) => {
                if (bubble.used) {
                  return (
                    <div
                      key={bubble.id}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-sky-200/60 bg-transparent opacity-25 flex items-center justify-center"
                    />
                  );
                }
                return (
                  <button
                    key={bubble.id}
                    onClick={() => handleSelectBubble(bubble)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-sky-400 via-cyan-300 to-teal-300 hover:from-sky-500 hover:to-teal-400 text-sky-950 font-black text-xl sm:text-2xl shadow-md shadow-sky-300/40 border-2 border-white transition-all transform active:scale-90 hover:scale-110 flex items-center justify-center animate-gentle-bounce"
                  >
                    {bubble.char}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Feedback */}
        {isCompleted && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 rounded-3xl p-5 text-center animate-fadeIn shadow-md">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm text-3xl mb-2 animate-bounce">
              {currentRiddle.emoji}
            </div>
            <h4 className="text-xl font-black text-emerald-900 mb-1">
              Bubble-icious! You Spelled: {currentRiddle.shortAnswer}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-800 font-semibold mb-3">
              {currentRiddle.answer} — +15 🪙 Gold Coins!
            </p>
            <p className="text-xs text-teal-900 max-w-lg mx-auto bg-white/80 p-3 rounded-xl border border-teal-100">
              💡 <strong>Did You Know?</strong> {currentRiddle.funFact}
            </p>

            <div className="mt-4 flex justify-center">
              <button
                onClick={handleNextRiddle}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-2.5 rounded-2xl shadow-md transition-transform active:scale-95"
              >
                <span>Next Word Bubble</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Navigation bottom bar */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={handlePrevRiddle}
            className="text-xs font-bold text-slate-500 hover:text-sky-700 bg-slate-50 hover:bg-sky-50 px-3.5 py-2 rounded-xl transition-colors"
          >
            ← Previous Riddle
          </button>
          <button
            onClick={handleNextRiddle}
            className="text-xs font-bold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3.5 py-2 rounded-xl transition-colors"
          >
            Skip / Next Riddle →
          </button>
        </div>
      </div>
    </div>
  );
};
