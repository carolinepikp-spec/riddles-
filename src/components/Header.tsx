import React from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Coins, Map, Gamepad2, SpellCheck, Trophy, PlusCircle } from 'lucide-react';
import { PlayerProfile, AVATARS } from '../data/riddles';

export type GameTab = 'adventure' | 'quiz' | 'spelling' | 'trophies' | 'maker';

interface HeaderProps {
  currentTab: GameTab;
  onSelectTab: (tab: GameTab) => void;
  profile: PlayerProfile;
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenAvatarModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  profile,
  isMuted,
  onToggleSound,
  onOpenAvatarModal,
}) => {
  const currentAvatar = AVATARS.find(a => a.id === profile.avatar) || AVATARS[0];

  const tabs: { id: GameTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'adventure', label: 'Island Quest', icon: <Map className="w-4 h-4 text-emerald-600" /> },
    { id: 'quiz', label: 'Splash Quiz', icon: <Gamepad2 className="w-4 h-4 text-blue-600" /> },
    { id: 'spelling', label: 'Bubble Spell', icon: <SpellCheck className="w-4 h-4 text-purple-600" /> },
    { id: 'trophies', label: 'Treasure Chest', icon: <Trophy className="w-4 h-4 text-yellow-600" /> },
    { id: 'maker', label: 'Make a Riddle', icon: <PlusCircle className="w-4 h-4 text-rose-500" /> },
  ];

  return (
    <header className="relative z-20 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top Banner Row */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('adventure')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
            aria-label="Ocean Riddle Quest Home"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 via-teal-400 to-cyan-300 flex items-center justify-center shadow-md shadow-sky-200/50 group-hover:rotate-6 transition-transform">
              <span className="text-2xl animate-sway">🐬</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-sky-900 tracking-tight">Ocean Riddle Quest</span>
                <span className="hidden sm:inline-block text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                  Kids Edition
                </span>
              </div>
              <p className="text-xs text-sky-600/90 font-semibold hidden sm:block">
                Crack sea mysteries & discover ocean animals!
              </p>
            </div>
          </button>
        </div>

        {/* Player Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Streak indicator */}
          <div
            className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl shadow-2xs"
            title={`Current streak: ${profile.streak} correct in a row!`}
          >
            <Flame className="w-4 h-4 text-orange-500 fill-orange-400 animate-gentle-bounce" />
            <span className="text-sm font-extrabold text-orange-800">{profile.streak}</span>
            <span className="text-xs font-bold text-orange-600 hidden xs:inline">streak</span>
          </div>

          {/* Coin Purse */}
          <div
            className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs"
            title="Gold Coins earned from solving riddles"
          >
            <Coins className="w-4 h-4 text-amber-500 fill-amber-300" />
            <span className="text-sm font-extrabold text-amber-900">{profile.coins}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
            className="w-9 h-9 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center transition-all active:scale-90"
            title={isMuted ? "Sound Off (click to turn on)" : "Sound On"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Profile & Avatar */}
          <button
            onClick={onOpenAvatarModal}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-50 to-teal-50 hover:from-sky-100 hover:to-teal-100 border border-sky-200 px-2.5 py-1.5 rounded-xl transition-all active:scale-95 shadow-2xs"
            title="Change Avatar & Name"
          >
            <span className="text-xl">{currentAvatar.emoji}</span>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black text-sky-950 leading-tight">{profile.name}</div>
              <div className="text-[10px] text-teal-700 font-semibold">{currentAvatar.title}</div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-none pb-2 pt-1">
        <nav className="flex items-center gap-1.5 min-w-max" aria-label="Game Modes">
          {tabs.map(tab => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30 ring-2 ring-sky-300/50'
                    : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50/80'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
