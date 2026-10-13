import React, { useState } from 'react';
import { PlusCircle, Sparkles, Volume2, Play, Trash2, Check, Smile } from 'lucide-react';
import { sounds, readAloudText } from '../utils/audio';
import { fireOceanConfetti } from '../utils/confetti';

export interface CustomRiddle {
  id: string;
  riddle: string;
  answer: string;
  hint: string;
  emoji: string;
  createdAt: number;
}

interface RiddleMakerProps {
  customRiddles: CustomRiddle[];
  onSaveRiddle: (riddle: CustomRiddle) => void;
  onDeleteRiddle: (id: string) => void;
}

export const RiddleMaker: React.FC<RiddleMakerProps> = ({
  customRiddles,
  onSaveRiddle,
  onDeleteRiddle,
}) => {
  const [riddleText, setRiddleText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [hintText, setHintText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🦀');
  const [testPlaying, setTestPlaying] = useState<CustomRiddle | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [guessFeedback, setGuessFeedback] = useState<'correct' | 'wrong' | null>(null);

  const emojiChoices = ['🦀', '🐬', '🐙', '🦈', '🐳', '🦭', '🪸', '🐚', '⛵', '🏝️', '🦩', '🐧'];

  const starterPrompts = [
    { text: "I have shiny silver scales and swim in huge groups. What am I?", answer: "Sardine", hint: "It swims in a school!" },
    { text: "I look like a submarine with sharp white teeth. What am I?", answer: "A shark", hint: "I have a famous dorsal fin!" },
    { text: "I am a boat made of wood with big white sails catching the wind. What am I?", answer: "A sailboat", hint: "Wind pushes me across the bay!" },
  ];

  const handleUseStarter = (starter: typeof starterPrompts[0]) => {
    sounds.playBubblePop();
    setRiddleText(starter.text);
    setAnswerText(starter.answer);
    setHintText(starter.hint);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riddleText.trim() || !answerText.trim()) return;

    sounds.playFanfare();
    fireOceanConfetti();

    const newRiddle: CustomRiddle = {
      id: `custom-${Date.now()}`,
      riddle: riddleText.trim(),
      answer: answerText.trim(),
      hint: hintText.trim() || 'Think about things living in or near the water!',
      emoji: selectedEmoji,
      createdAt: Date.now(),
    };

    onSaveRiddle(newRiddle);
    setRiddleText('');
    setAnswerText('');
    setHintText('');
  };

  const handleReadCustom = (text: string) => {
    sounds.playBubblePop();
    readAloudText(text);
  };

  const handleTestGuess = (targetAnswer: string) => {
    sounds.playBubblePop();
    if (guessInput.toLowerCase().trim() === targetAnswer.toLowerCase().trim()) {
      setGuessFeedback('correct');
      sounds.playCorrectSound();
      fireOceanConfetti();
    } else {
      setGuessFeedback('wrong');
      sounds.playEncouragingBoop();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Test Play Modal */}
      {testPlaying && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-rose-200 shadow-2xl relative text-center">
            <button
              onClick={() => {
                setTestPlaying(null);
                setGuessFeedback(null);
                setGuessInput('');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="text-4xl mb-2">{testPlaying.emoji}</div>
            <span className="text-xs font-black text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 mb-3 inline-block">
              Custom Riddle Challenge
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 my-3">
              "{testPlaying.riddle}"
            </h3>

            <button
              onClick={() => handleReadCustom(testPlaying.riddle)}
              className="flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 mb-5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Read Aloud</span>
            </button>

            {testPlaying.hint && (
              <div className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 mb-4 text-left">
                🐢 <strong>Hint:</strong> {testPlaying.hint}
              </div>
            )}

            {/* Guess input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={guessInput}
                onChange={(e) => setGuessInput(e.target.value)}
                placeholder="Type your guess..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
              />
              <button
                onClick={() => handleTestGuess(testPlaying.answer)}
                className="bg-sky-600 hover:bg-sky-700 text-white font-black text-xs px-4 py-2 rounded-xl transition-transform active:scale-95"
              >
                Guess!
              </button>
            </div>

            {guessFeedback === 'correct' && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold animate-fadeIn">
                🎉 That's right! Answer: {testPlaying.answer}
              </div>
            )}
            {guessFeedback === 'wrong' && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold animate-fadeIn">
                🤔 Not quite! Give it another splash!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 rounded-3xl p-6 sm:p-8 text-white shadow-md mb-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/30 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-white">
              Creative Lab
            </span>
            <span className="text-xs font-bold text-rose-100">Make & Share</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
            Write Your Own Sea Riddle!
          </h1>
          <p className="text-sm sm:text-base text-rose-50 font-medium leading-relaxed">
            Invent a fun riddle about your favorite sea creature or ocean adventure. Test it out and challenge your friends right here!
          </p>
        </div>
      </div>

      {/* Creation Form & Quick Starters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main form */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border-2 border-rose-100 shadow-xl">
          <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-rose-500" />
            <span>Craft Your Riddle</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                The Riddle Question (e.g. "I have 8 legs and...")
              </label>
              <textarea
                value={riddleText}
                onChange={(e) => setRiddleText(e.target.value)}
                placeholder="I am small and shiny, I hide under sea rocks... What am I?"
                rows={3}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  The Answer
                </label>
                <input
                  type="text"
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder="e.g. A hermit crab"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                  Wise Turtle Hint (Optional)
                </label>
                <input
                  type="text"
                  value={hintText}
                  onChange={(e) => setHintText(e.target.value)}
                  placeholder="e.g. Look inside empty shells!"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            {/* Emoji Selector */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                Pick a Sea Mascot
              </label>
              <div className="flex flex-wrap gap-2">
                {emojiChoices.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                      selectedEmoji === emoji
                        ? 'bg-rose-100 border-2 border-rose-400 scale-110 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black py-3 rounded-2xl shadow-md shadow-rose-300 transition-transform active:scale-95 text-base"
            >
              Save & Create My Riddle ✨
            </button>
          </form>
        </div>

        {/* Quick Inspiration Card */}
        <div className="bg-gradient-to-b from-sky-50 to-teal-50 rounded-3xl p-6 border-2 border-sky-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h3 className="text-sm font-black text-sky-950 uppercase tracking-wider">
                Riddle Sparks
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-medium mb-4">
              Need inspiration? Tap any idea below to fill in your riddle form:
            </p>

            <div className="space-y-2.5">
              {starterPrompts.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => handleUseStarter(starter)}
                  className="w-full text-left p-3 rounded-2xl bg-white/90 hover:bg-white border border-sky-200/80 transition-all text-xs font-medium text-slate-800 shadow-2xs group"
                >
                  <div className="font-bold text-sky-900 group-hover:text-sky-700">
                    💡 Idea #{i + 1}
                  </div>
                  <div className="text-slate-600 truncate mt-0.5">"{starter.text}"</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-200/60 text-[11px] text-teal-800 font-medium">
            🌊 Tip: Great riddles describe how things move, what they look like, or where they live!
          </div>
        </div>
      </div>

      {/* Custom Riddles Collection */}
      {customRiddles.length > 0 && (
        <div>
          <h2 className="text-xl font-black text-slate-900 mb-4">
            Your Custom Sea Riddles ({customRiddles.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customRiddles.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-5 border-2 border-rose-100 shadow-md flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="text-3xl shrink-0 p-1.5 bg-rose-50 rounded-xl">
                    {r.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-900 leading-snug">
                      "{r.riddle}"
                    </p>
                    <div className="text-xs font-bold text-rose-700 mt-1">
                      Answer: {r.answer}
                    </div>
                    {r.hint && (
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Hint: {r.hint}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      sounds.playBubblePop();
                      setTestPlaying(r);
                    }}
                    className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
                    title="Test this riddle"
                  >
                    <Play className="w-4 h-4 fill-sky-600" />
                  </button>
                  <button
                    onClick={() => {
                      sounds.playBubblePop();
                      onDeleteRiddle(r.id);
                    }}
                    className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete riddle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
