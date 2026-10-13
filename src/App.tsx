/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PlayerProfile, RIDDLES, ZONES } from './data/riddles';
import { Header, GameTab } from './components/Header';
import { BackgroundBubbles } from './components/BackgroundBubbles';
import { AdventureMap } from './components/AdventureMap';
import { SplashQuizMode } from './components/SplashQuizMode';
import { BubbleSpellingMode } from './components/BubbleSpellingMode';
import { StorybookExplorer } from './components/StorybookExplorer';
import { TrophyChest } from './components/TrophyChest';
import { RiddleMaker, CustomRiddle } from './components/RiddleMaker';
import { AvatarPickerModal } from './components/AvatarPickerModal';
import { sounds } from './utils/audio';

const STORAGE_KEY_PROFILE = 'ocean_riddle_quest_profile_v1';
const STORAGE_KEY_CUSTOM = 'ocean_riddle_quest_custom_v1';

const defaultProfile: PlayerProfile = {
  name: 'Captain Coral',
  avatar: 'captain',
  coins: 50,
  unlockedZone: 1,
  solvedIds: [],
  starredIds: [],
  streak: 0,
  highestStreak: 0,
  badgesUnlocked: ['first_arrival'],
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<GameTab>('adventure');
  const [profile, setProfile] = useState<PlayerProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) {
        return { ...defaultProfile, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  const [customRiddles, setCustomRiddles] = useState<CustomRiddle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  // Sync custom riddles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(customRiddles));
    } catch {
      // ignore
    }
  }, [customRiddles]);

  const handleToggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleRiddleSolved = (riddleId: number, earnedCoins: number) => {
    setProfile(prev => {
      const alreadySolved = prev.solvedIds.includes(riddleId);
      const newSolvedIds = alreadySolved ? prev.solvedIds : [...prev.solvedIds, riddleId];
      const newStreak = prev.streak + 1;
      const newHighestStreak = Math.max(prev.highestStreak, newStreak);
      const newCoins = prev.coins + earnedCoins;

      // Check zone unlocks:
      // If player has solved at least 3 riddles in their currently highest unlocked zone, unlock next zone
      let nextUnlockedZone = prev.unlockedZone;
      const currentZoneRiddles = RIDDLES.filter(r => r.zoneId === prev.unlockedZone);
      const solvedInCurrentZone = currentZoneRiddles.filter(r => newSolvedIds.includes(r.id)).length;

      if (solvedInCurrentZone >= 3 && nextUnlockedZone < ZONES.length) {
        nextUnlockedZone = prev.unlockedZone + 1;
      }

      return {
        ...prev,
        coins: newCoins,
        solvedIds: newSolvedIds,
        streak: newStreak,
        highestStreak: newHighestStreak,
        unlockedZone: nextUnlockedZone,
      };
    });
  };

  const handleToggleStar = (riddleId: number) => {
    setProfile(prev => {
      const exists = prev.starredIds.includes(riddleId);
      return {
        ...prev,
        starredIds: exists
          ? prev.starredIds.filter(id => id !== riddleId)
          : [...prev.starredIds, riddleId],
      };
    });
  };

  const handleUpdateProfile = (name: string, avatarId: string) => {
    setProfile(prev => ({
      ...prev,
      name,
      avatar: avatarId,
    }));
  };

  const handleSaveCustomRiddle = (newRiddle: CustomRiddle) => {
    setCustomRiddles(prev => [newRiddle, ...prev]);
    // Reward coins for creativity!
    setProfile(prev => ({
      ...prev,
      coins: prev.coins + 25,
    }));
  };

  const handleDeleteCustomRiddle = (id: string) => {
    setCustomRiddles(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-teal-50/40 to-blue-100/50 text-slate-800 flex flex-col relative selection:bg-sky-200">
      {/* Gentle floating bubbles background */}
      <BackgroundBubbles />

      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          sounds.playBubblePop();
          setCurrentTab(tab);
        }}
        profile={profile}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onOpenAvatarModal={() => setIsAvatarModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 pb-16">
        {currentTab === 'adventure' && (
          <AdventureMap
            profile={profile}
            onSolveRiddle={handleRiddleSolved}
          />
        )}

        {currentTab === 'quiz' && (
          <SplashQuizMode
            onRiddleSolved={handleRiddleSolved}
            streak={profile.streak}
          />
        )}

        {currentTab === 'spelling' && (
          <BubbleSpellingMode
            onRiddleSolved={handleRiddleSolved}
            solvedIds={profile.solvedIds}
          />
        )}

        {currentTab === 'storybook' && (
          <StorybookExplorer
            starredIds={profile.starredIds}
            onToggleStar={handleToggleStar}
            solvedIds={profile.solvedIds}
          />
        )}

        {currentTab === 'trophies' && (
          <TrophyChest
            profile={profile}
          />
        )}

        {currentTab === 'maker' && (
          <RiddleMaker
            customRiddles={customRiddles}
            onSaveRiddle={handleSaveCustomRiddle}
            onDeleteRiddle={handleDeleteCustomRiddle}
          />
        )}
      </main>

      {/* Avatar Customization Modal */}
      <AvatarPickerModal
        profile={profile}
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onUpdateProfile={handleUpdateProfile}
      />

      {/* Child-Friendly Footer */}
      <footer className="relative z-10 border-t border-sky-100 bg-white/70 backdrop-blur-xs py-6 text-center text-xs text-slate-500 font-semibold">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sky-800">
            <span className="text-lg">🌊</span>
            <span className="font-bold">Ocean Riddle Quest</span>
            <span>·</span>
            <span>Explore, Learn & Splash!</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>30 Original Ocean Riddles</span>
            <span>·</span>
            <button
              onClick={() => {
                sounds.playBubblePop();
                setCurrentTab('storybook');
              }}
              className="hover:text-sky-700 transition-colors underline"
            >
              Riddle Library
            </button>
            <span>·</span>
            <button
              onClick={() => {
                sounds.playBubblePop();
                setCurrentTab('trophies');
              }}
              className="hover:text-sky-700 transition-colors underline"
            >
              Badge Chest
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
