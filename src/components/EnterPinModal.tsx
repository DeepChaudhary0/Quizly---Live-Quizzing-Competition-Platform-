import React, { useState } from 'react';
import { ScreenId } from '../types';

interface EnterPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (pin: string, nickname: string) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const EnterPinModal: React.FC<EnterPinModalProps> = ({ isOpen, onClose, onJoin, onNavigate }) => {
  const [pin, setPin] = useState('489-012');
  const [nickname, setNickname] = useState('StarGazer42');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    onJoin(pin, nickname);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200 border border-outline-variant/50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface-container transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-4 shadow-xs">
          <span className="material-symbols-outlined text-[28px]">pin</span>
        </div>

        <h3 className="text-xl font-bold text-on-surface">Enter Live Game PIN</h3>
        <p className="text-xs text-on-surface-variant mt-1">
          Join a synchronous live tournament, classroom session, or trivia room.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              6-Digit Room Code
            </label>
            <div className="relative">
              <input
                type="text"
                value={pin}
                maxLength={8}
                onChange={(e) => setPin(e.target.value.toUpperCase())}
                placeholder="489 - 012"
                className="w-full h-12 px-4 text-center tracking-widest font-mono text-xl font-bold rounded-xl bg-surface-container-low border border-outline-variant text-primary focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                autoFocus
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-on-surface-variant">Quick rooms:</span>
              <button
                type="button"
                onClick={() => setPin('489-012')}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                489-012 (Astrophysics Live)
              </button>
              <button
                type="button"
                onClick={() => setPin('849-201')}
                className="text-[11px] font-semibold text-primary hover:underline"
              >
                849-201 (Cloud Tech)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5 uppercase tracking-wider">
              Display Nickname
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                badge
              </span>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. AstroExplorer"
                className="w-full h-11 pl-10 pr-4 text-sm rounded-xl bg-surface-container-low border border-outline-variant text-on-surface focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Join Session</span>
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant">
          <span>Are you the host?</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigate('host-dashboard');
            }}
            className="text-primary font-semibold hover:underline cursor-pointer"
          >
            Launch Host Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};
