import React, { useState } from 'react';
import { AVATARS, PlayerProfile } from '../data/riddles';
import { sounds } from '../utils/audio';

interface AvatarPickerModalProps {
  profile: PlayerProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProfile: (name: string, avatarId: string) => void;
}

export const AvatarPickerModal: React.FC<AvatarPickerModalProps> = ({
  profile,
  isOpen,
  onClose,
  onUpdateProfile,
}) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatar);
  const [name, setName] = useState(profile.name);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playBubblePop();
    onUpdateProfile(name.trim() || 'Captain Coral', selectedAvatarId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-sky-200 shadow-2xl relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-teal-400 text-3xl mx-auto flex items-center justify-center shadow-md mb-2">
            🧭
          </div>
          <h2 className="text-2xl font-black text-slate-900">Your Sailor Profile</h2>
          <p className="text-xs text-slate-500 font-semibold">
            Choose your ocean adventurer & captain name!
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
              Explorer Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name / Pirate Alias"
              maxLength={20}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
              Select Character
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {AVATARS.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => {
                      sounds.playBubblePop();
                      setSelectedAvatarId(avatar.id);
                    }}
                    className={`p-3 rounded-2xl border-2 text-center transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 shadow-sm ring-2 ring-sky-300'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-3xl mb-1">{avatar.emoji}</div>
                    <div className="text-xs font-extrabold text-slate-900 truncate">
                      {avatar.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-sm shadow-md transition-transform active:scale-95"
            >
              Save Explorer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
