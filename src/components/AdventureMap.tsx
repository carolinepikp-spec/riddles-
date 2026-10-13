import React, { useState } from 'react';
import { Lock, Star, CheckCircle, ChevronRight, Play, Award, Compass, Sparkles } from 'lucide-react';
import { ZONES, ZoneInfo, RIDDLES, RiddleItem, PlayerProfile } from '../data/riddles';
import { RiddleCard } from './RiddleCard';
import { sounds } from '../utils/audio';

interface AdventureMapProps {
  profile: PlayerProfile;
  onSolveRiddle: (riddleId: number, coins: number) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  profile,
  onSolveRiddle,
}) => {
  const [activeZone, setActiveZone] = useState<number>(1);
  const [playingRiddle, setPlayingRiddle] = useState<RiddleItem | null>(null);

  // Group riddles by zone
  const zoneRiddles = (zoneId: number) => {
    return RIDDLES.filter(r => r.zoneId === zoneId);
  };

  const getZoneProgress = (zoneId: number) => {
    const riddles = zoneRiddles(zoneId);
    const solvedCount = riddles.filter(r => profile.solvedIds.includes(r.id)).length;
    return {
      solvedCount,
      totalCount: riddles.length,
      isComplete: solvedCount === riddles.length,
    };
  };

  const handleStartRiddle = (riddle: RiddleItem) => {
    sounds.playBubblePop();
    setPlayingRiddle(riddle);
  };

  const handleNextInZone = () => {
    if (!playingRiddle) return;
    const currentList = zoneRiddles(playingRiddle.zoneId);
    const currentIndex = currentList.findIndex(r => r.id === playingRiddle.id);
    if (currentIndex < currentList.length - 1) {
      setPlayingRiddle(currentList[currentIndex + 1]);
    } else {
      // Completed this zone!
      sounds.playFanfare();
      setPlayingRiddle(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Playing Level Modal / Overlay if a level is actively selected */}
      {playingRiddle && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-sm font-extrabold text-white flex items-center gap-1.5 bg-sky-800/80 px-3 py-1 rounded-xl">
                <span>📍 Zone {playingRiddle.zoneId}: {ZONES.find(z => z.id === playingRiddle.zoneId)?.name}</span>
              </span>
              <button
                onClick={() => setPlayingRiddle(null)}
                className="text-white hover:text-amber-200 bg-white/20 hover:bg-white/30 px-3.5 py-1 rounded-xl text-xs font-bold transition-colors"
              >
                ✕ Back to Map
              </button>
            </div>

            <RiddleCard
              riddle={playingRiddle}
              riddleNumber={zoneRiddles(playingRiddle.zoneId).findIndex(r => r.id === playingRiddle.id) + 1}
              totalRiddles={zoneRiddles(playingRiddle.zoneId).length}
              onSolved={(id, coins) => onSolveRiddle(id, coins)}
              onNext={handleNextInZone}
              showNextButton={true}
            />
          </div>
        </div>
      )}

      {/* Hero Map Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-teal-500 to-cyan-500 p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur-xs text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/25">
                Island Adventure
              </span>
              <span className="text-xs font-bold text-sky-100 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                6 Sea Territories
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight mb-2">
              Chart The Seven Seas!
            </h1>
            <p className="text-sm sm:text-base text-sky-50 font-medium leading-relaxed">
              Solve riddles across sandy shores, coral reefs, and the deep blue abyss. Unlock treasure badges and master each zone!
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center min-w-[140px]">
            <div className="text-3xl font-black text-amber-300 mb-0.5">
              {profile.solvedIds.length} / {RIDDLES.length}
            </div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Riddles Solved
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${(profile.solvedIds.length / RIDDLES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/10 rounded-full blur-xl" />
        <div className="absolute right-20 -top-10 w-24 h-24 bg-teal-300/20 rounded-full blur-lg" />
      </div>

      {/* Zone Selector Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {ZONES.map((zone) => {
          const progress = getZoneProgress(zone.id);
          const isUnlocked = zone.id <= profile.unlockedZone;
          const isSelected = activeZone === zone.id;

          return (
            <button
              key={zone.id}
              onClick={() => {
                if (isUnlocked) {
                  sounds.playBubblePop();
                  setActiveZone(zone.id);
                }
              }}
              disabled={!isUnlocked}
              className={`text-left p-3.5 rounded-2xl border-2 transition-all duration-200 relative ${
                isSelected
                  ? 'bg-white border-sky-500 shadow-md shadow-sky-200/50 ring-2 ring-sky-300'
                  : isUnlocked
                  ? 'bg-white/80 hover:bg-white border-sky-100 hover:border-sky-300'
                  : 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{zone.icon}</span>
                {progress.isComplete ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                ) : !isUnlocked ? (
                  <Lock className="w-4 h-4 text-slate-400" />
                ) : (
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
                    {progress.solvedCount}/{progress.totalCount}
                  </span>
                )}
              </div>
              <div className="text-xs font-extrabold text-slate-900 truncate">{zone.name}</div>
              <div className="text-[10px] text-slate-500 font-semibold truncate">Zone {zone.id}</div>
            </button>
          );
        })}
      </div>

      {/* Active Zone Detail & Level Cards */}
      {(() => {
        const currentZone = ZONES.find(z => z.id === activeZone)!;
        const currentZoneRiddles = zoneRiddles(activeZone);
        const progress = getZoneProgress(activeZone);

        return (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-sky-100 mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 to-teal-400 flex items-center justify-center text-3xl shadow-sm">
                  {currentZone.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                      Zone {currentZone.id} of 6
                    </span>
                    {progress.isComplete && (
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Completed!
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black text-slate-950 mt-1">{currentZone.name}</h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">{currentZone.description}</p>
                </div>
              </div>

              {/* Quick Play First Unsolved */}
              {(() => {
                const firstUnsolved = currentZoneRiddles.find(r => !profile.solvedIds.includes(r.id)) || currentZoneRiddles[0];
                return (
                  <button
                    onClick={() => handleStartRiddle(firstUnsolved)}
                    className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold px-5 py-2.5 rounded-2xl shadow-md shadow-sky-600/20 transition-transform active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{progress.isComplete ? 'Replay Zone' : 'Play Next Riddle'}</span>
                  </button>
                );
              })()}
            </div>

            {/* List of 5 Riddles in this zone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentZoneRiddles.map((riddle, index) => {
                const isSolved = profile.solvedIds.includes(riddle.id);

                return (
                  <div
                    key={riddle.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 ${
                      isSolved
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white hover:bg-sky-50/50 border-sky-100 hover:border-sky-300'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-sky-100 shadow-2xs flex items-center justify-center text-xl shrink-0">
                        {isSolved ? riddle.emoji : '❓'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-slate-400">
                            Mystery #{index + 1}
                          </span>
                          {isSolved && (
                            <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md">
                              Solved ✨
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2">
                          "{riddle.riddle}"
                        </p>
                        {isSolved && (
                          <div className="text-xs font-bold text-teal-700 mt-1">
                            Answer: {riddle.answer}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartRiddle(riddle)}
                      className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1 ${
                        isSolved
                          ? 'bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                      }`}
                    >
                      <span>{isSolved ? 'Review' : 'Solve'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
