import React from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenId } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 border-b border-outline-variant/60">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img alt="Quizly Logo" className="h-7 w-auto object-contain" src={ASSETS.logo} />
              <span className="text-xl text-on-surface font-bold tracking-tight">Quizly</span>
            </div>
            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
              Interactive public trivia hosting, real-time live events, and competitive community scheduling platform.
            </p>
          </div>

          <div>
            <h4 className="text-sm text-on-surface font-semibold mb-3">Product</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Discover
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events-calendar')}
                  className="text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('host-dashboard')}
                  className="text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Host Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('results-standings')}
                  className="text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Leaderboards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('live-player')}
                  className="text-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                >
                  Mobile App & Player
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-on-surface font-semibold mb-3">Community</h4>
            <ul className="space-y-2">
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">College Clubs</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Trivia Hosts</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Education</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Corporate Training</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-on-surface font-semibold mb-3">Resources</h4>
            <ul className="space-y-2">
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Host Guide</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">FAQ</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">API</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">System Status</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-on-surface font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Terms</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Privacy</li>
              <li className="text-xs text-on-surface-variant hover:text-on-surface cursor-pointer">Guidelines</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-on-surface-variant">© 2025 Quizly Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px] hover:text-on-surface cursor-pointer">public</span>
            <span className="material-symbols-outlined text-[20px] hover:text-on-surface cursor-pointer">forum</span>
            <span className="material-symbols-outlined text-[20px] hover:text-on-surface cursor-pointer">mail</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
