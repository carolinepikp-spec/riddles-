import React, { useState } from 'react';
import { Trophy, Star, Award, Lock, Sparkles, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { RIDDLES, RiddleItem, PlayerProfile, ZONES } from '../data/riddles';
import { sounds } from '../utils/audio';

interface TrophyChestProps {
  profile: PlayerProfile;
}

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  isUnlocked: boolean;
  rewardCoins: number;
}

export const TrophyChest: React.FC<TrophyChestProps> = ({ profile }) => {
  const [selectedCreature, setSelectedCreature] = useState<RiddleItem | null>(null);

  // Calculate achievements
  const achievements: Achievement[] = [
    {
      id: 'first_solve',
      title: 'First Ripple',
      desc: 'Solve your very first ocean riddle',
      icon: '🌊',
      isUnlocked: profile.solvedIds.length >= 1,
      rewardCoins: 20,
    },
    {
      id: 'streak_3',
      title: 'Dolphin Leap',
      desc: 'Reach a streak of 3 correct answers',
      icon: '🐬',
      isUnlocked: profile.highestStreak >= 3,
      rewardCoins: 30,
    },
    {
      id: 'streak_7',
      title: 'Tidal Wave',
      desc: 'Reach an impressive streak of 7 correct answers',
      icon: '🔥',
      isUnlocked: profile.highestStreak >= 7,
      rewardCoins: 50,
    },
    {
      id: 'zone1_clear',
      title: 'Beachcomber',
      desc: 'Solve all riddles in Sunlit Shore',
      icon: '🏖️',
      isUnlocked: RIDDLES.filter(r => r.zoneId === 1).every(r => profile.solvedIds.includes(r.id)),
      rewardCoins: 40,
    },
    {
      id: 'halfway',
      title: 'Deep Diver',
      desc: 'Solve at least 15 ocean riddles',
      icon: '🤿',
      isUnlocked: profile.solvedIds.length >= 15,
      rewardCoins: 60,
    },
    {
      id: 'all_clear',
      title: 'King of the Ocean',
      desc: 'Solve all 30 sea riddles in the game!',
      icon: '👑',
      isUnlocked: profile.solvedIds.length === RIDDLES.length,
      rewardCoins: 100,
    },
  ];

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Creature Detail Modal */}
      {selectedCreature && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-amber-200 shadow-2xl relative text-center">
            <button
              onClick={() => setSelectedCreature(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-100 to-sky-100 mx-auto flex items-center justify-center text-5xl mb-3 shadow-inner border border-amber-200">
              {selectedCreature.emoji}
            </div>

            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 inline-block mb-2">
              {selectedCreature.category}
            </span>

            <h3 className="text-2xl font-black text-slate-900 mb-1">
              {selectedCreature.answer}
            </h3>

            <div className="bg-sky-50 rounded-2xl p-4 my-4 border border-sky-100 text-left">
              <div className="text-xs font-black text-sky-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-600" />
                <span>Ocean Trivia</span>
              </div>
              <p className="text-xs sm:text-sm text-sky-950 font-medium leading-relaxed">
                {selectedCreature.funFact}
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-left">
              <div className="text-xs font-bold text-amber-900">Original Riddle:</div>
              <p className="text-xs text-amber-800 italic mt-0.5">"{selectedCreature.riddle}"</p>
            </div>

            <button
              onClick={() => setSelectedCreature(null)}
              className="mt-6 w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-transform active:scale-95"
            >
              Keep Exploring!
            </button>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-md mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/40 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full text-amber-950">
                Collector's Vault
              </span>
              <span className="text-xs font-bold text-amber-900">
                {profile.solvedIds.length} of {RIDDLES.length} Discovered
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
              Treasure Chest & Sea Stickers
            </h1>
            <p className="text-sm sm:text-base text-amber-900/90 font-medium leading-relaxed">
              Every riddle you solve unlocks a shiny sticker in your ocean album! Tap any unlocked creature to read its deep-sea secrets.
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 border border-white/40 text-center min-w-[130px]">
            <div className="text-3xl font-black text-amber-950">
              {profile.coins} 🪙
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Gold Coins
            </div>
          </div>
        </div>
      </div>

      {/* Trophies & Achievements Row */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-black text-slate-900">Explorer Medals</h2>
          </div>
          <span className="text-xs font-extrabold text-slate-500">
            {unlockedCount} / {achievements.length} Medals Won
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
                ach.isUnlocked
                  ? 'bg-white border-amber-200 shadow-sm shadow-amber-100'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  ach.isUnlocked ? 'bg-amber-100' : 'bg-slate-200 grayscale'
                }`}
              >
                {ach.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-black text-slate-900 truncate">
                    {ach.title}
                  </div>
                  {ach.isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  )}
                </div>
                <div className="text-xs text-slate-500 font-medium leading-tight">
                  {ach.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sea Sticker Album (All 30 Creatures) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-black text-slate-900">Creature & Wonder Stickers (30)</h2>
          </div>
          <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            {profile.solvedIds.length} / 30 Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {RIDDLES.map((riddle) => {
            const isUnlocked = profile.solvedIds.includes(riddle.id);

            return (
              <button
                key={riddle.id}
                onClick={() => {
                  if (isUnlocked) {
                    sounds.playBubblePop();
                    setSelectedCreature(riddle);
                  }
                }}
                disabled={!isUnlocked}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all duration-200 relative group ${
                  isUnlocked
                    ? 'bg-white hover:bg-sky-50/60 border-sky-100 hover:border-sky-300 shadow-sm cursor-pointer hover:scale-105'
                    : 'bg-slate-50/80 border-slate-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-sky-50 flex items-center justify-center text-3xl mb-2">
                  {isUnlocked ? riddle.emoji : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="text-xs font-black text-slate-900 truncate">
                  {isUnlocked ? riddle.shortAnswer : 'Locked'}
                </div>
                <div className="text-[10px] text-slate-400 font-bold truncate">
                  #{riddle.id}
                </div>

                {isUnlocked && (
                  <span className="absolute top-2 right-2 text-[10px] text-amber-500">
                    ✨
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
