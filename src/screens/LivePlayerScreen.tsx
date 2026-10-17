import React, { useState, useEffect } from 'react';
import { ASSETS, MOCK_QUESTIONS } from '../data/mockData';
import { QuizQuestion, ScreenId } from '../types';
import { EditQuestionModal } from '../components/EditQuestionModal';

interface LivePlayerScreenProps {
  onNavigate: (screen: ScreenId) => void;
  playerNickname?: string;
  questions?: QuizQuestion[];
  onUpdateQuestion?: (index: number, updated: QuizQuestion) => void;
  onUpdateNickname?: (name: string) => void;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
}

export const LivePlayerScreen: React.FC<LivePlayerScreenProps> = ({
  onNavigate,
  playerNickname = 'Alex Rivera',
  questions: propQuestions,
  onUpdateQuestion,
  onUpdateNickname,
}) => {
  const [localQuestions, setLocalQuestions] = useState<QuizQuestion[]>(propQuestions || MOCK_QUESTIONS);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [nickname, setNickname] = useState(playerNickname);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [tempNick, setTempNick] = useState(playerNickname);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18);
  const [score, setScore] = useState(4820);
  const [streak, setStreak] = useState(3);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editToast, setEditToast] = useState<string | null>(null);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [broadcastMsg, setBroadcastMsg] = useState(
    'Julian (Host): "Double points round coming up after Question 10! Keep your streaks alive!"'
  );

  useEffect(() => {
    setNickname(playerNickname);
    setTempNick(playerNickname);
  }, [playerNickname]);

  useEffect(() => {
    if (propQuestions) {
      setLocalQuestions(propQuestions);
    }
  }, [propQuestions]);

  const question = localQuestions[currentQuestionIdx % localQuestions.length];
  const correctIdx = question.correctIndex ?? question.options.findIndex((o) => o.isCorrect);

  // Timer countdown
  useEffect(() => {
    if (isRevealed) return;
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
  }, [isRevealed, currentQuestionIdx]);

  // Handle option selection
  const handleSelectOption = (idx: number) => {
    if (isAnswerLocked || isRevealed) return;
    setSelectedOption(idx);
    setIsAnswerLocked(true);

    // Calculate score if revealed
    setTimeout(() => {
      setIsRevealed(true);
      if (idx === correctIdx) {
        const bonus = Math.round(timeLeft * 25);
        setScore((s) => s + 1000 + bonus);
        setStreak((str) => str + 1);
      } else {
        setStreak(0);
      }
    }, 1800);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setIsRevealed(false);
    setTimeLeft(20);
    if (currentQuestionIdx + 1 >= localQuestions.length) {
      onNavigate('results-standings');
    } else {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handleSaveQuestion = (updated: QuizQuestion) => {
    setLocalQuestions((prev) =>
      prev.map((q, idx) => (idx === currentQuestionIdx ? updated : q))
    );
    if (onUpdateQuestion) {
      onUpdateQuestion(currentQuestionIdx, updated);
    }
    // reset current answering state with the new parameters
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setIsRevealed(false);
    setTimeLeft(updated.timeLimit || 20);
    setEditToast(`Question #${currentQuestionIdx + 1} updated successfully!`);
    setTimeout(() => setEditToast(null), 3000);
  };

  const triggerReaction = (emoji: string) => {
    const newEmoji: FloatingEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      x: 20 + Math.random() * 60,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 2200);
  };

  const optionColors = [
    { bg: 'bg-rose-500/10 hover:bg-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-600', badge: 'bg-rose-500 text-white', ring: 'ring-rose-500' },
    { bg: 'bg-blue-500/10 hover:bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-600', badge: 'bg-blue-500 text-white', ring: 'ring-blue-500' },
    { bg: 'bg-amber-500/10 hover:bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-600', badge: 'bg-amber-500 text-white', ring: 'ring-amber-500' },
    { bg: 'bg-emerald-500/10 hover:bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-600', badge: 'bg-emerald-500 text-white', ring: 'ring-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Emojis Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingEmojis.map((e) => (
          <div
            key={e.id}
            className="absolute text-4xl animate-float-up"
            style={{
              left: `${e.x}%`,
              bottom: '10%',
            }}
          >
            {e.emoji}
          </div>
        ))}
      </div>

      {/* Toast Notice */}
      {editToast && (
        <div className="fixed top-16 right-6 z-50 bg-emerald-500 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-emerald-400 animate-fade-in">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          <span>{editToast}</span>
        </div>
      )}

      {/* Top HUD Bar */}
      <header className="relative z-10 px-4 sm:px-6 py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-lg">videogame_asset</span>
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-xs">
              Ancient Civilizations & Capitals
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>Question {currentQuestionIdx + 1} of {localQuestions.length}</span>
              <span>•</span>
              <span className="font-mono text-indigo-400">PIN: 749-204</span>
            </div>
          </div>
        </div>

        {/* Player stats: Nickname, Score, Streak, Edit Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Editable Joiner Player Nickname Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs">
            <span className="material-symbols-outlined text-xs text-primary">person</span>
            {isEditingNickname ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (tempNick.trim()) {
                    setNickname(tempNick.trim());
                    if (onUpdateNickname) onUpdateNickname(tempNick.trim());
                    setEditToast(`Nickname changed to "${tempNick.trim()}"`);
                    setTimeout(() => setEditToast(null), 3000);
                  }
                  setIsEditingNickname(false);
                }}
                className="flex items-center gap-1"
              >
                <input
                  type="text"
                  value={tempNick}
                  onChange={(e) => setTempNick(e.target.value)}
                  className="bg-slate-900 border border-primary px-1.5 py-0.5 rounded text-xs text-white focus:outline-none w-24"
                  autoFocus
                />
                <button type="submit" className="text-emerald-400 hover:text-emerald-300">
                  <span className="material-symbols-outlined text-sm">check</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTempNick(nickname);
                    setIsEditingNickname(false);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setTempNick(nickname);
                  setIsEditingNickname(true);
                }}
                className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="Click to edit your player nickname"
              >
                <span className="font-bold text-white truncate max-w-[110px]">{nickname}</span>
                <span className="material-symbols-outlined text-[13px] text-slate-400 hover:text-primary">edit</span>
              </button>
            )}
          </div>

          {/* Quick Edit Question button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-2.5 py-1.5 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary-200 border border-primary/40 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            title="Edit question in quiz"
          >
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span className="hidden sm:inline">Edit Question</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            <span>{streak}x Streak</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-primary/20 border border-primary/40 text-white text-xs font-black tracking-wide">
            {score.toLocaleString()} <span className="text-primary-200 font-normal text-[10px]">PTS</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            title="Toggle Sound"
          >
            <span className="material-symbols-outlined text-sm">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col justify-center space-y-6">
        {/* Timer Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-primary">timer</span>
              Time Remaining
            </span>
            <span className={`font-mono text-base ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full transition-all duration-1000 rounded-full ${
                timeLeft <= 5 ? 'bg-rose-500' : timeLeft <= 10 ? 'bg-amber-500' : 'bg-primary'
              }`}
              style={{ width: `${(timeLeft / (question.timeLimit || 20)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-primary/20 text-primary-200 uppercase tracking-wider">
              {question.category || 'General Knowledge'}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold border border-white/10 transition-colors"
                title="Edit this question"
              >
                <span className="material-symbols-outlined text-sm text-primary">edit</span>
                <span>Edit Question</span>
              </button>
              <span className="text-xs text-slate-400 font-semibold">
                Potential: <strong className="text-emerald-400 font-bold">+{question.points || 1000} pts</strong>
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white leading-relaxed">
            {question.prompt}
          </h2>

          {question.mediaUrl && (
            <div className="mt-4 rounded-2xl overflow-hidden max-h-48 border border-white/10 shadow-inner">
              <img
                src={question.mediaUrl}
                alt="Question visual"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D', 'E'][idx] || `${idx + 1}`;
            const isSelected = selectedOption === idx;
            const isCorrect = idx === correctIdx;
            const color = optionColors[idx % optionColors.length];

            let stateStyle = `${color.bg} ${color.border} text-white`;

            if (isRevealed) {
              if (isCorrect) {
                stateStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50 scale-[1.02] shadow-lg shadow-emerald-500/20';
              } else if (isSelected && !isCorrect) {
                stateStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 ring-2 ring-rose-500/50 opacity-90';
              } else {
                stateStyle = 'bg-slate-900/40 border-white/5 text-slate-400 opacity-40';
              }
            } else if (isSelected) {
              stateStyle = `${color.bg} ${color.border} ring-2 ${color.ring} scale-[1.01] shadow-lg`;
            }

            return (
              <button
                key={idx}
                disabled={isAnswerLocked || isRevealed}
                onClick={() => handleSelectOption(idx)}
                className={`p-5 rounded-2xl border text-left font-semibold text-base transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${stateStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                      isRevealed && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isRevealed && isSelected && !isCorrect
                        ? 'bg-rose-500 text-white'
                        : color.badge
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="leading-snug">{typeof option === 'string' ? option : option.text}</span>
                </div>

                {/* State indicator */}
                <div>
                  {isRevealed ? (
                    isCorrect ? (
                      <span className="material-symbols-outlined text-emerald-400 text-2xl animate-bounce">
                        check_circle
                      </span>
                    ) : isSelected ? (
                      <span className="material-symbols-outlined text-rose-400 text-2xl">
                        cancel
                      </span>
                    ) : null
                  ) : isSelected ? (
                    <span className="material-symbols-outlined text-primary text-xl animate-spin">
                      progress_activity
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* Revealed Outcome Feedback Banner */}
        {isRevealed && (
          <div className="rounded-2xl p-5 bg-slate-900/95 border border-white/10 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 animate-fade-in shadow-xl">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                  selectedOption === correctIdx
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                <span className="material-symbols-outlined">
                  {selectedOption === correctIdx ? 'celebration' : 'sentiment_dissatisfied'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {selectedOption === correctIdx ? 'Spectacular Answer!' : 'Good Effort!'}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedOption === correctIdx
                    ? `+${question.points || 1000} Base + ${Math.round(timeLeft * 25)} Speed Bonus • Streak active!`
                    : `Correct answer was: ${typeof question.options[correctIdx] === 'string' ? question.options[correctIdx] : (question.options[correctIdx] as any).text}`}
                </p>
                {question.explanation && (
                  <p className="text-[11px] text-slate-400 mt-1 italic">
                    💡 {question.explanation}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Edit Question</span>
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover shadow-md transition-all flex items-center gap-1.5"
              >
                <span>{currentQuestionIdx + 1 >= localQuestions.length ? 'View Final Results' : 'Next Question'}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Audience Toolbar & Reactions */}
      <footer className="relative z-10 bg-slate-900/90 border-t border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
        {/* Host announcement ticker */}
        <div className="flex items-center gap-2 max-w-md truncate text-xs text-slate-400">
          <span className="material-symbols-outlined text-primary text-sm shrink-0">campaign</span>
          <span className="truncate">{broadcastMsg}</span>
        </div>

        {/* Reaction Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">React:</span>
          {['❤️', '🔥', '🎉', '👏', '💡', '😮'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-lg border border-white/5"
              title={`Send ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* Room Info & Exit */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>142 Live Players</span>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            Leave Room
          </button>
        </div>
      </footer>

      {/* Edit Question Modal */}
      {isEditModalOpen && (
        <EditQuestionModal
          isOpen={isEditModalOpen}
          question={question}
          questionIndex={currentQuestionIdx}
          totalQuestions={localQuestions.length}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveQuestion}
        />
      )}
    </div>
  );
};
