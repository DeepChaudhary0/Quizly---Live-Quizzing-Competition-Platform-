import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenId } from '../types';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenPinModal: () => void;
  hostName?: string;
  joinerName?: string;
  onOpenEditNamesModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenPinModal,
  hostName = 'Sarah Jenkins',
  joinerName = 'Alex Rivera',
  onOpenEditNamesModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-outline-variant shadow-sm">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand & Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <img alt="Quizly Logo" className="h-8 w-auto object-contain" src={ASSETS.logo} />
            <span className="text-xl text-on-surface font-bold tracking-tight">Quizly</span>
          </button>

          <nav className="hidden xl:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentScreen === 'home'
                  ? 'bg-surface-container text-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentScreen === 'event-details'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              Discover Quizzes
            </button>

            <button
              onClick={() => onNavigate('events-calendar')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                currentScreen === 'events-calendar'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-medium'
              }`}
            >
              Upcoming Events
              <span className="px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
                Live
              </span>
            </button>

            <button
              onClick={() => onNavigate('results-standings')}
              className={`px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                currentScreen === 'results-standings'
                  ? 'bg-surface-container text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-medium'
              }`}
            >
              Leaderboards
            </button>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search box */}
          <div className="relative hidden md:block w-44 lg:w-56">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              className="w-full h-10 pl-9 pr-8 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors"
              placeholder="Search quiz or tag..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-mono">
              /
            </kbd>
          </div>

          {/* Enter PIN Button */}
          <button
            onClick={onOpenPinModal}
            className="inline-flex items-center justify-center px-3.5 h-10 rounded-full border border-outline-variant bg-surface-container-lowest hover:bg-surface-container text-on-surface text-sm font-semibold transition-colors gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-outline text-[18px]">pin</span>
            <span>Enter PIN</span>
          </button>

          {/* Host a Quiz Button */}
          <button
            onClick={() => onNavigate('host-dashboard')}
            className="inline-flex items-center justify-center px-4 h-10 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold transition-colors gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span className="hidden sm:inline">Host a Quiz</span>
            <span className="sm:hidden">Host</span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 border-l border-outline-variant focus:outline-none cursor-pointer"
            >
              <img
                alt="Sarah Jenkins Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent hover:ring-primary/20 transition-all"
                src={ASSETS.sarahAvatar}
              />
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs text-on-surface font-semibold leading-tight truncate max-w-[120px]">{hostName}</span>
                <span className="text-[11px] text-on-surface-variant leading-tight">Host Profile</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 top-12 w-60 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/60 py-2 z-50 flex flex-col">
                <div className="px-4 py-2.5 border-b border-surface-container flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <p className="text-xs font-bold text-on-surface truncate max-w-[140px]">{hostName}</p>
                    </div>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">Player Nickname: <strong className="text-primary font-semibold">{joinerName}</strong></p>
                  </div>
                  {onOpenEditNamesModal && (
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenEditNamesModal();
                      }}
                      className="p-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors cursor-pointer"
                      title="Edit Host & Joiner Names"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  )}
                </div>

                {onOpenEditNamesModal && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onOpenEditNamesModal();
                    }}
                    className="px-4 py-2 text-xs text-left text-primary hover:bg-primary/10 transition-colors flex items-center gap-2 font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">badge</span>
                    Edit Host & Joiner Names
                  </button>
                )}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('host-dashboard');
                  }}
                  className="px-4 py-2 text-xs text-left text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">dashboard</span>
                  Host Dashboard
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('quiz-builder');
                  }}
                  className="px-4 py-2 text-xs text-left text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">add_circle</span>
                  Create New Quiz
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('host-control');
                  }}
                  className="px-4 py-2 text-xs text-left text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">podium</span>
                  Live Control Room
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('live-player');
                  }}
                  className="px-4 py-2 text-xs text-left text-on-surface hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-tertiary">sports_esports</span>
                  Player View Simulation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
