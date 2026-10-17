import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const SCREENS: { id: ScreenId; label: string; icon: string; num: number }[] = [
  { id: 'home', label: 'Home Landing', icon: 'home', num: 1 },
  { id: 'host-dashboard', label: 'Host Dashboard', icon: 'dashboard', num: 2 },
  { id: 'quiz-builder', label: 'Quiz Builder', icon: 'edit_note', num: 3 },
  { id: 'event-details', label: 'Event Details & RSVP', icon: 'event', num: 4 },
  { id: 'launch-mode', label: 'Choose Hosting Mode', icon: 'rocket_launch', num: 5 },
  { id: 'events-calendar', label: 'Events Calendar', icon: 'calendar_month', num: 6 },
  { id: 'live-player', label: 'Live Player Screen', icon: 'sports_esports', num: 7 },
  { id: 'host-control', label: 'Host Control Room', icon: 'podium', num: 8 },
  { id: 'results-standings', label: 'Results & Standings', icon: 'military_tech', num: 9 },
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({ currentScreen, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentObj = SCREENS.find((s) => s.id === currentScreen) || SCREENS[0];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Expanded Menu */}
      {isOpen && (
        <div className="mb-2 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/60 p-3 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-surface-container">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">layers</span>
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider">All 9 App Screens</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-outline hover:text-on-surface p-1 rounded-md"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
            {SCREENS.map((screen) => {
              const active = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    onNavigate(screen.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all cursor-pointer ${
                    active
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        active ? 'bg-on-primary text-primary' : 'bg-surface-container text-secondary'
                      }`}
                    >
                      {screen.num}
                    </span>
                    <span className="font-medium truncate">{screen.label}</span>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      active ? 'text-on-primary' : 'text-outline'
                    }`}
                  >
                    {screen.icon}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-outline text-center mt-2 pt-2 border-t border-surface-container">
            Click any screen to jump directly to its mockup
          </p>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface shadow-2xl hover:scale-105 transition-all text-xs font-semibold cursor-pointer border border-outline-variant/30"
        title="Quickly jump between all 9 screens"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-fixed"></span>
        </span>
        <span className="truncate max-w-[140px] sm:max-w-none">
          Screen {currentObj.num}: {currentObj.label}
        </span>
        <span className="material-symbols-outlined text-[16px]">
          {isOpen ? 'expand_more' : 'unfold_more'}
        </span>
      </button>
    </div>
  );
};
