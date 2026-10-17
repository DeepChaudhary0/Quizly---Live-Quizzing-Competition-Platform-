import React, { useState } from 'react';
import { ASSETS, MOCK_EVENTS } from '../data/mockData';
import { ScreenId } from '../types';

interface EventsCalendarScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectEvent: (eventId: string) => void;
  onJoinGame: (pin: string) => void;
}

export const EventsCalendarScreen: React.FC<EventsCalendarScreenProps> = ({
  onNavigate,
  onSelectEvent,
  onJoinGame,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredIds, setRegisteredIds] = useState<string[]>(['ev-1']);

  const categories = ['All', 'History & Geo', 'Science & Tech', 'Pop Culture', 'Arts & Design', 'Literature'];

  const filteredEvents = MOCK_EVENTS.filter((ev) => {
    const matchesCategory = selectedCategory === 'All' || ev.category.toLowerCase().includes(selectedCategory.toLowerCase()) || (selectedCategory === 'History & Geo' && ev.category.includes('History'));
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.organizer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleRegister = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (registeredIds.includes(id)) {
      setRegisteredIds(registeredIds.filter((item) => item !== id));
    } else {
      setRegisteredIds([...registeredIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-24">
      {/* Top Hero / Header */}
      <div className="bg-gradient-to-b from-surface-container-high/60 via-surface to-surface border-b border-outline-variant/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Official Tournaments & Live Streams
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight">
                Public Events Schedule
              </h1>
              <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl mt-2 leading-relaxed">
                Compete with players worldwide in verified live sessions, qualify for seasonal leaderboards, and win platform trophies.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('quiz-builder')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-hover transition-all"
              >
                <span className="material-symbols-outlined text-lg">add_circle</span>
                Schedule New Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Featured Mega Event Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-indigo-500/30 group">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/90 text-white uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  Headliner Live Special
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-white/90">
                  Starts in 1h 24m
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                The Great Ancient History & Civilization Championship
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                25 immersive questions across Mesopotamian dynasties, Roman architecture, and ancient Silk Road trade. $500 community prize pool and verified scholar badge.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <img
                    src={ASSETS.avatars.julian}
                    alt="Julian Martinez"
                    className="w-7 h-7 rounded-full border border-white/20"
                  />
                  <span>Host: <strong className="text-white">Julian Martinez</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-amber-400">schedule</span>
                  <span>Today, 7:00 PM EST</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-emerald-400">group</span>
                  <span>186 / 250 Registered</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    onSelectEvent('ev-1');
                    onNavigate('event-details');
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">event_available</span>
                  Reserve Free Seat
                </button>
                <button
                  onClick={() => onJoinGame('749204')}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm transition-all flex items-center gap-2 border border-white/10"
                >
                  <span className="material-symbols-outlined text-lg">login</span>
                  Fast-Pass Entry (PIN 749-204)
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src={ASSETS.heroes.ancientCapitals}
                  alt="Ancient Capitals"
                  className="w-full h-56 object-cover"
                />
                <div className="bg-slate-900/90 p-4 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Prize Pool:</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">trophy</span> $500 + Custom Trophy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 border border-outline-variant/30 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search events by title, topic, or host..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-surface-container border border-outline-variant/30 text-sm focus:outline-none focus:border-primary text-on-surface placeholder:text-on-surface-variant/70"
              />
            </div>

            {/* Timeframe Tabs */}
            <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-2 overflow-x-auto pb-1 md:pb-0">
              {(
                [
                  { id: 'all', label: 'All Dates' },
                  { id: 'today', label: 'Today' },
                  { id: 'week', label: 'This Week' },
                  { id: 'month', label: 'This Month' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTimeframe(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedTimeframe === tab.id
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-outline-variant/20 scrollbar-none">
            <span className="text-xs font-semibold text-on-surface-variant whitespace-nowrap mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary/10 text-primary border border-primary/30'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">
            <span>Showing {filteredEvents.length} Scheduled Events</span>
            <span className="text-primary cursor-pointer hover:underline">Timezone: UTC-4 (Eastern Time)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isRegistered = registeredIds.includes(event.id);
              const percentage = Math.round((event.registeredCount / event.maxSeats) * 100);

              return (
                <div
                  key={event.id}
                  onClick={() => {
                    onSelectEvent(event.id);
                    onNavigate('event-details');
                  }}
                  className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Thumbnail / Header Banner */}
                  <div className="relative h-44 overflow-hidden bg-surface-container">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 text-slate-900 shadow-sm">
                        {event.category}
                      </span>
                      {event.isLive && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                          LIVE NOW
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-xs font-medium text-amber-300 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-1.5 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Organizer & Capacity */}
                    <div className="space-y-3 pt-3 border-t border-outline-variant/20">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={event.organizer.avatar}
                            alt={event.organizer.name}
                            className="w-6 h-6 rounded-full object-cover border border-outline-variant/30"
                          />
                          <span className="font-semibold text-on-surface truncate max-w-[120px]">
                            {event.organizer.name}
                          </span>
                        </div>
                        <span className="text-on-surface-variant text-[11px]">
                          {event.questionCount} Questions
                        </span>
                      </div>

                      {/* Capacity Bar */}
                      <div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-on-surface-variant">Seats Reserved</span>
                          <span className="font-bold text-on-surface">
                            {event.registeredCount} / {event.maxSeats} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              percentage > 85 ? 'bg-rose-500' : 'bg-primary'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={(e) => toggleRegister(event.id, e)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          isRegistered
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                            : 'bg-primary text-on-primary hover:bg-primary-hover shadow-xs'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {isRegistered ? 'check_circle' : 'event_available'}
                        </span>
                        {isRegistered ? 'Seat Confirmed' : 'Reserve Seat'}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onJoinGame(event.pin);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold border border-outline-variant/30 flex items-center gap-1"
                        title="Enter Room Directly"
                      >
                        <span className="material-symbols-outlined text-sm">login</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Host Callout Section */}
        <div className="rounded-3xl bg-surface-container-low border border-outline-variant/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
              <span className="material-symbols-outlined">campaign</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-on-surface">Planning a Tournament for Your Community?</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 max-w-xl">
                Create a scheduled public page, collect RSVPs, automate reminders, and broadcast with automated leaderboards up to 5,000 players.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('quiz-builder')}
            className="px-6 py-3.5 rounded-2xl bg-surface-container-lowest text-primary font-bold text-sm border border-primary/30 hover:bg-primary hover:text-white transition-all whitespace-nowrap shadow-xs"
          >
            Create Public Tournament
          </button>
        </div>
      </div>
    </div>
  );
};
