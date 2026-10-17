import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenId } from '../types';

interface EventDetailsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onJoinGame: (pin: string) => void;
}

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({ onNavigate, onJoinGame }) => {
  const [nickname, setNickname] = useState('StarGazer42');
  const [email, setEmail] = useState('stargazer42@astronomy.org');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 8,
    mins: 42,
    secs: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert('Please provide your email address.');
      return;
    }
    setIsRegistered(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const downloadICS = () => {
    const icsContent =
      'BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Quizly - Galactic Trivia Night\nDESCRIPTION:Join using PIN 489-012 at Quizly\nDTSTART:20241024T230000Z\nDURATION:PT45M\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR';
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'quizly-galactic-trivia.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Decorative ambient backdrop */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-gradient-to-b from-primary-fixed/40 via-surface-container-high/20 to-transparent blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
          {/* Back Breadcrumb & Metadata Quick-pill */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => onNavigate('events-calendar')}
              className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Live Schedule</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold shadow-xs">
                <span className="material-symbols-outlined text-primary text-[15px]">public</span>
                <span>Public Event #EV-8842</span>
              </span>
            </div>
          </div>

          {/* Hero Header Section */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-10 shadow-sm border border-outline-variant/50 relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary-fixed-dim/30 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="relative z-10 flex flex-col gap-4 max-w-4xl">
              {/* Status & Badges Strip */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-container/15 text-tertiary text-xs font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
                  </span>
                  <span>REGISTRATION OPEN • 186/250 Seats Claimed</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container text-secondary text-xs font-medium">
                  Science & Nature
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-secondary text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px] text-primary">speed</span>
                  <span>Intermediate Difficulty</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span>Verified Host</span>
                </span>
              </div>

              {/* Main Event Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight leading-tight mt-1">
                Galactic Trivia Night: Deep Space & Astrophysics Championship
              </h1>

              {/* Host Row Component */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 mt-2 border-t border-surface-container">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      className="w-14 h-14 rounded-full object-cover shadow-sm ring-2 ring-primary/20"
                      alt="Professor Julian Vance"
                      src={ASSETS.profJulian}
                    />
                    <span className="absolute -bottom-1 -right-1 bg-surface-container-lowest p-0.5 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-base text-on-surface font-bold">Prof. Julian Vance</span>
                      <span className="inline-flex items-center text-amber-500 text-xs font-bold">
                        <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>
                        <span>4.9</span>
                        <span className="text-on-surface-variant font-normal ml-1">(428 reviews)</span>
                      </span>
                    </div>
                    <span className="text-xs text-on-surface-variant">
                      Senior Lecturer • Founder of University Astronomy Club
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      {isFollowing ? 'check' : 'person_add'}
                    </span>
                    <span>{isFollowing ? 'Following (1,401)' : 'Follow Host (1.4k)'}</span>
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
                    title="Share event"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Event Feature Banner Card with Rich Visual */}
              <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/40 flex flex-col">
                <div className="relative h-60 sm:h-72 w-full">
                  <img
                    className="w-full h-full object-cover"
                    alt="Deep space nebula photography"
                    src={ASSETS.deepSpaceNebula}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent flex items-end p-6">
                    <div className="flex flex-wrap items-center gap-4 text-on-primary">
                      <div className="flex items-center gap-1.5 text-on-primary text-xs font-semibold">
                        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">timer</span>
                        <span>30s Per Question</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-primary text-xs font-semibold">
                        <span className="material-symbols-outlined text-inverse-primary text-[20px]">military_tech</span>
                        <span>Tiered XP & Trophy Drops</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-primary text-xs font-semibold">
                        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">record_voice_over</span>
                        <span>Live Audio Commentary</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About this Quiz Section */}
                <div className="p-6 lg:p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">auto_stories</span>
                    <h2 className="text-xl text-on-surface font-bold">About this Quiz Event</h2>
                  </div>
                  <p className="text-base text-on-surface-variant leading-relaxed">
                    Prepare for a cosmic journey through stellar evolution, black holes, exoplanet discoveries, and NASA mission milestones. 25 timed questions with live commentary and instant accuracy rankings.
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Whether you're a seasoned amateur astronomer or a curious stargazer, this session will challenge your understanding of gravitational lensing, neutron star densities, spectroscopy, and the latest discoveries from the James Webb Space Telescope. All participants receive customized performance analytics right after the conclusion.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['#Astrophysics', '#JWST', '#BlackHoles', '#Cosmology', '#Exoplanets'].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule & Format Breakdown */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm border border-outline-variant/40 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
                    <h2 className="text-xl text-on-surface font-bold">Schedule & Format Breakdown</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold">
                    Synchronous Live Stream
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">event</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Date</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-on-surface">Thursday</div>
                      <div className="text-xs text-on-surface-variant">October 24, 2024</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">schedule</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Start Time</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-on-surface">7:00 PM EDT</div>
                      <div className="text-xs text-tertiary flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">near_me</span>
                        <span>Your local time: 7:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Duration</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-on-surface">45 Minutes</div>
                      <div className="text-xs text-on-surface-variant">30s/question + host debrief</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">quiz</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Total Questions</span>
                    </div>
                    <div>
                      <div className="text-base font-bold text-on-surface">25 Questions</div>
                      <div className="text-xs text-on-surface-variant">Multiple Choice & Visual Pairs</div>
                    </div>
                  </div>

                  <div className="sm:col-span-2 p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]">emoji_events</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">Prizes & Hall of Fame</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[28px]">workspace_premium</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-on-surface">Global Leaderboard Recognition</div>
                        <div className="text-xs text-on-surface-variant">Top 3 players featured on Quizly Global Leaderboard + verified digital badges</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seating Capacity Visualization Bar */}
                <div className="mt-3 p-4 rounded-xl bg-surface-container border border-outline-variant/30 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface font-semibold">Live Room Capacity Status</span>
                    <span className="text-primary font-bold">186 / 250 registered (74% filled)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: '74%' }}></div>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">
                    64 virtual seats remaining before guest waitlist triggers automatically.
                  </span>
                </div>
              </div>

              {/* Official Rules & Scoring Mechanics */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm border border-outline-variant/40 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">gavel</span>
                  <h2 className="text-xl text-on-surface font-bold">Official Rules & Guidelines</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { num: 1, title: 'Paced Questions', desc: 'Questions auto-advance after the 30-second countdown. No pausing permitted.' },
                    { num: 2, title: 'Speed Multipliers', desc: 'Faster correct answers earn up to 500 bonus points calculated inversely to time elapsed.' },
                    { num: 3, title: 'Dual-Device Ready', desc: 'Participants may join from desktop or smartphone via game PIN or direct link seamlessly.' },
                    { num: 4, title: 'Late Joining Grace', desc: 'Late joining allowed during the first 3 questions before strict room locking.' },
                  ].map((rule) => (
                    <div key={rule.num} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold shrink-0">
                        {rule.num}
                      </div>
                      <div>
                        <h3 className="text-sm text-on-surface font-bold mb-1">{rule.title}</h3>
                        <p className="text-xs text-on-surface-variant leading-relaxed">{rule.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host's Past Quizzes & Community Endorsements */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 lg:p-8 shadow-sm border border-outline-variant/40 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">history_edu</span>
                    <h2 className="text-xl text-on-surface font-bold">Julian's Past Quizzes & Reviews</h2>
                  </div>
                  <button
                    onClick={() => onNavigate('results-standings')}
                    className="text-xs text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Full Host Archive</span>
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[11px] font-medium">
                        Completed • Sep 28
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">star</span> 4.95
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">Exoplanets & Habitable Zones</h4>
                      <p className="text-xs text-on-surface-variant mt-1">214 live players • 92% satisfaction score</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between gap-3 hover:bg-surface-container transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant text-[11px] font-medium">
                        Completed • Aug 14
                      </span>
                      <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">star</span> 4.88
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">The Apollo Missions In-Depth</h4>
                      <p className="text-xs text-on-surface-variant mt-1">320 live players • 96% completion rate</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex gap-3 items-start mt-2">
                  <img
                    className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-primary/20"
                    alt="Maya Lin avatar"
                    src={ASSETS.mayaLin}
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-on-surface font-bold">Maya Lin</span>
                      <span className="text-[11px] text-on-surface-variant">• Attended 4 Quizzes</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed italic">
                      “Prof. Vance's questions are deeply researched! No superficial trivia—every question teaches you something mind-blowing between rounds.”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (4 cols) - Sticky Registration Box */}
            <div className="lg:col-span-4 flex flex-col gap-4 sticky top-20">
              {/* Live Countdown Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/50 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">Showtime Countdown</span>
                  <span className="inline-flex items-center gap-1 text-error text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    <span>Starting Soon</span>
                  </span>
                </div>

                {/* Countdown Timer Blocks */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center">
                    <span className="text-2xl text-on-surface font-extrabold tabular-nums">
                      {String(countdown.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Days</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center">
                    <span className="text-2xl text-on-surface font-extrabold tabular-nums">
                      {String(countdown.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Hours</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center">
                    <span className="text-2xl text-on-surface font-extrabold tabular-nums">
                      {String(countdown.mins).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Mins</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container flex flex-col items-center">
                    <span className="text-2xl text-primary font-extrabold tabular-nums">
                      {String(countdown.secs).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Secs</span>
                  </div>
                </div>

                <div className="w-full h-px bg-outline-variant/40 my-1"></div>

                {/* Registration Form or Success State */}
                {!isRegistered ? (
                  <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <h3 className="text-base text-on-surface font-bold">Reserve Your Seat for Free</h3>
                      <span className="text-xs text-on-surface-variant">Instant entry credentials sent immediately</span>
                    </div>

                    <div className="flex flex-col gap-1.5 mt-2">
                      <label className="text-xs text-on-surface font-semibold flex items-center justify-between">
                        <span>Display Nickname</span>
                        <span className="text-outline text-[11px] font-normal">Shown on scoreboards</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                          badge
                        </span>
                        <input
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low text-on-surface text-xs placeholder:text-outline border border-outline-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                          placeholder="e.g. StarGazer42"
                          type="text"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-on-surface font-semibold flex items-center justify-between">
                        <span>Email Address</span>
                        <span className="text-outline text-[11px] font-normal">For sync & PIN code</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                          mail
                        </span>
                        <input
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-surface-container-low text-on-surface text-xs placeholder:text-outline border border-outline-variant/40 focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                          placeholder="your.name@domain.com"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-2.5 mt-2 cursor-pointer select-none">
                      <input
                        defaultChecked
                        className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary accent-primary cursor-pointer"
                        type="checkbox"
                      />
                      <span className="text-xs text-on-surface-variant leading-relaxed">
                        Send me a calendar invite (.ics) and 15-minute SMS alert
                      </span>
                    </label>

                    <button
                      type="submit"
                      className="w-full h-11 mt-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                      <span>Register for Quiz Now (Free)</span>
                    </button>

                    <div className="flex items-center justify-center gap-1 text-center mt-1">
                      <span className="material-symbols-outlined text-tertiary text-[16px]">verified_user</span>
                      <span className="text-[11px] text-on-surface-variant">✓ 100% Free • No spam • Instant confirmation email</span>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 rounded-xl bg-tertiary-container/20 border border-tertiary/30 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-tertiary text-base font-bold">
                      <span className="material-symbols-outlined text-[20px]">task_alt</span>
                      <span>You're Registered!</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      We've reserved seat <strong className="text-on-surface">#187</strong> for you as <strong className="text-on-surface">{nickname}</strong>.
                    </p>
                    <button
                      onClick={() => onJoinGame('489-012')}
                      className="w-full h-10 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      <span>Jump to Live Player View</span>
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    </button>
                  </div>
                )}

                <div className="w-full h-px bg-outline-variant/40 my-1"></div>

                {/* PIN Preview */}
                <div
                  onClick={() => onJoinGame('489-012')}
                  className="p-3.5 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">key</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Session Room Code</span>
                      <span className="text-base text-on-surface font-extrabold tracking-wider font-mono">PIN: 489-012</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-outline text-[11px] font-semibold">
                    Activates -15m
                  </span>
                </div>

                {/* Share & Calendar Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs border border-outline-variant/30 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                    <button
                      onClick={downloadICS}
                      className="h-10 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs border border-outline-variant/30 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">calendar_add_on</span>
                      <span>Add Calendar</span>
                    </button>
                  </div>

                  {/* Social Share Pills */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-on-surface-variant">Invite crew:</span>
                    <div className="flex items-center gap-1.5">
                      {['𝕏', 'chat', 'in', 'forum'].map((icon, i) => (
                        <button
                          key={i}
                          onClick={handleCopyLink}
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface-variant text-xs transition-colors flex items-center justify-center cursor-pointer"
                        >
                          {icon.length === 1 ? (
                            <span className="font-bold">{icon}</span>
                          ) : (
                            <span className="material-symbols-outlined text-[16px]">{icon}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick FAQ / Support Mini Card */}
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/40 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[24px]">contact_support</span>
                <div className="flex flex-col">
                  <span className="text-xs text-on-surface font-semibold">Hosting your own class or group?</span>
                  <button
                    onClick={() => onNavigate('quiz-builder')}
                    className="text-xs text-primary hover:underline text-left font-medium cursor-pointer"
                  >
                    Duplicate template or launch private clone →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
