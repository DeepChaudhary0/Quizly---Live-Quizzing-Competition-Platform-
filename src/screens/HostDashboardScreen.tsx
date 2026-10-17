import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenId } from '../types';

interface HostDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLaunchInstant: () => void;
  hostName?: string;
  onUpdateHostName?: (name: string) => void;
}

export const HostDashboardScreen: React.FC<HostDashboardScreenProps> = ({
  onNavigate,
  onLaunchInstant,
  hostName = 'Sarah Jenkins',
  onUpdateHostName,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'live' | 'drafts' | 'completed'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isEditingHost, setIsEditingHost] = useState(false);
  const [tempHost, setTempHost] = useState(hostName);

  const handleSaveHostName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempHost.trim() && onUpdateHostName) {
      onUpdateHostName(tempHost.trim());
    }
    setIsEditingHost(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText('https://quizly.app/@sarahjenkins');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Interactive & Notification Floating Notice Banner */}
      <div className="w-full bg-surface-container-low px-6 lg:px-12 py-3 flex items-center justify-between gap-4 border-b border-outline-variant/40">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary"></span>
          </span>
          <p className="text-xs sm:text-sm text-on-surface truncate">
            <span className="font-semibold text-primary">Live Quiz Active:</span> "Weekly Tech Trivia: Cloud & Distributed Systems" has 48 participants waiting in lobby.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('host-control')}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-on-primary text-xs font-semibold rounded-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            <span>Enter Room</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 flex flex-col gap-8">
        {/* 1. Header Greeting & Primary Action Surface */}
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm border border-outline-variant/50 relative overflow-hidden">
          {/* Ambient decorative gradient wash */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary-fixed opacity-30 blur-3xl pointer-events-none"></div>

          <div className="flex flex-col gap-1 z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                Host Level 4 Verified
              </span>
              <span className="text-outline text-xs">•</span>
              <span className="text-outline text-xs">sarah@academiacoding.org</span>
            </div>
            <div className="flex items-center gap-2">
              {isEditingHost ? (
                <form onSubmit={handleSaveHostName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempHost}
                    onChange={(e) => setTempHost(e.target.value)}
                    className="text-2xl sm:text-3xl font-extrabold text-on-surface bg-surface-container px-2 py-0.5 rounded-xl border border-primary focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-hover shadow-xs"
                    title="Save Host Name"
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTempHost(hostName);
                      setIsEditingHost(false);
                    }}
                    className="p-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </form>
              ) : (
                <h1 className="text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight flex items-center gap-2 group">
                  <span>Welcome back, {hostName}! 👋</span>
                  <button
                    onClick={() => {
                      setTempHost(hostName);
                      setIsEditingHost(true);
                    }}
                    className="opacity-60 group-hover:opacity-100 p-1.5 rounded-xl hover:bg-surface-container text-primary transition-all text-xs flex items-center gap-1 cursor-pointer"
                    title="Edit Host Name"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                    <span className="text-xs font-medium hidden sm:inline">Edit Name</span>
                  </button>
                </h1>
              )}
            </div>
            <p className="text-sm text-on-surface-variant">
              Here is what is happening across your hosted quiz rooms and upcoming scheduled sessions.
            </p>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-wrap items-center gap-3 z-10 flex-shrink-0">
            {/* Quick Host Now */}
            <button
              onClick={() => onNavigate('host-control')}
              className="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-semibold transition-colors gap-2 shadow-xs cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <span>Quick Host</span>
            </button>

            {/* Schedule Quiz */}
            <button
              onClick={() => onNavigate('launch-mode')}
              className="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm font-semibold border border-outline-variant/60 shadow-xs transition-colors gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-outline text-[18px]">calendar_today</span>
              <span>Schedule Quiz</span>
            </button>

            {/* Create Quiz (Primary Blue) */}
            <button
              onClick={() => onNavigate('quiz-builder')}
              className="inline-flex items-center justify-center px-5 h-10 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold transition-all shadow-md hover:shadow-lg gap-2 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>Create Quiz</span>
            </button>
          </div>
        </section>

        {/* 2. Metric Summary Cards (4-column grid) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Quizzes */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Quizzes</span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-on-surface font-extrabold leading-none tabular-nums">24</span>
                <span className="inline-flex items-center text-tertiary text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>+3 this mo
                </span>
              </div>
              <span className="text-xs text-outline mt-1">Across 6 topic categories</span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>

          {/* Card 2: Upcoming Sessions */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Upcoming Sessions</span>
              <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">event</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-on-surface font-extrabold leading-none tabular-nums">5</span>
                <span className="text-xs text-secondary font-semibold">180 RSVPs</span>
              </div>
              <span className="text-xs text-on-surface-variant mt-1 flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                Next: Tomorrow, 2:00 PM
              </span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '52%' }}></div>
            </div>
          </div>

          {/* Card 3: Active Live Sessions */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Active Live Sessions</span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                1 Room Live
              </span>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-tertiary font-extrabold leading-none tabular-nums">1</span>
                <span className="text-xs text-on-surface-variant font-medium">48 in lobby</span>
              </div>
              <span className="text-xs text-on-surface-variant mt-1 truncate">Cloud & Systems Trivia</span>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-tertiary-container h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Card 4: Total Participants */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Participants</span>
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">groups</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-on-surface font-extrabold leading-none tabular-nums">3,840</span>
                <span className="text-xs text-tertiary font-semibold">+18% MoM</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3"></circle>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeDasharray="62.8" strokeDashoffset="15" strokeLinecap="round" strokeWidth="3"></circle>
                </svg>
                <span>Avg. accuracy 76%</span>
              </div>
            </div>
            <div className="w-full bg-surface-container h-1 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '76%' }}></div>
            </div>
          </div>
        </section>

        {/* Main Workspace Layout: 8-col list + 4-col host toolkit sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3. Quiz Management Hub (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Tab Navigation & Quick Filter Strip */}
            <div className="bg-surface-container-lowest p-2 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <nav className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'all'
                      ? 'bg-surface-container text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  All Quizzes <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px]">24</span>
                </button>
                <button
                  onClick={() => setActiveTab('scheduled')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'scheduled'
                      ? 'bg-surface-container text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  Scheduled <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">5</span>
                </button>
                <button
                  onClick={() => setActiveTab('live')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'live'
                      ? 'bg-surface-container text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  Live Now <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px]">1</span>
                </button>
                <button
                  onClick={() => setActiveTab('drafts')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'drafts'
                      ? 'bg-surface-container text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  Drafts <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">4</span>
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === 'completed'
                      ? 'bg-surface-container text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  Completed <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">14</span>
                </button>
              </nav>
              <span className="text-outline text-xs self-center hidden sm:inline pr-2">Showing 5 of 24</span>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  search
                </span>
                <input
                  className="w-full h-10 pl-9 pr-4 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Filter by title, tag, or PIN..."
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <select className="h-10 pl-3 pr-8 bg-surface-container-low rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-outline-variant/40">
                  <option value="all">All Categories</option>
                  <option value="tech">Tech & Engineering</option>
                  <option value="education">Education & Science</option>
                  <option value="entertainment">Film & Pop Culture</option>
                  <option value="history">History</option>
                </select>
                <select className="h-10 pl-3 pr-8 bg-surface-container-low rounded-xl text-xs font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer border border-outline-variant/40">
                  <option value="updated">Recently updated</option>
                  <option value="scheduled">Soonest scheduled</option>
                  <option value="participants">Participant count</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Active Quiz List Cards */}
            <div className="flex flex-col gap-3">
              {/* Entry 1: LIVE NOW */}
              {(activeTab === 'all' || activeTab === 'live') && (
                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/50 transition-shadow flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tertiary"></div>
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pl-2">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-semibold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                          LIVE NOW
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">
                          Tech & Dev
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] font-semibold tracking-wide font-mono">
                          PIN: 849-201
                        </span>
                      </div>
                      <h3 className="text-base text-on-surface font-bold tracking-tight mt-1 group-hover:text-primary transition-colors">
                        Weekly Tech Trivia: Cloud & Distributed Systems
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-on-surface-variant text-xs mt-0.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-tertiary">
                          <span className="material-symbols-outlined text-[16px]">groups</span> 48 Active Players in room
                        </span>
                        <span>•</span>
                        <span>25 Questions</span>
                        <span>•</span>
                        <span>Lobby open 12m ago</span>
                      </div>
                    </div>

                    {/* Action buttons for live session */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                      <button
                        onClick={() => onNavigate('host-control')}
                        className="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-sm transition-all gap-1.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">podium</span>
                        <span>Host Control Room</span>
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                        title="Share Session Link"
                      >
                        <span className="material-symbols-outlined text-[18px]">share</span>
                      </button>
                    </div>
                  </div>

                  {/* Mini Live Progress Indicator */}
                  <div className="ml-2 flex items-center justify-between gap-4 bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/30">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-on-surface-variant">Host Status:</span>
                      <span className="text-xs text-tertiary font-semibold">Broadcasting Screen Ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-outline">Lobby Health</span>
                      <span className="text-xs text-tertiary font-medium">99.8% Sync</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Entry 2: Scheduled Event (High School Biology) */}
              {(activeTab === 'all' || activeTab === 'scheduled') && (
                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col gap-4 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">event</span>
                          Scheduled
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">
                          Education
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">
                          Public Visibility
                        </span>
                      </div>
                      <h3 className="text-base text-on-surface font-bold tracking-tight mt-1 group-hover:text-primary transition-colors">
                        High School Biology Finals Prep: Cellular Respiration
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-on-surface-variant text-xs mt-0.5">
                        <span className="inline-flex items-center gap-1 text-primary font-medium">
                          <span className="material-symbols-outlined text-[16px]">schedule</span> Tomorrow, Oct 18 • 2:00 PM EDT
                        </span>
                        <span>•</span>
                        <span>30 Questions</span>
                        <span>•</span>
                        <span className="font-semibold text-on-surface">62 Registered students</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                      <button
                        onClick={() => onNavigate('host-control')}
                        className="inline-flex items-center justify-center px-3.5 h-9 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors gap-1 shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        <span>Launch Early</span>
                      </button>
                      <button
                        onClick={() => onNavigate('launch-mode')}
                        className="inline-flex items-center justify-center px-3 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium transition-colors cursor-pointer"
                      >
                        Edit Schedule
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-on-surface-variant text-xs pt-1 bg-surface-bright px-3 py-2 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5 overflow-hidden">
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest bg-surface-container flex items-center justify-center text-[10px] text-primary font-bold">A</div>
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest bg-secondary-container flex items-center justify-center text-[10px] text-secondary font-bold">R</div>
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container-lowest bg-tertiary-fixed flex items-center justify-center text-[10px] text-tertiary font-bold">M</div>
                      </div>
                      <span className="text-xs">Joined by Apex Academy & St. Jude Prep</span>
                    </div>
                    <button
                      onClick={() => onNavigate('event-details')}
                      className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      View Public Page <span className="material-symbols-outlined text-[14px]">launch</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Entry 3: Scheduled Event (Film Buffs) */}
              {(activeTab === 'all' || activeTab === 'scheduled') && (
                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col gap-4 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">event</span>
                          Scheduled
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">
                          Entertainment
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px]">
                          59% Capacity Full
                        </span>
                      </div>
                      <h3 className="text-base text-on-surface font-bold tracking-tight mt-1 group-hover:text-primary transition-colors">
                        Friday Night Film Buffs: Hitchcock to Nolan
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-on-surface-variant text-xs mt-0.5">
                        <span className="inline-flex items-center gap-1 text-primary font-medium">
                          <span className="material-symbols-outlined text-[16px]">schedule</span> Oct 20, 8:00 PM EDT
                        </span>
                        <span>•</span>
                        <span>20 Questions</span>
                        <span>•</span>
                        <span className="font-semibold text-on-surface">118 RSVPs / Max 200</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                      <button
                        onClick={() => onNavigate('host-control')}
                        className="inline-flex items-center justify-center px-3.5 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        <span>Host Now</span>
                      </button>
                      <button
                        onClick={() => onNavigate('launch-mode')}
                        className="inline-flex items-center justify-center px-3 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium transition-colors cursor-pointer"
                      >
                        Edit Schedule
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Entry 4: Draft (AP European History) */}
              {(activeTab === 'all' || activeTab === 'drafts') && (
                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col gap-4 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">edit_note</span>
                          Draft
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">
                          History
                        </span>
                      </div>
                      <h3 className="text-base text-on-surface font-bold tracking-tight mt-1 group-hover:text-primary transition-colors">
                        AP European History: Industrial Revolution & Aftermath
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-on-surface-variant text-xs mt-0.5">
                        <span className="text-on-surface font-medium">18 of 25 Questions written</span>
                        <span>•</span>
                        <span>Last edited 2 hours ago</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                      <button
                        onClick={() => onNavigate('quiz-builder')}
                        className="inline-flex items-center justify-center px-4 h-9 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold transition-colors gap-1 shadow-sm cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>Continue Editing</span>
                      </button>
                      <button
                        onClick={() => onNavigate('live-player')}
                        className="inline-flex items-center justify-center px-3 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium transition-colors cursor-pointer"
                      >
                        Preview
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-surface-bright p-3 rounded-xl border border-outline-variant/30">
                    <span className="text-xs text-outline flex-shrink-0 font-medium">Completion: 72%</span>
                    <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                      <div className="bg-primary-container h-full rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Entry 5: Completed (JavaScript Fundamentals) */}
              {(activeTab === 'all' || activeTab === 'completed') && (
                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col gap-4 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-tertiary">check_circle</span>
                          Completed
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">
                          Tech
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px]">
                          92 Finished
                        </span>
                      </div>
                      <h3 className="text-base text-on-surface font-bold tracking-tight mt-1 group-hover:text-primary transition-colors">
                        JavaScript Fundamentals & Async Mastery
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-on-surface-variant text-xs mt-0.5">
                        <span>Hosted on Oct 12</span>
                        <span>•</span>
                        <span>92 Participants</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-on-surface font-semibold">
                          <span className="material-symbols-outlined text-[16px] text-amber-500">emoji_events</span> Winner: @alex_codes (98%)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-center mt-2 sm:mt-0">
                      <button
                        onClick={() => onNavigate('results-standings')}
                        className="inline-flex items-center justify-center px-3.5 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold transition-colors gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">analytics</span>
                        <span>View Analytics</span>
                      </button>
                      <button
                        onClick={() => alert('Exporting participant responses as CSV...')}
                        className="inline-flex items-center justify-center px-3 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium transition-colors gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">file_download</span>
                        <span>CSV</span>
                      </button>
                      <button
                        onClick={() => onNavigate('launch-mode')}
                        className="inline-flex items-center justify-center px-3 h-9 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-medium transition-colors gap-1 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">replay</span>
                        <span>Host Again</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination Bar */}
            <div className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40">
              <span className="text-xs text-outline pl-2">Showing 1 to 5 of 24 quizzes</span>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg bg-surface-container text-outline flex items-center justify-center opacity-50 cursor-not-allowed">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center justify-center cursor-pointer">
                  1
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs flex items-center justify-center cursor-pointer">
                  2
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs flex items-center justify-center cursor-pointer">
                  3
                </button>
                <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4. Host Toolkit & Quick Panels (Right 4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            {/* Live Quick Host Launcher Card */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h4 className="text-base text-on-surface font-bold">Instant PIN Launcher</h4>
                <span className="material-symbols-outlined text-primary text-[22px]">flash_on</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Need an on-the-spot trivia battle? Generate a room code immediately with random bank questions.
              </p>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-outline uppercase font-semibold">Select Subject Bank</label>
                <select className="w-full h-10 px-3 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Mixed General Knowledge (20 Qs)</option>
                  <option>Web Development Essentials (15 Qs)</option>
                  <option>Pop Culture & Music (25 Qs)</option>
                  <option>World Geography & Flags (15 Qs)</option>
                </select>
              </div>
              <button
                onClick={onLaunchInstant}
                className="w-full h-11 bg-primary text-on-primary rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-md cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">sensors</span>
                <span>Launch Instant Room</span>
              </button>
            </div>

            {/* Share Host Profile Panel */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover shadow-xs flex-shrink-0"
                  alt="Sarah Jenkins portrait"
                  src={ASSETS.sarahPortrait}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm text-on-surface font-bold truncate">Sarah Jenkins</span>
                  <span className="text-xs text-outline truncate">Trivia Master & Educator</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-on-surface-variant font-medium">Public Channel Link:</span>
                <div className="flex items-center gap-1.5 p-1.5 bg-surface-container-low rounded-xl border border-outline-variant/30">
                  <span className="text-xs text-primary font-mono truncate pl-2 flex-1 select-all">
                    quizly.app/@sarahjenkins
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold shadow-xs transition-colors flex-shrink-0 cursor-pointer"
                  >
                    {copiedLink ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-[11px] text-outline mt-0.5">Players can subscribe to get notified when you schedule games.</p>
              </div>
            </div>

            {/* Host Checklist: Smooth Live Competition Tips */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">checklist</span>
                <h4 className="text-base text-on-surface font-bold">Host Checklist</h4>
              </div>
              <p className="text-xs text-on-surface-variant">
                3 rapid tips for running smooth, high-energy live competitions:
              </p>
              <div className="flex flex-col gap-2.5">
                {/* Tip 1 */}
                <div className="flex items-start gap-2.5 p-3 bg-surface-bright rounded-xl border border-outline-variant/30">
                  <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-on-surface font-semibold">Test Projector / Dual Monitor</span>
                    <span className="text-[11px] text-outline">Open Host Screen on screen 1, Control Room view on screen 2.</span>
                  </div>
                </div>
                {/* Tip 2 */}
                <div className="flex items-start gap-2.5 p-3 bg-surface-bright rounded-xl border border-outline-variant/30">
                  <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-on-surface font-semibold">Lock PIN 60s After Start</span>
                    <span className="text-[11px] text-outline">Keeps scoreboard calculations fair and prevents late ping delays.</span>
                  </div>
                </div>
                {/* Tip 3 */}
                <div className="flex items-start gap-2.5 p-3 bg-surface-bright rounded-xl border border-outline-variant/30">
                  <div className="w-5 h-5 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-on-surface font-semibold">Enable Podium Celebration</span>
                    <span className="text-[11px] text-outline">Confetti effect increases player retention by over 34%.</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert('Opening Complete Live Hosting Playbook...')}
                className="text-xs text-primary hover:underline font-semibold inline-flex items-center gap-1 self-start pt-1 cursor-pointer"
              >
                <span>Read Complete Live Hosting Playbook</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            {/* Host Performance Stat Card */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-semibold">Host Reputation</span>
                <span className="text-tertiary text-xs font-bold">Top 5% Creator</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    ></path>
                    <path
                      className="text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="96, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    ></path>
                  </svg>
                  <span className="absolute text-base font-bold text-on-surface">4.9</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface font-semibold">512 Ratings</span>
                  <span className="text-[11px] text-outline">"Clear timers and great questions!"</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
