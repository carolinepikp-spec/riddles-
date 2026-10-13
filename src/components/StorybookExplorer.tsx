import React, { useState } from 'react';
import { Search, Star, Volume2, VolumeX, Eye, EyeOff, Sparkles, Filter } from 'lucide-react';
import { RIDDLES, RiddleItem } from '../data/riddles';
import { sounds, readAloudText, stopSpeaking } from '../utils/audio';

interface StorybookExplorerProps {
  starredIds: number[];
  onToggleStar: (riddleId: number) => void;
  solvedIds: number[];
}

export const StorybookExplorer: React.FC<StorybookExplorerProps> = ({
  starredIds,
  onToggleStar,
  solvedIds,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [revealedIds, setRevealedIds] = useState<number[]>([]);
  const [speakingId, setSpeakingId] = useState<number | null>(null);

  const categories = ['All', 'Ocean Life', 'Beach & Shore', 'Water Wonders', 'Birds & Creatures', 'Favorites'];

  const filteredRiddles = RIDDLES.filter(r => {
    // Category filter
    if (selectedCategory === 'Favorites') {
      if (!starredIds.includes(r.id)) return false;
    } else if (selectedCategory !== 'All' && r.category !== selectedCategory) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchRiddle = r.riddle.toLowerCase().includes(q);
      const matchAnswer = r.answer.toLowerCase().includes(q);
      const matchFact = r.funFact.toLowerCase().includes(q);
      return matchRiddle || matchAnswer || matchFact;
    }

    return true;
  });

  const toggleReveal = (id: number) => {
    sounds.playBubblePop();
    setRevealedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSpeakRiddle = (riddle: RiddleItem) => {
    if (speakingId === riddle.id) {
      stopSpeaking();
      setSpeakingId(null);
      return;
    }

    sounds.playBubblePop();
    setSpeakingId(riddle.id);
    const textToRead = `${riddle.riddle} What am I?`;
    readAloudText(textToRead, () => {
      setSpeakingId(null);
    });
  };

  const handleRevealAll = () => {
    sounds.playBubblePop();
    if (revealedIds.length === filteredRiddles.length) {
      setRevealedIds([]);
    } else {
      setRevealedIds(filteredRiddles.map(r => r.id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Title & Introduction */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/40 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-amber-950">
              The Great Sea Library
            </span>
            <span className="text-xs font-bold text-amber-900">30 Ocean Riddles</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
            Riddle Storybook & Explorer
          </h1>
          <p className="text-sm sm:text-base text-amber-900/90 font-medium leading-relaxed">
            Flip through the cards, listen to each riddle aloud, star your favorites, and peek at the answers to share with family!
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search riddles, animals, or clues..."
            className="w-full bg-white border border-sky-100 rounded-2xl pl-10 pr-4 py-2.5 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-400 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Reveal all toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRevealAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-sky-50 border border-sky-200 text-sky-800 transition-colors shadow-2xs"
          >
            {revealedIds.length === filteredRiddles.length ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                <span>Hide All Answers</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-sky-600" />
                <span>Reveal All Answers</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                sounds.playBubblePop();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white hover:bg-amber-50 text-slate-600 border border-sky-100'
              }`}
            >
              {cat === 'Favorites' ? `⭐ Favorites (${starredIds.length})` : cat}
            </button>
          );
        })}
      </div>

      {/* Riddles Grid */}
      {filteredRiddles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-sky-100 p-8">
          <div className="text-4xl mb-3">🐠</div>
          <h3 className="text-lg font-black text-slate-800 mb-1">No riddles found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search terms or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRiddles.map((riddle) => {
            const isRevealed = revealedIds.includes(riddle.id);
            const isStarred = starredIds.includes(riddle.id);
            const isSolved = solvedIds.includes(riddle.id);
            const isSpeaking = speakingId === riddle.id;

            return (
              <div
                key={riddle.id}
                className={`bg-white rounded-3xl p-5 border-2 transition-all flex flex-col justify-between shadow-md hover:shadow-lg ${
                  isRevealed
                    ? 'border-amber-200 shadow-amber-100/50'
                    : 'border-sky-100 shadow-sky-100/40'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{riddle.emoji}</span>
                      <span className="text-[11px] font-black uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                        #{riddle.id} · {riddle.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Audio read aloud */}
                      <button
                        onClick={() => handleSpeakRiddle(riddle)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                          isSpeaking
                            ? 'bg-amber-100 border-amber-300 text-amber-800 animate-pulse'
                            : 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-700'
                        }`}
                        title="Read riddle aloud"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      {/* Favorite / Star */}
                      <button
                        onClick={() => {
                          sounds.playCoinSound();
                          onToggleStar(riddle.id);
                        }}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                          isStarred
                            ? 'bg-amber-50 border-amber-300 text-amber-500'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                        title={isStarred ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Riddle Text */}
                  <p className="text-base font-bold text-slate-900 leading-snug mb-4">
                    "{riddle.riddle}"
                  </p>
                </div>

                {/* Bottom Section: Answer Reveal or Clue */}
                <div className="pt-3 border-t border-slate-100 mt-2">
                  {isRevealed ? (
                    <div className="bg-amber-50/80 rounded-2xl p-3 border border-amber-200 animate-fadeIn">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-amber-900">
                          Answer: {riddle.answer}
                        </span>
                        <span className="text-lg">{riddle.emoji}</span>
                      </div>
                      <p className="text-xs text-amber-800 font-medium leading-relaxed">
                        🌊 {riddle.funFact}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 italic">
                        Can you solve it?
                      </span>
                      <button
                        onClick={() => toggleReveal(riddle.id)}
                        className="flex items-center gap-1 text-xs font-extrabold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Peek Answer</span>
                      </button>
                    </div>
                  )}

                  {isRevealed && (
                    <div className="mt-2 text-right">
                      <button
                        onClick={() => toggleReveal(riddle.id)}
                        className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
                      >
                        Hide Answer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
