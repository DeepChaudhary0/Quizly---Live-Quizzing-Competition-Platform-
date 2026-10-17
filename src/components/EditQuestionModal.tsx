import React, { useState } from 'react';
import { QuizOption, QuizQuestion } from '../types';

interface EditQuestionModalProps {
  isOpen: boolean;
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onClose: () => void;
  onSave: (updatedQuestion: QuizQuestion) => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({
  isOpen,
  question,
  questionIndex,
  totalQuestions,
  onClose,
  onSave,
}) => {
  const [prompt, setPrompt] = useState(question.prompt);
  const [category, setCategory] = useState(question.category || 'General Knowledge');
  const [timeLimit, setTimeLimit] = useState(question.timeLimit || 20);
  const [points, setPoints] = useState(question.points || 1000);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(question.difficulty || 'Medium');
  const [explanation, setExplanation] = useState(question.explanation || '');
  const [options, setOptions] = useState<QuizOption[]>(
    question.options.map((opt, i) => {
      if (typeof opt === 'string') {
        return {
          id: `opt-${i}`,
          label: ['A', 'B', 'C', 'D', 'E'][i] || `${i + 1}`,
          text: opt,
          isCorrect: i === (question.correctIndex ?? 0),
        };
      }
      return { ...opt };
    })
  );

  if (!isOpen) return null;

  const handleOptionTextChange = (idx: number, newText: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === idx ? { ...opt, text: newText } : opt))
    );
  };

  const handleSetCorrect = (idx: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({
        ...opt,
        isCorrect: i === idx,
      }))
    );
  };

  const handleAddOption = () => {
    if (options.length >= 6) return;
    const nextLabel = ['A', 'B', 'C', 'D', 'E', 'F'][options.length] || `${options.length + 1}`;
    setOptions((prev) => [
      ...prev,
      {
        id: `opt-${Date.now()}`,
        label: nextLabel,
        text: `New Option ${nextLabel}`,
        isCorrect: false,
      },
    ]);
  };

  const handleRemoveOption = (idx: number) => {
    if (options.length <= 2) return;
    const remaining = options.filter((_, i) => i !== idx);
    // ensure at least one is correct
    if (!remaining.some((o) => o.isCorrect) && remaining.length > 0) {
      remaining[0].isCorrect = true;
    }
    // re-label
    const relabeled = remaining.map((opt, i) => ({
      ...opt,
      label: ['A', 'B', 'C', 'D', 'E', 'F'][i] || `${i + 1}`,
    }));
    setOptions(relabeled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctIndex = options.findIndex((o) => o.isCorrect);
    const updated: QuizQuestion = {
      ...question,
      prompt: prompt.trim() || question.prompt,
      category,
      timeLimit,
      points,
      difficulty,
      explanation,
      options,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-slate-900 text-slate-100 max-w-2xl w-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden my-8 animate-fade-in flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">edit_note</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Edit Question #{questionIndex + 1}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary-200 font-semibold">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Modify prompt, options, answer key, and timing for question {questionIndex + 1} of {totalQuestions}.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Prompt Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <span>Question Prompt</span>
                <span className="text-rose-400">*</span>
              </label>
              <span className="text-slate-400">{prompt.length}/200 characters</span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              required
              placeholder="Enter the question text..."
              className="w-full bg-slate-950 border border-white/10 rounded-2xl p-3.5 text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary leading-relaxed resize-none"
            />
          </div>

          {/* Quick Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Time Limit */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-primary">timer</span>
                Timer
              </label>
              <div className="flex items-center gap-1.5">
                {[15, 20, 30, 45].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setTimeLimit(sec)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      timeLimit === sec
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>

            {/* Points Potential */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-amber-400">monetization_on</span>
                Points
              </label>
              <select
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
              >
                <option value={500}>500 pts (Basic)</option>
                <option value={1000}>1,000 pts (Standard)</option>
                <option value={1500}>1,500 pts (Bonus)</option>
                <option value={2000}>2,000 pts (Double Points)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-indigo-400">speed</span>
                Difficulty
              </label>
              <div className="flex items-center gap-1.5">
                {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      difficulty === diff
                        ? diff === 'Easy'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : diff === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Answer Options & Key Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-200">Answer Options & Correct Key</label>
                <p className="text-[11px] text-slate-400">
                  Click the checkmark circle to designate the verified correct answer.
                </p>
              </div>

              {options.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-primary transition-colors border border-white/10"
                >
                  <span className="material-symbols-outlined text-xs">add</span>
                  Add Choice
                </button>
              )}
            </div>

            <div className="space-y-2.5">
              {options.map((opt, idx) => {
                const isCorrect = opt.isCorrect;
                return (
                  <div
                    key={opt.id || idx}
                    className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                      isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/80 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Letter badge */}
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCorrect ? 'bg-emerald-500 text-white shadow-xs' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {opt.label}
                    </span>

                    {/* Input field */}
                    <input
                      type="text"
                      value={opt.text}
                      onChange={(e) => handleOptionTextChange(idx, e.target.value)}
                      required
                      placeholder={`Option ${opt.label} text`}
                      className="flex-1 bg-transparent border-0 text-xs sm:text-sm font-semibold text-white placeholder:text-slate-500 focus:outline-none"
                    />

                    {/* Toggle correct button */}
                    <button
                      type="button"
                      onClick={() => handleSetCorrect(idx)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : 'bg-white/5 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-300 border border-white/10'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isCorrect ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                      <span>{isCorrect ? 'Correct Key' : 'Set Correct'}</span>
                    </button>

                    {/* Delete option if > 2 */}
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(idx)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove option"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation Section */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs text-primary">lightbulb</span>
              Answer Explanation (Shown after reveal)
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={2}
              placeholder="Why is this answer correct? Provide context for participants..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-primary resize-none leading-relaxed"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 sticky bottom-0 bg-slate-900 pb-1">
            <span className="text-[11px] text-slate-400">
              Changes apply immediately to this question in the active quiz.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Save & Apply Live
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
