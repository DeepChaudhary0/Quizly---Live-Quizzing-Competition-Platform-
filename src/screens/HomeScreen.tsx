import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenId } from '../types';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onJoinGame: (pin: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onJoinGame }) => {
  const [pinInput, setPinInput] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim()) {
      onJoinGame(pinInput.trim());
    } else {
      onJoinGame('489-012');
    }
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full">
      {/* HERO WRAPPER */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest">
        {/* Subtle Ambient Backdrop Accent */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[480px] bg-gradient-to-b from-primary-fixed/25 via-surface-container/20 to-transparent blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-16 relative z-10">
          {/* Eyebrow Badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low shadow-xs border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
              <span className="text-xs text-on-surface font-semibold tracking-tight">The Open Quiz Platform</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
              <span className="text-xs text-secondary">Over 140,000 players this week</span>
            </div>
          </div>

          {/* Main Headline & Subtitle */}
          <div className="mt-8 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-on-surface tracking-tight font-extrabold leading-tight">
              Create. Schedule. Host. Compete.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Your platform for hosting live quizzes, organizing competitions, and bringing people together through knowledge.
            </p>
          </div>

          {/* Dual Action CTAs + Scheduled link */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('host-dashboard')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>Host a Quiz</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <a
              href="#discover"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface text-sm font-semibold border border-outline-variant shadow-sm transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[20px] text-secondary">explore</span>
              <span>Explore Quizzes</span>
            </a>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate('events-calendar')}
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-surface-tint font-semibold transition-colors cursor-pointer"
            >
              <span>📅 Browse Upcoming Scheduled Events</span>
              <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
            </button>
          </div>

          {/* Quick Join Widget Card */}
          <div className="mt-12 max-w-xl mx-auto">
            <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/60 p-3 sm:p-4">
              <form onSubmit={handleJoinSubmit} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full flex-1">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    pin
                  </span>
                  <input
                    className="w-full h-12 pl-11 pr-4 bg-surface-container-low rounded-xl text-sm font-semibold text-on-surface placeholder:text-outline uppercase tracking-wider focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all font-mono"
                    maxLength={8}
                    placeholder="Enter 6-digit Game PIN"
                    type="text"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.toUpperCase())}
                  />
                </div>
                <button
                  className="w-full sm:w-auto px-6 h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold inline-flex items-center justify-center gap-2 whitespace-nowrap shadow-sm transition-all cursor-pointer"
                  type="submit"
                >
                  <span>Join Session</span>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
              </form>
            </div>
          </div>

          {/* Hero Stats Bar */}
          <div className="mt-16 pt-8 bg-surface-container-low border border-outline-variant/40 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/40">
              <div className="flex flex-col items-center justify-center pt-2 md:pt-0">
                <span className="text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight tabular-nums">50K+</span>
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider mt-1">Quizzes Created</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                <span className="text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight tabular-nums">1.2M</span>
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider mt-1">Answers Submitted</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                <span className="text-3xl lg:text-4xl text-primary font-extrabold tracking-tight tabular-nums">99.9%</span>
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider mt-1">Live Uptime</span>
              </div>
              <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                <div className="flex items-center gap-1">
                  <span className="text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight tabular-nums">4.9</span>
                  <span className="material-symbols-outlined text-amber-500 text-[24px]">star</span>
                </div>
                <span className="text-[11px] text-secondary uppercase font-semibold tracking-wider mt-1">Host Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PUBLIC QUIZZES */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16" id="discover">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-xs text-primary font-semibold uppercase tracking-wider">
              Curated Catalog
            </div>
            <h2 className="mt-2 text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
              Featured Public Quizzes
            </h2>
            <p className="mt-1 text-sm text-secondary">
              Hand-picked trivia, competitive academic bowls, and community challenges live or starting soon.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events-calendar')}
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-surface-tint font-semibold whitespace-nowrap cursor-pointer"
          >
            <span>View All (142)</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* 3-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: LIVE NOW */}
          <article className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/60 transition-all duration-200 overflow-hidden group">
            <div className="relative h-48 w-full overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="Ancient world capitals"
                src={ASSETS.geoCapitals}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>

              {/* Live Indicator Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error text-on-error text-xs shadow-md">
                <span className="w-2 h-2 rounded-full bg-on-error animate-ping"></span>
                <span className="font-bold">LIVE NOW</span>
                <span className="text-on-error/80">• 84 Joined</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-error text-xs">
                <span className="bg-inverse-surface/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">Geography & Travel</span>
                <span className="bg-inverse-surface/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">25 Qs</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs font-medium">
                    Medium
                  </span>
                  <div className="flex items-center gap-1 text-secondary text-xs">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span>
                    <span>Prof. Julian Vance</span>
                  </div>
                </div>
                <h3 className="text-lg text-on-surface font-bold leading-snug line-clamp-2">
                  World Geography & Hidden Capitals Masterclass
                </h3>
              </div>
              <div className="pt-4 flex items-center justify-between bg-surface-container-low rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">groups</span>
                  <span className="text-xs text-on-surface font-semibold">Round 4 in progress</span>
                </div>
                <button
                  onClick={() => onNavigate('live-player')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <span>Join Live</span>
                  <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                </button>
              </div>
            </div>
          </article>

          {/* Card 2: SCHEDULED / IN 2H */}
          <article className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/60 transition-all duration-200 overflow-hidden group">
            <div className="relative h-48 w-full overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="Technology engineering workspace"
                src={ASSETS.webArchitecture}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>

              {/* Starting in 2h Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface text-xs shadow-md font-semibold">
                <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                <span>Starting in 2h</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-error text-xs">
                <span className="bg-inverse-surface/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">Technology</span>
                <span className="bg-inverse-surface/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">30 Qs</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-error-container text-on-error-container text-xs font-medium">
                    Advanced
                  </span>
                  <div className="flex items-center gap-1 text-secondary text-xs">
                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                    <span>DevCommunity Global</span>
                  </div>
                </div>
                <h3 className="text-lg text-on-surface font-bold leading-snug line-clamp-2">
                  Modern Web Architecture & AI Engineering
                </h3>
              </div>
              <div className="pt-4 flex items-center justify-between bg-surface-container-low rounded-xl p-3">
                <div className="flex flex-col">
                  <span className="text-[11px] text-secondary">Today, 7:00 PM EST</span>
                  <span className="text-xs text-on-surface font-semibold">312 Registered</span>
                </div>
                <button
                  onClick={() => onNavigate('event-details')}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold shadow-sm transition-colors border border-outline-variant/60 cursor-pointer"
                >
                  <span>Register</span>
                  <span className="material-symbols-outlined text-[16px]">event_available</span>
                </button>
              </div>
            </div>
          </article>

          {/* Card 3: SELF-PACED */}
          <article className="flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/60 transition-all duration-200 overflow-hidden group">
            <div className="relative h-48 w-full overflow-hidden bg-surface-container">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt="Cinema pop culture studio"
                src={ASSETS.popCultureCinema}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent"></div>

              {/* Self-paced Badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs shadow-md font-semibold">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>Self-Paced</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-error text-xs">
                <span className="bg-inverse-surface/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">Entertainment</span>
                <span className="bg-inverse-surface/70 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-medium">20 Qs</span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container text-xs font-medium">
                    Easy
                  </span>
                  <div className="flex items-center gap-1 text-secondary text-xs">
                    <span className="material-symbols-outlined text-[16px] text-amber-500">stars</span>
                    <span>Trivia Knights</span>
                  </div>
                </div>
                <h3 className="text-lg text-on-surface font-bold leading-snug line-clamp-2">
                  Pop Culture & 90s Cinema Blockbusters
                </h3>
              </div>
              <div className="pt-4 flex items-center justify-between bg-surface-container-low rounded-xl p-3">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-outline text-[18px]">replay</span>
                  <span className="text-xs text-secondary font-medium">1,420 Plays</span>
                </div>
                <button
                  onClick={() => onNavigate('live-player')}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold shadow-sm transition-colors border border-outline-variant/60 cursor-pointer"
                >
                  <span>Start Quiz</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* UPCOMING SCHEDULED QUIZZES */}
      <section className="w-full bg-surface-container-low py-16" id="scheduled-events">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high text-xs text-primary font-semibold uppercase tracking-wider">
                Live Calendar
              </div>
              <h2 className="mt-2 text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
                Upcoming Scheduled Events
              </h2>
              <p className="mt-1 text-sm text-secondary">
                Sync your calendar for synchronized community challenges and prizes.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Today', 'This Weekend', 'Academic', 'Tech'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    activeFilter === tab
                      ? 'bg-primary-container text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest hover:bg-surface-container text-secondary font-medium'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule List Container */}
          <div className="flex flex-col gap-3">
            {/* Scheduled Row 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 text-primary flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase">TOM</span>
                  <span className="text-lg font-extrabold leading-none">15</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[11px] font-semibold">
                      Registration Open
                    </span>
                    <span className="text-secondary text-xs">• Cambridge Science Society</span>
                  </div>
                  <h4 className="mt-1 text-base text-on-surface font-bold">
                    All-University STEM Olympiad Prelims
                  </h4>
                  <p className="text-xs text-secondary mt-0.5">
                    Tomorrow, 3:00 PM UTC • Comprehensive physics, calculus & biochemistry speed questions.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0">
                <div className="flex flex-col text-left lg:text-right">
                  <div className="flex items-center gap-1.5 text-on-surface text-xs font-semibold">
                    <span className="material-symbols-outlined text-outline text-[18px]">airline_seat_recline_normal</span>
                    <span>450 / 500 Seats Filled</span>
                  </div>
                  <div className="w-36 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-primary-container rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('event-details')}
                  className="px-5 h-10 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Reserve Seat
                </button>
              </div>
            </div>

            {/* Scheduled Row 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container text-secondary flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase">FRI</span>
                  <span className="text-lg font-extrabold leading-none">18</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-semibold">
                      Free Entry
                    </span>
                    <span className="text-secondary text-xs">• PixelRevive Club</span>
                  </div>
                  <h4 className="mt-1 text-base text-on-surface font-bold">
                    Retro Gaming & 8-Bit History Showdown
                  </h4>
                  <p className="text-xs text-secondary mt-0.5">
                    Friday, 8:00 PM EST • Console generations, arcade easter eggs, and vintage soundtrack trivia.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0">
                <div className="flex flex-col text-left lg:text-right">
                  <div className="flex items-center gap-1.5 text-on-surface text-xs font-semibold">
                    <span className="material-symbols-outlined text-outline text-[18px]">all_inclusive</span>
                    <span>Open to All (Unlimited)</span>
                  </div>
                  <span className="text-[11px] text-secondary">Broadcasting on Quizly Live</span>
                </div>
                <button
                  onClick={() => toggleReminder('retro')}
                  className={`px-5 h-10 rounded-xl text-xs font-semibold transition-colors shadow-sm inline-flex items-center gap-1.5 cursor-pointer ${
                    reminders['retro']
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                      : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface border border-outline-variant/60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    {reminders['retro'] ? 'check' : 'notifications'}
                  </span>
                  <span>{reminders['retro'] ? 'Reminder Set' : 'Set Reminder'}</span>
                </button>
              </div>
            </div>

            {/* Scheduled Row 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md border border-outline-variant/40 transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold uppercase">OCT</span>
                  <span className="text-lg font-extrabold leading-none">24</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-semibold">
                      Closing Soon
                    </span>
                    <span className="text-secondary text-xs">• Apex Enterprise</span>
                  </div>
                  <h4 className="mt-1 text-base text-on-surface font-bold">
                    Corporate FinTech & Compliance Fast-Track
                  </h4>
                  <p className="text-xs text-secondary mt-0.5">
                    Oct 24, 11:00 AM PST • Certified professional readiness assessment & regulatory laws.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0">
                <div className="flex flex-col text-left lg:text-right">
                  <div className="flex items-center gap-1.5 text-error text-xs font-semibold">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span>95 / 100 Seats (5 left)</span>
                  </div>
                  <div className="w-36 h-1.5 bg-surface-container rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-error rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('event-details')}
                  className="px-5 h-10 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE CATEGORIES */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-xs text-primary font-semibold uppercase tracking-wider">
            Discover Niches
          </div>
          <h2 className="mt-2 text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
            Browse by Categories
          </h2>
          <p className="mt-1 text-sm text-secondary">
            Jump straight into your area of passion or challenge friends in specialized subjects.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'General Knowledge', count: '412 quizzes', icon: 'lightbulb', bg: 'bg-primary-fixed/40 text-primary hover:bg-primary hover:text-on-primary' },
            { title: 'Science & Nature', count: '285 quizzes', icon: 'science', bg: 'bg-tertiary-container/30 text-tertiary hover:bg-tertiary hover:text-on-tertiary' },
            { title: 'Technology', count: '390 quizzes', icon: 'terminal', bg: 'bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary' },
            { title: 'Mathematics', count: '175 quizzes', icon: 'functions', bg: 'bg-surface-container-high text-on-surface-variant hover:bg-inverse-surface hover:text-inverse-on-surface' },
            { title: 'History & Civilizations', count: '220 quizzes', icon: 'account_balance', bg: 'bg-surface-container text-primary hover:bg-primary hover:text-on-primary' },
            { title: 'Sports & Athletics', count: '190 quizzes', icon: 'sports_soccer', bg: 'bg-primary-fixed/30 text-primary hover:bg-primary hover:text-on-primary' },
            { title: 'Movies & TV', count: '310 quizzes', icon: 'movie', bg: 'bg-surface-variant text-on-surface-variant hover:bg-secondary hover:text-on-secondary' },
            { title: 'Higher Education', count: '165 quizzes', icon: 'school', bg: 'bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary' },
          ].map((cat) => (
            <button
              key={cat.title}
              onClick={() => onNavigate('events-calendar')}
              className="p-6 bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md border border-outline-variant/50 transition-all duration-200 flex flex-col items-start justify-between gap-4 group cursor-pointer text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${cat.bg}`}>
                <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              </div>
              <div>
                <h4 className="text-base text-on-surface font-semibold group-hover:text-primary transition-colors">
                  {cat.title}
                </h4>
                <span className="text-xs text-secondary mt-1 block">{cat.count}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* HOW QUIZLY WORKS */}
      <section className="w-full bg-surface-container-low py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-high text-xs text-primary font-semibold uppercase tracking-wider">
              Simplicity First
            </div>
            <h2 className="mt-2 text-2xl lg:text-3xl text-on-surface font-bold tracking-tight">
              How Quizly Works
            </h2>
            <p className="mt-1 text-sm text-secondary">
              Effortless hosting mechanics built for frictionless interaction and real-time engagement.
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/40 flex flex-col justify-between relative">
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-full bg-primary text-on-primary text-lg font-bold flex items-center justify-center shadow-sm">
                  1
                </span>
                <span className="material-symbols-outlined text-outline text-[28px]">edit_note</span>
              </div>
              <div>
                <h3 className="text-lg text-on-surface font-bold mb-2">Create Your Quiz</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Add customizable multiple choice, time limits, and media in minutes using an intuitive builder.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-surface-container-low rounded-xl p-3 flex items-center gap-2 text-secondary text-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                <span>AI question generation supported</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/40 flex flex-col justify-between relative">
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-full bg-primary text-on-primary text-lg font-bold flex items-center justify-center shadow-sm">
                  2
                </span>
                <span className="material-symbols-outlined text-outline text-[28px]">calendar_clock</span>
              </div>
              <div>
                <h3 className="text-lg text-on-surface font-bold mb-2">Host Now or Schedule</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Launch instant real-time rooms with a 6-digit PIN or schedule an event page with automated participant reminders.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-surface-container-low rounded-xl p-3 flex items-center gap-2 text-secondary text-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                <span>Zero app download required</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/40 flex flex-col justify-between relative">
              <div className="flex items-center justify-between mb-6">
                <span className="w-10 h-10 rounded-full bg-primary text-on-primary text-lg font-bold flex items-center justify-center shadow-sm">
                  3
                </span>
                <span className="material-symbols-outlined text-outline text-[28px]">leaderboard</span>
              </div>
              <div>
                <h3 className="text-lg text-on-surface font-bold mb-2">Invite & See Results</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Stream questions live with real-time leaderboards, instant accuracy breakdowns, and full CSV exports.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-surface-container-low rounded-xl p-3 flex items-center gap-2 text-secondary text-xs">
                <span className="material-symbols-outlined text-primary text-[18px]">check</span>
                <span>Deep performance analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL HIGH-IMPACT CTA BANNER */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-14 shadow-lg border border-outline-variant/50 relative overflow-hidden text-center">
          {/* Ambient backdrop circles */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary-fixed/40 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-16 -top-16 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center justify-center p-3 rounded-2xl bg-surface-container text-primary mb-6 shadow-sm">
              <span className="material-symbols-outlined text-[32px]">rocket_launch</span>
            </span>
            <h2 className="text-3xl lg:text-4xl text-on-surface font-extrabold tracking-tight">
              Your next quiz starts here.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-secondary">
              Join thousands of educators, trivia masters, and organizations building engaging knowledge competitions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('quiz-builder')}
                className="w-full sm:w-auto px-8 h-12 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>Create Your First Quiz</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
            <span className="mt-4 text-xs text-outline tracking-wide">
              No credit card required • Instant setup • Free for up to 100 players
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
