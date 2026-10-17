import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenId } from '../types';

interface LaunchModeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLaunchHost: () => void;
  onLaunchPlayer: () => void;
  hostName?: string;
  onUpdateHostName?: (name: string) => void;
}

export const LaunchModeScreen: React.FC<LaunchModeScreenProps> = ({
  onNavigate,
  onLaunchHost,
  onLaunchPlayer,
  hostName = 'Sarah Jenkins',
  onUpdateHostName,
}) => {
  const [host, setHost] = useState(hostName);
  const [isEditingHost, setIsEditingHost] = useState(false);
  const [tempHost, setTempHost] = useState(hostName);
  const [selectedMode, setSelectedMode] = useState<'live' | 'async' | 'team'>('live');
  const [roomPin, setRoomPin] = useState('749-204');
  const [capacity, setCapacity] = useState(300);
  const [copiedPin, setCopiedPin] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  React.useEffect(() => {
    setHost(hostName);
    setTempHost(hostName);
  }, [hostName]);

  // Quick toggles
  const [randomizeOrder, setRandomizeOrder] = useState(true);
  const [streakMultipliers, setStreakMultipliers] = useState(true);
  const [leaderboardFrequency, setLeaderboardFrequency] = useState('5');
  const [nicknameFilter, setNicknameFilter] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [participantChat, setParticipantChat] = useState(true);

  const handleCopyPin = () => {
    navigator.clipboard.writeText(roomPin.replace('-', ''));
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-24">
      {/* Top Banner Navigation */}
      <div className="bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('host-dashboard')}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors flex items-center gap-1.5 text-sm font-medium"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              Back to Dashboard
            </button>
            <div className="h-4 w-px bg-outline-variant/40"></div>
            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
              <span>Quizzes</span>
              <span>/</span>
              <span>Modern Architecture & Urban Design</span>
              <span>/</span>
              <span className="text-primary font-semibold">Launch Room</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Room Ready
            </span>
            <div className="bg-surface-container px-3.5 py-1.5 rounded-xl border border-outline-variant/40 flex items-center gap-2">
              <span className="text-xs text-on-surface-variant">PIN:</span>
              <span className="font-mono font-bold text-primary tracking-wider">{roomPin}</span>
              <button
                onClick={handleCopyPin}
                title="Copy PIN"
                className="text-on-surface-variant hover:text-primary transition-colors text-xs ml-1"
              >
                <span className="material-symbols-outlined text-sm">
                  {copiedPin ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">rocket_launch</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Launch Presentation & Hosting Mode
              </h1>
              <p className="text-sm text-on-surface-variant mt-0.5">
                Configure your game mechanics, live synchronization rules, and room permissions before admitting players.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hosting Mode Selection (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-primary">style</span>
              1. Select Delivery Format
            </h2>

            {/* Mode 1: Synchronous Live Hosted Event (Recommended) */}
            <div
              onClick={() => setSelectedMode('live')}
              className={`relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer ${
                selectedMode === 'live'
                  ? 'bg-surface-container-lowest border-primary shadow-xl shadow-primary/5 ring-2 ring-primary/20'
                  : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-lowest'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                      selectedMode === 'live'
                        ? 'bg-primary text-on-primary shadow-md shadow-primary/30'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined">podium</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-on-surface">Live Synchronous Host Mode</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-primary/10 text-primary uppercase tracking-wide">
                        Standard
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      You maintain total control. Advance slides synchronously across all participant screens, trigger instant leaderboards, display live response distributions, and broadcast real-time audio cues.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-primary">sync</span>
                        Sub-second sync
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-amber-500">leaderboard</span>
                        Instant podium reveal
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-rose-500">favorite</span>
                        Audience emoji reactions
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedMode === 'live'
                        ? 'border-primary bg-primary text-white'
                        : 'border-outline-variant/60 bg-surface'
                    }`}
                  >
                    {selectedMode === 'live' && (
                      <span className="material-symbols-outlined text-sm">check</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mode 2: Async Self-Paced Quiz */}
            <div
              onClick={() => setSelectedMode('async')}
              className={`relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer ${
                selectedMode === 'async'
                  ? 'bg-surface-container-lowest border-primary shadow-xl shadow-primary/5 ring-2 ring-primary/20'
                  : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-lowest'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                      selectedMode === 'async'
                        ? 'bg-primary text-on-primary shadow-md shadow-primary/30'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-on-surface">Self-Paced / Async Challenge</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 uppercase tracking-wide">
                        Homework / Test
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Players join independently within a defined time window. Each participant progresses at their own pace with client-side timers. Final scores are ranked on an asynchronous leaderboard.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                        Open for 48 Hours
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-indigo-500">shuffle</span>
                        Strict question randomization
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedMode === 'async'
                        ? 'border-primary bg-primary text-white'
                        : 'border-outline-variant/60 bg-surface'
                    }`}
                  >
                    {selectedMode === 'async' && (
                      <span className="material-symbols-outlined text-sm">check</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mode 3: Team Tournament / Cohort Battle */}
            <div
              onClick={() => setSelectedMode('team')}
              className={`relative rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer ${
                selectedMode === 'team'
                  ? 'bg-surface-container-lowest border-primary shadow-xl shadow-primary/5 ring-2 ring-primary/20'
                  : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-lowest'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                      selectedMode === 'team'
                        ? 'bg-primary text-on-primary shadow-md shadow-primary/30'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined">diversity_3</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-on-surface">Team Tournament & Co-op Arena</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-600 uppercase tracking-wide">
                        Championship
                      </span>
                    </div>
                    <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
                      Participants are sorted into squads (e.g., Red Gryphons, Blue Titans). Scores are aggregated into team totals with average response acceleration perks.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-purple-500">groups</span>
                        Automatic team balancer
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-sm text-amber-500">military_tech</span>
                        Squad victory banner
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-1">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedMode === 'team'
                        ? 'border-primary bg-primary text-white'
                        : 'border-outline-variant/60 bg-surface'
                    }`}
                  >
                    {selectedMode === 'team' && (
                      <span className="material-symbols-outlined text-sm">check</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Mechanics Customization */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-7 border border-outline-variant/30 space-y-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-primary">tune</span>
                2. Live Room Mechanics & Rules
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Randomize Question Order</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Scramble questions to deter screen peekers</p>
                  </div>
                  <button
                    onClick={() => setRandomizeOrder(!randomizeOrder)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      randomizeOrder ? 'bg-primary justify-end' : 'bg-outline-variant/40 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Answer Streak Multipliers</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Award 1.2x – 3x bonuses for consecutive rights</p>
                  </div>
                  <button
                    onClick={() => setStreakMultipliers(!streakMultipliers)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      streakMultipliers ? 'bg-primary justify-end' : 'bg-outline-variant/40 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Appropriate Nickname Filter</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">AI sanitization of offensive player names</p>
                  </div>
                  <button
                    onClick={() => setNicknameFilter(!nicknameFilter)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      nicknameFilter ? 'bg-primary justify-end' : 'bg-outline-variant/40 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Interactive Audio Cues</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Countdown ticks and podium fanfare</p>
                  </div>
                  <button
                    onClick={() => setSoundEffects(!soundEffects)}
                    className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                      soundEffects ? 'bg-primary justify-end' : 'bg-outline-variant/40 justify-start'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-white shadow-sm"></span>
                  </button>
                </div>
              </div>

              {/* Leaderboard Frequency */}
              <div className="pt-2 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-on-surface">Leaderboard Display Frequency</h4>
                  <p className="text-xs text-on-surface-variant mt-0.5">How often to display the interim top 10 rankings</p>
                </div>
                <div className="flex items-center gap-2">
                  {['1', '3', '5', 'manual'].map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setLeaderboardFrequency(freq)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        leaderboardFrequency === freq
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                      }`}
                    >
                      {freq === '1' ? 'Every Q' : freq === 'manual' ? 'Host Trigger' : `Every ${freq} Qs`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Room Credentials & Launch Trigger (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 space-y-6 sticky top-24">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Room Passkey</span>
                <h3 className="text-lg font-bold text-on-surface mt-1">Player Access Gateway</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Share this 6-digit room code or QR graphic with your live audience to gather them in the lobby.
                </p>
              </div>

              {/* Big PIN Display */}
              <div className="bg-gradient-to-br from-primary/10 via-surface-container to-surface-container-high p-6 rounded-2xl text-center border border-primary/20 relative group">
                <span className="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Session Join PIN</span>
                <div className="text-4xl font-black font-mono tracking-widest text-primary my-2 drop-shadow-sm">
                  {roomPin}
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <button
                    onClick={handleCopyPin}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary text-xs font-semibold border border-outline-variant/30 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedPin ? 'check' : 'content_copy'}
                    </span>
                    {copiedPin ? 'Copied!' : 'Copy Code'}
                  </button>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface hover:text-primary text-xs font-semibold border border-outline-variant/30 shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">qr_code_2</span>
                    Show QR
                  </button>
                </div>
              </div>

              {/* Room Capacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-on-surface-variant font-medium">Audience Capacity Limit</span>
                  <span className="font-bold text-primary">{capacity} Players</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant">
                  <span>50 seats</span>
                  <span>500 seats</span>
                  <span>1,000 max</span>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2 text-xs">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Target Quiz</span>
                  <span className="font-bold text-on-surface">Modern Architecture</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Total Questions</span>
                  <span className="font-bold text-on-surface">15 Questions</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Est. Duration</span>
                  <span className="font-bold text-on-surface">~18 Minutes</span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span>Host Access</span>
                  {isEditingHost ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (tempHost.trim()) {
                          setHost(tempHost.trim());
                          if (onUpdateHostName) onUpdateHostName(tempHost.trim());
                        }
                        setIsEditingHost(false);
                      }}
                      className="flex items-center gap-1"
                    >
                      <input
                        type="text"
                        value={tempHost}
                        onChange={(e) => setTempHost(e.target.value)}
                        className="px-2 py-0.5 rounded-lg bg-surface-container border border-primary text-xs font-bold text-on-surface w-28"
                        autoFocus
                      />
                      <button type="submit" className="text-emerald-500">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTempHost(host);
                          setIsEditingHost(false);
                        }}
                        className="text-outline"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setTempHost(host);
                        setIsEditingHost(true);
                      }}
                      className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                      title="Edit Host Name"
                    >
                      <span>{host} (Verified)</span>
                      <span className="material-symbols-outlined text-xs text-outline">edit</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={onLaunchHost}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-primary-hover text-on-primary font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base"
                >
                  <span className="material-symbols-outlined">cast_connected</span>
                  Enter Host Control Room
                </button>

                <button
                  onClick={onLaunchPlayer}
                  className="w-full py-3 px-6 rounded-2xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  Test as Participant (Player View)
                </button>

                <button
                  onClick={() => onNavigate('quiz-builder')}
                  className="w-full py-2.5 text-xs text-on-surface-variant hover:text-on-surface transition-colors font-medium text-center"
                >
                  Return to Question Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest max-w-sm w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-on-surface">Scan to Join Quiz</h3>
              <button
                onClick={() => setShowQrModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 inline-block shadow-inner">
              {/* Simulated QR graphic with SVG */}
              <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,20 h10 v10 h-10 z M40,40 h20 v20 h-20 z M10,40 h10 v10 h-10 z M70,40 h10 v10 h-10 z M40,70 h10 v10 h-10 z M70,70 h30 v30 h-30 z M80,80 h10 v10 h-10 z M60,60 h10 v10 h-10 z" />
              </svg>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-on-surface-variant font-medium">Or enter direct PIN at quizly.live</span>
              <div className="text-3xl font-black font-mono tracking-widest text-primary">{roomPin}</div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-sm font-bold"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
