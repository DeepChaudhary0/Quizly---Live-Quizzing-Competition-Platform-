import React, { useState } from 'react';
import { ASSETS, MOCK_QUESTIONS } from '../data/mockData';
import { QuizQuestion, ScreenId } from '../types';

import { EditQuestionModal } from '../components/EditQuestionModal';

interface QuizBuilderScreenProps {
  onNavigate: (screen: ScreenId) => void;
  questions?: QuizQuestion[];
  onSaveQuestions?: (questions: QuizQuestion[]) => void;
}

export const QuizBuilderScreen: React.FC<QuizBuilderScreenProps> = ({
  onNavigate,
  questions: propQuestions,
  onSaveQuestions,
}) => {
  const [quizTitle, setQuizTitle] = useState('Introduction to Astrophysics & Planetary Science');
  const [questions, setQuestions] = useState<QuizQuestion[]>(propQuestions || MOCK_QUESTIONS);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [globalSettingsOpen, setGlobalSettingsOpen] = useState(true);
  const [tags, setTags] = useState(['#astronomy', '#science', '#stem', '#trivia']);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [warningToast, setWarningToast] = useState<string | null>(null);

  const activeQuestion = questions[activeQuestionIndex] || questions[0];

  const handleSaveDraft = () => {
    setSavedFeedback(true);
    if (onSaveQuestions) {
      onSaveQuestions(questions);
    }
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleAddQuestion = () => {
    const newQ: QuizQuestion = {
      id: `q-${Date.now()}`,
      type: 'Multiple Choice (Single Answer)',
      timeLimit: 30,
      points: 1000,
      difficulty: 'Medium',
      prompt: 'New Question Prompt',
      options: [
        { id: 'opt-a', label: 'A', text: 'Option A', isCorrect: true },
        { id: 'opt-b', label: 'B', text: 'Option B', isCorrect: false },
        { id: 'opt-c', label: 'C', text: 'Option C', isCorrect: false },
        { id: 'opt-d', label: 'D', text: 'Option D', isCorrect: false },
      ],
      explanation: 'Explanation for correct answer.',
    };
    setQuestions([...questions, newQ]);
    setActiveQuestionIndex(questions.length);
  };

  const updateActiveQuestion = (patch: Partial<QuizQuestion>) => {
    setQuestions((prev) =>
      prev.map((q, idx) => (idx === activeQuestionIndex ? { ...q, ...patch } : q))
    );
  };

  const handleOptionTextChange = (optIndex: number, text: string) => {
    const newOptions = activeQuestion.options.map((opt, i) =>
      i === optIndex ? { ...opt, text } : opt
    );
    updateActiveQuestion({ options: newOptions });
  };

  const setCorrectOption = (optIndex: number) => {
    const newOptions = activeQuestion.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === optIndex,
    }));
    updateActiveQuestion({ options: newOptions });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().startsWith('#') ? tagInput.trim() : `#${tagInput.trim()}`;
      if (!tags.includes(clean)) {
        setTags([...tags, clean]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Sub-header Sticky Metadata & Action Bar */}
      <div className="sticky top-16 z-40 bg-surface-container-lowest shadow-sm border-b border-outline-variant/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Breadcrumb, Title & Auto-save Status */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-on-surface-variant text-xs mb-1">
              <button onClick={() => onNavigate('host-dashboard')} className="hover:text-primary transition-colors cursor-pointer">
                Dashboard
              </button>
              <span className="text-outline">/</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Quizzes</span>
              <span className="text-outline">/</span>
              <span className="text-on-surface font-semibold">New Quiz</span>
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <input
                aria-label="Quiz Title"
                className="text-lg sm:text-xl text-on-surface font-bold bg-transparent hover:bg-surface-container-low focus:bg-surface-container-lowest px-2 py-0.5 -ml-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary truncate max-w-xl transition-all"
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant shrink-0 text-xs">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                <span>{savedFeedback ? 'Saved!' : 'Draft auto-saved 1m ago'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => onNavigate('live-player')}
              className="inline-flex items-center justify-center px-3.5 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors gap-1.5 border border-outline-variant/40 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview Quiz</span>
            </button>
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center px-3.5 h-10 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors gap-1.5 border border-outline-variant/40 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => onNavigate('launch-mode')}
              className="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-primary-container hover:bg-primary text-on-primary text-xs font-semibold shadow-sm hover:shadow transition-all gap-1.5 cursor-pointer"
              type="button"
            >
              <span>Continue to Hosting & Scheduling</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Workspace Container (2-Column Builder Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT COLUMN: Question Navigator Sidebar (~280px) */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
            {/* List Header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-on-surface">Questions</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  {questions.length}
                </span>
              </div>
              <button
                className="text-on-surface-variant hover:text-primary p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                title="Reorder questions"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">swap_vert</span>
              </button>
            </div>

            {/* Question Cards Stack */}
            <div className="flex flex-col gap-2.5">
              {questions.map((q, idx) => {
                const isActive = idx === activeQuestionIndex;
                return (
                  <div
                    key={q.id}
                    onClick={() => setActiveQuestionIndex(idx)}
                    className={`group relative flex flex-col p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border cursor-pointer transition-all ${
                      isActive
                        ? 'border-primary ring-2 ring-primary/20 bg-primary/2'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between text-on-surface-variant text-[11px] mb-1.5">
                      <span className={`font-bold flex items-center gap-1 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {isActive && <span className="material-symbols-outlined text-[14px]">check_circle</span>}
                        Q{idx + 1} • Single Choice
                      </span>
                      <span className="flex items-center gap-1 text-outline">
                        <span className="material-symbols-outlined text-[14px]">timer</span> {q.timeLimit}s
                      </span>
                    </div>
                    <p className="text-xs text-on-surface font-semibold line-clamp-2 mb-2 leading-snug">
                      {q.prompt}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-on-tertiary-fixed-variant bg-tertiary-fixed/30 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {q.points.toLocaleString()} pts
                      </span>
                      <span className="material-symbols-outlined text-outline group-hover:text-primary text-[18px]">
                        drag_indicator
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Question Button */}
            <button
              onClick={handleAddQuestion}
              className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-primary text-xs font-semibold flex items-center justify-center gap-2 border border-outline-variant/60 shadow-xs transition-all group cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110">
                add_circle
              </span>
              <span>Add New Question</span>
            </button>

            {/* Sidebar Utility Actions */}
            <div className="flex flex-col gap-1 pt-1">
              <button
                onClick={() => alert('CSV Template download or upload ready.')}
                className="w-full px-3 py-2 text-left rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low text-xs flex items-center gap-2.5 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">upload_file</span>
                <span>Import from CSV</span>
              </button>
              <button
                onClick={() => {
                  setWarningToast('Curated question bank loaded into drawer.');
                  setTimeout(() => setWarningToast(null), 3000);
                }}
                className="w-full px-3 py-2 text-left rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low text-xs flex items-center gap-2.5 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">auto_stories</span>
                <span>Browse Question Bank</span>
              </button>
              <button
                onClick={() => {
                  setQuestions([...questions].reverse());
                  setActiveQuestionIndex(0);
                }}
                className="w-full px-3 py-2 text-left rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low text-xs flex items-center gap-2.5 transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">shuffle</span>
                <span>Shuffle Question Order</span>
              </button>
            </div>

            {/* Completion Readiness Summary Meter */}
            <div className="mt-2 p-4 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/40 flex flex-col gap-2">
              <div className="flex items-center justify-between text-on-surface">
                <span className="text-xs font-semibold">Quiz Completeness</span>
                <span className="text-xs font-bold text-primary">100%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-full"></div>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-tertiary">check_circle</span>
                <span>{questions.length} of {questions.length} questions fully configured</span>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Active Question Editor Canvas */}
          <div className="flex-1 w-full flex flex-col gap-6 min-w-0">
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/50 p-6 lg:p-8 flex flex-col gap-6">
              {/* Question Configuration Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Type Selector */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-outline font-semibold">Question Type</span>
                    <select
                      value={activeQuestion.type}
                      onChange={(e) => updateActiveQuestion({ type: e.target.value })}
                      className="h-10 pl-3 pr-8 bg-surface-container-lowest rounded-xl text-xs font-medium text-on-surface shadow-xs border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option>Multiple Choice (Single Answer)</option>
                      <option>Multiple Choice (Multi-Select)</option>
                      <option>True or False</option>
                      <option>Numeric Input</option>
                    </select>
                  </div>

                  {/* Time Limit */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-outline font-semibold">Time Limit</span>
                    <select
                      value={activeQuestion.timeLimit}
                      onChange={(e) => updateActiveQuestion({ timeLimit: Number(e.target.value) })}
                      className="h-10 pl-3 pr-8 bg-surface-container-lowest rounded-xl text-xs font-medium text-on-surface shadow-xs border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value={10}>10 Seconds</option>
                      <option value={20}>20 Seconds</option>
                      <option value={30}>30 Seconds</option>
                      <option value={60}>60 Seconds</option>
                      <option value={90}>90 Seconds</option>
                    </select>
                  </div>

                  {/* Points Value */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-outline font-semibold">Points</span>
                    <select
                      value={activeQuestion.points}
                      onChange={(e) => updateActiveQuestion({ points: Number(e.target.value) })}
                      className="h-10 pl-3 pr-8 bg-surface-container-lowest rounded-xl text-xs font-medium text-on-surface shadow-xs border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value={500}>500 Points</option>
                      <option value={1000}>1,000 Points</option>
                      <option value={1500}>1,500 Points</option>
                      <option value={2000}>2,000 Points (Bonus)</option>
                    </select>
                  </div>

                  {/* Difficulty */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-outline font-semibold">Difficulty</span>
                    <select
                      value={activeQuestion.difficulty}
                      onChange={(e) => updateActiveQuestion({ difficulty: e.target.value as any })}
                      className="h-10 pl-3 pr-8 bg-surface-container-lowest rounded-xl text-xs font-medium text-on-surface shadow-xs border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end pb-1">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-hover transition-colors cursor-pointer"
                    title="Open dedicated editor modal for this question"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    <span>Edit in Modal</span>
                  </button>
                  <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-[11px] font-bold tracking-wide uppercase">
                    Question {activeQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
              </div>

              {/* Question Prompt Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                    <span>Question Prompt</span>
                    <span className="text-error">*</span>
                  </label>
                  <span className="text-[11px] text-outline">{activeQuestion.prompt.length} / 180 chars</span>
                </div>
                <textarea
                  className="w-full p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 text-base text-on-surface font-semibold focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline resize-none leading-relaxed"
                  placeholder="Type your question here..."
                  rows={2}
                  value={activeQuestion.prompt}
                  onChange={(e) => updateActiveQuestion({ prompt: e.target.value })}
                />
              </div>

              {/* Media Illustration / Upload Zone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
                <div className="md:col-span-1 h-36 w-full rounded-xl overflow-hidden relative shadow-inner group bg-surface-container">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    alt={activeQuestion.mediaAlt || 'Question visual preview'}
                    src={activeQuestion.mediaUrl || ASSETS.jupiterCover}
                  />
                  <div className="absolute inset-0 bg-inverse-surface/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setShowMediaModal(true)}
                      className="p-2 bg-surface-container-lowest rounded-full text-on-surface shadow-sm hover:text-primary transition-colors cursor-pointer"
                      type="button"
                      title="Change Question Media"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-2 text-on-surface text-sm font-semibold">
                    <span className="material-symbols-outlined text-primary text-[20px]">add_photo_alternate</span>
                    <span>Question Cover Media</span>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Upload diagrams, photos, or astronomical charts to enrich this question. Supported formats: JPG, PNG, WebP (Max 8MB).
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setShowMediaModal(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold shadow-xs border border-outline-variant/40 transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">file_upload</span>
                      <span>Select / Replace Image</span>
                    </button>
                    <button
                      onClick={() => {
                        setWarningToast('Image centered and zoom optimized for all participant screen aspect ratios.');
                        setTimeout(() => setWarningToast(null), 3000);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs font-semibold shadow-xs border border-outline-variant/40 transition-colors cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">crop</span>
                      <span>Auto-Crop / Center</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Answer Options Grid */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base text-on-surface font-bold">Answer Options</h3>
                    <p className="text-xs text-on-surface-variant">Select the checkmark button to designate the verified correct answer.</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-xs text-on-surface-variant">Allow multiple correct answers</span>
                    <input className="sr-only peer" type="checkbox" />
                    <div className="w-10 h-6 bg-surface-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface-container-lowest after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary relative"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeQuestion.options.map((opt, i) => {
                    const isCorrect = opt.isCorrect;
                    return (
                      <div
                        key={opt.id}
                        className={`relative p-4 rounded-2xl flex flex-col gap-3 shadow-xs transition-all border ${
                          isCorrect
                            ? 'bg-surface-container-high border-primary ring-2 ring-primary/20'
                            : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                                isCorrect
                                  ? 'bg-primary text-on-primary'
                                  : 'bg-surface-container-highest text-on-surface-variant'
                              }`}
                            >
                              {opt.label}
                            </span>
                            {isCorrect ? (
                              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                Correct Answer
                              </span>
                            ) : (
                              <span className="text-xs text-on-surface-variant">Incorrect Option</span>
                            )}
                          </div>
                          <button
                            onClick={() => setCorrectOption(i)}
                            className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                              isCorrect
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-container text-secondary hover:bg-primary hover:text-on-primary'
                            }`}
                          >
                            {isCorrect ? 'Active Key' : 'Make Correct'}
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            className="w-full bg-surface-container-lowest px-3 py-2.5 rounded-xl text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-outline-variant/30"
                            type="text"
                            value={opt.text}
                            onChange={(e) => handleOptionTextChange(i, e.target.value)}
                          />
                          <button
                            onClick={() => setCorrectOption(i)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                              isCorrect
                                ? 'bg-primary text-on-primary'
                                : 'bg-surface-container-highest hover:bg-primary hover:text-on-primary text-outline'
                            }`}
                            title="Toggle correct"
                          >
                            <span className="material-symbols-outlined text-[16px]">done</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation & Learning Note Accordion / Field */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">lightbulb</span>
                    <span className="text-xs font-bold text-on-surface">Explanation & Learning Note</span>
                    <span className="text-on-surface-variant text-[11px] hidden sm:inline">
                      (Shown to participants after answering)
                    </span>
                  </div>
                  <span className="text-[11px] text-outline">
                    {activeQuestion.explanation.length} / 300 chars
                  </span>
                </div>
                <textarea
                  className="w-full p-3 rounded-xl bg-surface-container-lowest text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline resize-none shadow-inner leading-relaxed border border-outline-variant/40"
                  rows={2}
                  value={activeQuestion.explanation}
                  onChange={(e) => updateActiveQuestion({ explanation: e.target.value })}
                />
              </div>

              {/* Question Footer Utility Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const duplicated = {
                        ...activeQuestion,
                        id: `q-${Date.now()}`,
                        prompt: `${activeQuestion.prompt} (Copy)`,
                      };
                      setQuestions([...questions, duplicated]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors border border-outline-variant/30 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    <span>Duplicate Question</span>
                  </button>
                  <button
                    onClick={() => {
                      const resetOptions = activeQuestion.options.map((opt, i) => ({
                        ...opt,
                        text: `Option ${opt.label}`,
                        isCorrect: i === 0,
                      }));
                      updateActiveQuestion({ options: resetOptions });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors border border-outline-variant/30 cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                    <span>Reset Answers</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (questions.length <= 1) {
                        setWarningToast('A quiz must have at least one question.');
                        setTimeout(() => setWarningToast(null), 3000);
                        return;
                      }
                      const filtered = questions.filter((_, idx) => idx !== activeQuestionIndex);
                      setQuestions(filtered);
                      setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1));
                      if (onSaveQuestions) {
                        onSaveQuestions(filtered);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-error-container hover:bg-error text-on-error-container hover:text-on-error text-xs font-semibold transition-colors cursor-pointer"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                    <span>Delete Question</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Collapsible Global Quiz Settings Accordion */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/50 p-6 lg:p-8 flex flex-col gap-4">
              <div
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => setGlobalSettingsOpen(!globalSettingsOpen)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">tune</span>
                  </div>
                  <div>
                    <h3 className="text-base text-on-surface font-bold">Global Quiz Configuration</h3>
                    <p className="text-xs text-on-surface-variant">General metadata, audience visibility, and search categorization tags.</p>
                  </div>
                </div>
                <button
                  className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {globalSettingsOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              </div>

              {globalSettingsOpen && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container">
                  {/* Left sub-column: Category & Visibility */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Category</label>
                      <select className="w-full h-11 px-4 bg-surface-container-low rounded-xl text-sm text-on-surface border border-outline-variant/40 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer">
                        <option>General Knowledge</option>
                        <option selected>Science & Nature</option>
                        <option>History & Society</option>
                        <option>Arts & Literature</option>
                        <option>Technology & Code</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Audience Visibility</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          onClick={() => setVisibility('public')}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                            visibility === 'public'
                              ? 'bg-surface-container-high border-primary ring-2 ring-primary/20'
                              : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
                          }`}
                        >
                          <input
                            checked={visibility === 'public'}
                            onChange={() => setVisibility('public')}
                            className="mt-1 text-primary focus:ring-primary"
                            name="visibility"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-on-surface">Public</span>
                            <span className="text-[11px] text-on-surface-variant leading-tight">Discoverable by community</span>
                          </div>
                        </label>
                        <label
                          onClick={() => setVisibility('private')}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                            visibility === 'private'
                              ? 'bg-surface-container-high border-primary ring-2 ring-primary/20'
                              : 'bg-surface-container-low hover:bg-surface-container border-outline-variant/40'
                          }`}
                        >
                          <input
                            checked={visibility === 'private'}
                            onChange={() => setVisibility('private')}
                            className="mt-1 text-primary focus:ring-primary"
                            name="visibility"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-on-surface">Private</span>
                            <span className="text-[11px] text-on-surface-variant leading-tight">PIN or direct link only</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right sub-column: Description & Tags */}
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Public Description</label>
                      <textarea
                        className="w-full p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline resize-none leading-relaxed"
                        rows={3}
                        defaultValue="A comprehensive trivia challenge exploring planetary geology, atmospheric science, and solar system mechanics."
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">Tags & Keywords</label>
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container-low rounded-xl border border-outline-variant/40">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface text-xs font-semibold"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error"
                            >
                              close
                            </button>
                          </span>
                        ))}
                        <input
                          className="bg-transparent text-xs text-on-surface focus:outline-none px-2 py-1 w-28 placeholder:text-outline"
                          placeholder="+ Add tag (Enter)..."
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleAddTag}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Question Modal */}
      {isEditModalOpen && (
        <EditQuestionModal
          isOpen={isEditModalOpen}
          question={activeQuestion}
          questionIndex={activeQuestionIndex}
          totalQuestions={questions.length}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updated) => {
            const updatedList = questions.map((q, idx) => (idx === activeQuestionIndex ? updated : q));
            setQuestions(updatedList);
            if (onSaveQuestions) {
              onSaveQuestions(updatedList);
            }
            setWarningToast(`Question #${activeQuestionIndex + 1} updated successfully!`);
            setTimeout(() => setWarningToast(null), 3000);
          }}
        />
      )}

      {/* Media Selection Modal */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest text-on-surface max-w-xl w-full rounded-3xl p-6 border border-outline-variant/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-on-surface">Choose Question Cover Media</h3>
                <p className="text-xs text-on-surface-variant">Select a preset illustration or enter a custom graphic URL</p>
              </div>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: 'Jupiter Atmosphere', url: ASSETS.jupiterCover },
                { name: 'Ancient Civilizations', url: ASSETS.geoCapitals },
                { name: 'Tech Architecture', url: ASSETS.webArchitecture },
                { name: 'Cinema & Pop', url: ASSETS.popCultureCinema },
                { name: 'Deep Space Nebula', url: ASSETS.deepSpaceNebula },
              ].map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    updateActiveQuestion({ mediaUrl: item.url, mediaAlt: item.name });
                    setShowMediaModal(false);
                  }}
                  className="group rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-primary cursor-pointer relative shadow-xs"
                >
                  <img src={item.url} alt={item.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform" />
                  <div className="p-2 bg-surface-container-low text-[11px] font-semibold truncate text-on-surface">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-on-surface mb-1 block">Or Paste Direct Image URL</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  defaultValue={activeQuestion.mediaUrl || ''}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value;
                      if (val) {
                        updateActiveQuestion({ mediaUrl: val });
                        setShowMediaModal(false);
                      }
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-surface-container rounded-xl border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = (e.currentTarget.previousSibling as HTMLInputElement);
                    if (input?.value) {
                      updateActiveQuestion({ mediaUrl: input.value });
                      setShowMediaModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-hover transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {warningToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border border-white/10 animate-fade-in">
          <span className="material-symbols-outlined text-sm text-primary">info</span>
          <span>{warningToast}</span>
        </div>
      )}
    </div>
  );
};
