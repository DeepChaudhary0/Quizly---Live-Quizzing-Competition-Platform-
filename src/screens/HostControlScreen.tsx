import React, { useState, useEffect } from 'react';
import { ASSETS, MOCK_LEADERBOARD, MOCK_QUESTIONS } from '../data/mockData';
import { QuizQuestion, ScreenId } from '../types';
import { EditQuestionModal } from '../components/EditQuestionModal';

interface HostControlScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onFinishQuiz: () => void;
  questions?: QuizQuestion[];
  onUpdateQuestion?: (index: number, updated: QuizQuestion) => void;
  hostName?: string;
  onUpdateHostName?: (name: string) => void;
}

export const HostControlScreen: React.FC<HostControlScreenProps> = ({
  onNavigate,
  onFinishQuiz,
  questions: propQuestions,
  onUpdateQuestion,
  hostName = 'Sarah Jenkins',
  onUpdateHostName,
}) => {
  const [localQuestions, setLocalQuestions] = useState<QuizQuestion[]>(propQuestions || MOCK_QUESTIONS);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [host, setHost] = useState(hostName);
  const [isEditingHost, setIsEditingHost] = useState(false);
  const [tempHost, setTempHost] = useState(hostName);
  const [timeLeft, setTimeLeft] = useState(25);
  const [isPaused, setIsPaused] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [updateSuccessToast, setUpdateSuccessToast] = useState<string | null>(null);
  const [broadcastText, setBroadcastText] = useState('');
  const [activeAnnouncement, setActiveAnnouncement] = useState('Welcome everyone! Fast fingers get the highest speed multipliers!');

  useEffect(() => {
    setHost(hostName);
    setTempHost(hostName);
  }, [hostName]);
  const [submittedCount, setSubmittedCount] = useState(138);
  const totalPlayers = 142;

  // Real-time simulated response counts
  const [responseCounts, setResponseCounts] = useState([18, 92, 16, 12]);

  // Keep localQuestions in sync if propQuestions changes
  useEffect(() => {
    if (propQuestions) {
      setLocalQuestions(propQuestions);
    }
  }, [propQuestions]);

  const question = localQuestions[currentQIndex % localQuestions.length];
  const correctIdx = question.correctIndex ?? question.options.findIndex((o) => o.isCorrect);

  // Timer
  useEffect(() => {
    if (isPaused || isRevealed) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRevealed(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isRevealed]);

  const handleNextQuestion = () => {
    if (currentQIndex + 1 >= localQuestions.length) {
      onFinishQuiz();
    } else {
      setCurrentQIndex((prev) => prev + 1);
      setTimeLeft(25);
      setIsRevealed(false);
      setSubmittedCount(0);
      setResponseCounts([12, 104, 14, 12]);
    }
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setActiveAnnouncement(`${host} (Host): "${broadcastText.trim()}"`);
    setBroadcastText('');
  };

  const handleSaveQuestion = (updated: QuizQuestion) => {
    setLocalQuestions((prev) =>
      prev.map((q, idx) => (idx === currentQIndex ? updated : q))
    );
    if (onUpdateQuestion) {
      onUpdateQuestion(currentQIndex, updated);
    }
    setActiveAnnouncement(`Host Announcement: Question #${currentQIndex + 1} has been updated live!`);
    setUpdateSuccessToast(`Question #${currentQIndex + 1} updated and synced to all participants!`);
    setTimeout(() => {
      setUpdateSuccessToast(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative">
      {/* Update Toast Notice */}
      {updateSuccessToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in border border-emerald-400">
          <span className="material-symbols-outlined text-lg">check_circle</span>
          <span className="text-xs font-bold">{updateSuccessToast}</span>
        </div>
      )}

      {/* Top Host Command Bar */}
      <header className="bg-slate-900 border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-wider text-rose-400">HOST CONTROL ROOM</span>
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Session PIN:</span>
            <span className="font-mono font-bold text-base text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/30">
              749-204
            </span>
            <button
              onClick={() => setShowQrModal(true)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
              title="Show QR Code"
            >
              <span className="material-symbols-outlined text-sm">qr_code_2</span>
            </button>
          </div>
          <div className="h-4 w-px bg-white/20"></div>
          {/* Editable Host Identity */}
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl text-xs">
            <span className="text-slate-400">Host:</span>
            {isEditingHost ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (tempHost.trim()) {
                    setHost(tempHost.trim());
                    if (onUpdateHostName) onUpdateHostName(tempHost.trim());
                    setUpdateSuccessToast(`Host name updated to "${tempHost.trim()}"`);
                    setTimeout(() => setUpdateSuccessToast(null), 3000);
                  }
                  setIsEditingHost(false);
                }}
                className="flex items-center gap-1"
              >
                <input
                  type="text"
                  value={tempHost}
                  onChange={(e) => setTempHost(e.target.value)}
                  className="bg-slate-900 border border-primary px-1.5 py-0.5 rounded text-xs text-white focus:outline-none w-28"
                  autoFocus
                />
                <button type="submit" className="text-emerald-400 hover:text-emerald-300">
                  <span className="material-symbols-outlined text-sm">check</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempHost(host);
                    setIsEditingHost(false);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setTempHost(host);
                  setIsEditingHost(true);
                }}
                className="flex items-center gap-1 font-bold text-white hover:text-primary transition-colors cursor-pointer"
                title="Click to edit host name"
              >
                <span>{host}</span>
                <span className="material-symbols-outlined text-xs text-slate-400 hover:text-primary">edit</span>
              </button>
            )}
          </div>
        </div>

        {/* Central telemetry stats */}
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-sm">group</span>
            <span className="text-slate-300">
              <strong className="text-white font-bold">{totalPlayers}</strong> Players Online
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400 text-sm">timer</span>
            <span className="text-slate-300">
              Avg Speed: <strong className="text-white font-bold">4.2s</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-sm">assignment_turned_in</span>
            <span className="text-slate-300">
              Submitted: <strong className="text-white font-bold">{submittedCount}/{totalPlayers}</strong> (97%)
            </span>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isPaused
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-sm">{isPaused ? 'play_arrow' : 'pause'}</span>
            {isPaused ? 'Resume Quiz' : 'Pause'}
          </button>

          <button
            onClick={onFinishQuiz}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">stop_circle</span>
            End Session
          </button>
        </div>
      </header>

      {/* Main Command Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center Stage: Active Question & Live Histogram (8 cols) */}
        <div className="lg:col-span-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Question Header Card */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary-200">
                    Question {currentQIndex + 1} of {localQuestions.length} • {question.category}
                  </span>

                  {/* EDIT QUESTION BUTTON */}
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 hover:bg-primary/30 text-primary-200 border border-primary/30 text-xs font-bold transition-all shadow-xs cursor-pointer group"
                    title="Edit this question live"
                  >
                    <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">
                      edit_note
                    </span>
                    <span>Edit Question</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400">Clock:</span>
                    <span className={`text-lg font-black ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-primary'}`}>
                      {timeLeft}s
                    </span>
                  </div>
                  <button
                    onClick={() => setTimeLeft(0)}
                    disabled={isRevealed}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 disabled:opacity-30"
                  >
                    Skip Clock
                  </button>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl sm:text-2xl font-black text-white leading-snug flex-1">
                  {question.prompt}
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-primary transition-colors shrink-0"
                  title="Quick Edit Question"
                >
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
              </div>

              {/* Badges / Hints */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-amber-400">monetization_on</span>
                  {question.points} pts
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-indigo-400">speed</span>
                  {question.difficulty}
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">
                  Correct Key: Option {['A', 'B', 'C', 'D', 'E'][correctIdx] || 'A'}
                </span>
              </div>
            </div>

            {/* Live Response Distribution Bars */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">bar_chart</span>
                  Audience Response Distribution
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span className="material-symbols-outlined text-xs">edit</span>
                    Edit Options
                  </button>
                  <span className="text-xs text-slate-400">
                    {isRevealed ? 'Revealed to Players' : 'Hidden from Player Screens'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const letter = ['A', 'B', 'C', 'D', 'E'][idx] || `${idx + 1}`;
                  const count = responseCounts[idx] || 0;
                  const percent = Math.round((count / totalPlayers) * 100);
                  const isCorrect = idx === correctIdx;

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-500 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {letter}
                          </span>
                          <span className={isRevealed && isCorrect ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                            {typeof opt === 'string' ? opt : opt.text}
                          </span>
                        </span>
                        <span className="font-mono text-slate-400">
                          {count} votes ({percent}%)
                        </span>
                      </div>

                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-700 rounded-full ${
                            isRevealed
                              ? isCorrect
                                ? 'bg-emerald-500'
                                : 'bg-rose-500/50'
                              : 'bg-primary'
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Host Master Actions Toolbar */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRevealed(true)}
                disabled={isRevealed}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 text-white font-bold text-xs hover:bg-emerald-600 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-sm">visibility</span>
                Reveal Answer
              </button>

              <button
                onClick={() => setShowLeaderboardModal(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-white font-bold text-xs hover:bg-amber-600 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span className="material-symbols-outlined text-sm">leaderboard</span>
                Show Interim Podium
              </button>

              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
                title="Edit active question parameters"
              >
                <span className="material-symbols-outlined text-sm text-primary">edit_note</span>
                Edit Question
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
              >
                <span>{currentQIndex + 1 >= localQuestions.length ? 'Finalize & End Quiz' : 'Next Question'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Leaderboard & Broadcast Announcer (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real-time Broadcast Tool */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">campaign</span>
              Host Broadcast Announcement
            </h3>

            <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs text-indigo-300 italic">
              &quot;{activeAnnouncement}&quot;
            </div>

            <form onSubmit={handleBroadcast} className="flex gap-2">
              <input
                type="text"
                placeholder="Send instant message to players..."
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-hover transition-colors"
              >
                Send
              </button>
            </form>
          </div>

          {/* Live Dynamic Leaderboard Stream */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-amber-400">military_tech</span>
                Live Standings (Top 6)
              </h3>
              <span className="text-[11px] text-slate-500">Live Sync</span>
            </div>

            <div className="space-y-2">
              {MOCK_LEADERBOARD.slice(0, 6).map((player) => (
                <div
                  key={player.rank}
                  className="p-3 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs ${
                        player.rank === 1
                          ? 'bg-amber-400 text-slate-950'
                          : player.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : player.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-400'
                      }`}
                    >
                      {player.rank}
                    </span>

                    <img
                      src={player.avatar}
                      alt={player.nickname}
                      className="w-7 h-7 rounded-full object-cover"
                    />

                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-[100px]">
                        {player.nickname}
                      </div>
                      <div className="text-[10px] text-amber-400 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[10px]">local_fire_department</span>
                        {player.streak}x streak
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black font-mono text-primary">
                      {player.score.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold">
                      +{player.accuracy}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Question Edit Modal */}
      {isEditModalOpen && (
        <EditQuestionModal
          isOpen={isEditModalOpen}
          question={question}
          questionIndex={currentQIndex}
          totalQuestions={localQuestions.length}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveQuestion}
        />
      )}

      {/* Interim Leaderboard Modal */}
      {showLeaderboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Interim Podium</span>
                <h3 className="text-xl font-black text-white">Current Leaderboard Standing</h3>
              </div>
              <button
                onClick={() => setShowLeaderboardModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {MOCK_LEADERBOARD.slice(0, 5).map((player) => (
                <div
                  key={player.rank}
                  className="p-4 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-black text-lg text-amber-400 w-6">#{player.rank}</span>
                    <img src={player.avatar} alt={player.nickname} className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-bold text-sm text-white">{player.nickname}</h4>
                      <span className="text-xs text-slate-400">{player.streak} streak • {player.accuracy}% accurate</span>
                    </div>
                  </div>
                  <span className="text-base font-black font-mono text-primary">{player.score.toLocaleString()} pts</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLeaderboardModal(false)}
              className="w-full py-3 rounded-xl bg-primary text-white font-bold text-xs"
            >
              Resume Question Stage
            </button>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 max-w-sm w-full rounded-3xl p-6 border border-white/10 text-center space-y-4">
            <h3 className="font-bold text-white text-lg">Join Code & PIN</h3>
            <div className="bg-white p-6 rounded-2xl inline-block">
              <svg className="w-44 h-44 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,20 h10 v10 h-10 z M40,40 h20 v20 h-20 z M10,40 h10 v10 h-10 z M70,40 h10 v10 h-10 z M40,70 h10 v10 h-10 z M70,70 h30 v30 h-30 z M80,80 h10 v10 h-10 z M60,60 h10 v10 h-10 z" />
              </svg>
            </div>
            <div className="text-3xl font-mono font-black text-primary">749-204</div>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
