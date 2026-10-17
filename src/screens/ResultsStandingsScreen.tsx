import React, { useState } from 'react';
import { ASSETS, MOCK_LEADERBOARD } from '../data/mockData';
import { ScreenId } from '../types';

interface ResultsStandingsScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onPlayAgain: () => void;
  joinerName?: string;
  onUpdateJoinerName?: (name: string) => void;
}

export const ResultsStandingsScreen: React.FC<ResultsStandingsScreenProps> = ({
  onNavigate,
  onPlayAgain,
  joinerName = 'Alex Rivera',
  onUpdateJoinerName,
}) => {
  const [nickname, setNickname] = useState(joinerName);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [tempNick, setTempNick] = useState(joinerName);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  React.useEffect(() => {
    setNickname(joinerName);
    setTempNick(joinerName);
  }, [joinerName]);

  const top1 = MOCK_LEADERBOARD[0];
  const top2 = MOCK_LEADERBOARD[1];
  const top3 = MOCK_LEADERBOARD[2];

  const filteredLeaderboard = MOCK_LEADERBOARD.filter((player) =>
    player.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = () => {
    navigator.clipboard.writeText(
      'I finished #4 out of 186 players on Quizly with 18,450 points! 🏆 Try beating my score: https://quizly.live'
    );
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-24">
      {/* Top Banner Celebration */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-surface text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-outline-variant/30">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-sm">emoji_events</span>
            Tournament Concluded
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Grand Championship Standings
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            The Great Ancient History Trivia Night • 186 Participants • 20 Questions
          </p>

          {/* Top 3 Podium Visual */}
          <div className="pt-10 max-w-2xl mx-auto grid grid-cols-3 gap-3 sm:gap-6 items-end">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={top2.avatar}
                  alt={top2.nickname}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-slate-300 object-cover shadow-xl"
                />
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                  2
                </span>
              </div>
              <span className="font-bold text-xs sm:text-sm text-white truncate max-w-[100px]">
                {top2.nickname}
              </span>
              <span className="font-mono text-xs text-slate-300 font-semibold">
                {top2.score.toLocaleString()} pts
              </span>

              {/* 2nd pedestal */}
              <div className="w-full mt-3 bg-gradient-to-t from-slate-800 to-slate-700/80 rounded-t-2xl h-28 sm:h-36 flex flex-col items-center justify-center border-t-2 border-slate-300/50 shadow-lg">
                <span className="text-2xl font-black text-slate-300">2ND</span>
                <span className="text-[10px] text-slate-400 mt-1">{top2.accuracy}% Acc</span>
              </div>
            </div>

            {/* 1st Place (Center, Tallest) */}
            <div className="flex flex-col items-center -mt-6">
              <div className="relative mb-3">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-amber-400 animate-bounce">
                  <span className="material-symbols-outlined text-3xl">crown</span>
                </div>
                <img
                  src={top1.avatar}
                  alt={top1.nickname}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-amber-400 object-cover shadow-2xl ring-4 ring-amber-400/30"
                />
                <span className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                  1
                </span>
              </div>
              <span className="font-bold text-sm sm:text-base text-amber-300 truncate max-w-[120px]">
                {top1.nickname}
              </span>
              <span className="font-mono text-xs sm:text-sm text-white font-extrabold">
                {top1.score.toLocaleString()} pts
              </span>

              {/* 1st pedestal */}
              <div className="w-full mt-3 bg-gradient-to-t from-amber-600/40 via-amber-500/30 to-amber-400/20 rounded-t-2xl h-36 sm:h-48 flex flex-col items-center justify-center border-t-4 border-amber-400 shadow-2xl relative overflow-hidden">
                <span className="material-symbols-outlined text-amber-400 text-2xl mb-1">trophy</span>
                <span className="text-3xl font-black text-amber-300">CHAMPION</span>
                <span className="text-xs text-amber-200 mt-1 font-semibold">{top1.accuracy}% Accuracy</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="relative mb-3">
                <img
                  src={top3.avatar}
                  alt={top3.nickname}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-amber-700 object-cover shadow-xl"
                />
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                  3
                </span>
              </div>
              <span className="font-bold text-xs sm:text-sm text-white truncate max-w-[100px]">
                {top3.nickname}
              </span>
              <span className="font-mono text-xs text-slate-300 font-semibold">
                {top3.score.toLocaleString()} pts
              </span>

              {/* 3rd pedestal */}
              <div className="w-full mt-3 bg-gradient-to-t from-slate-800 to-amber-900/40 rounded-t-2xl h-24 sm:h-28 flex flex-col items-center justify-center border-t-2 border-amber-700/50 shadow-lg">
                <span className="text-xl font-black text-amber-600">3RD</span>
                <span className="text-[10px] text-slate-400 mt-1">{top3.accuracy}% Acc</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-8 relative z-20">
        {/* Personal Performance Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                    Your Result Card
                  </span>
                  <span className="text-xs text-on-surface-variant font-medium">Top 2.5% Worldwide</span>
                </div>

                {/* Editable Joiner Name Pill */}
                <div className="flex items-center gap-2">
                  {isEditingNickname ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (tempNick.trim()) {
                          setNickname(tempNick.trim());
                          if (onUpdateJoinerName) onUpdateJoinerName(tempNick.trim());
                        }
                        setIsEditingNickname(false);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        type="text"
                        value={tempNick}
                        onChange={(e) => setTempNick(e.target.value)}
                        className="px-2.5 py-1 rounded-xl bg-surface-container border border-primary text-xs font-bold text-on-surface focus:outline-none w-28"
                        autoFocus
                      />
                      <button type="submit" className="p-1 rounded-lg bg-primary text-on-primary text-xs cursor-pointer">
                        <span className="material-symbols-outlined text-sm">check</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTempNick(nickname);
                          setIsEditingNickname(false);
                        }}
                        className="p-1 rounded-lg bg-surface-container text-on-surface text-xs cursor-pointer"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface border border-outline-variant/30 transition-colors cursor-pointer"
                      title="Edit Player Nickname"
                    >
                      <span className="material-symbols-outlined text-xs text-primary">person</span>
                      <span>Player: <strong className="text-primary">{nickname}</strong></span>
                      <span className="material-symbols-outlined text-xs text-outline">edit</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-black text-on-surface">You Finished #4</h2>
                <span className="text-sm text-on-surface-variant font-semibold">out of 186 players</span>
              </div>

              <p className="text-sm text-on-surface-variant max-w-xl">
                Outstanding execution! You answered 18 out of 20 questions correctly, maintaining a 4x answer streak through the midpoint Roman architecture blitz.
              </p>

              {/* Badges Earned */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-on-surface-variant mr-1">Earned Badges:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  Speed Demon (Avg 3.1s)
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                  <span className="material-symbols-outlined text-sm">auto_stories</span>
                  Mesopotamia Master
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <span className="material-symbols-outlined text-sm">local_fire_department</span>
                  Streak Keeper
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-surface-container-low rounded-2xl p-6 border border-outline-variant/20 space-y-4 text-center">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-on-surface-variant">Final Score</span>
                <div className="text-4xl font-black font-mono text-primary mt-1">18,450</div>
                <span className="text-xs text-emerald-600 font-bold">+1,200 Cohort Bonus</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-hover shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copiedShare ? 'check' : 'share'}
                  </span>
                  {copiedShare ? 'Copied Link!' : 'Share Result'}
                </button>

                <button
                  onClick={onPlayAgain}
                  className="py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs border border-outline-variant/30 transition-colors"
                >
                  Replay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cohort Insights Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
            <span className="text-xs text-on-surface-variant font-medium">Cohort Mean Score</span>
            <div className="text-2xl font-black text-on-surface font-mono">14,280</div>
            <span className="text-[11px] text-emerald-600 font-bold">You beat avg by +29%</span>
          </div>

          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
            <span className="text-xs text-on-surface-variant font-medium">Overall Accuracy</span>
            <div className="text-2xl font-black text-on-surface font-mono">74.2%</div>
            <span className="text-[11px] text-on-surface-variant">Your accuracy: 90%</span>
          </div>

          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
            <span className="text-xs text-on-surface-variant font-medium">Hardest Question</span>
            <div className="text-2xl font-black text-on-surface font-mono">Q #14</div>
            <span className="text-[11px] text-rose-500 font-bold">Only 23% correct</span>
          </div>

          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 space-y-1">
            <span className="text-xs text-on-surface-variant font-medium">Avg Response Speed</span>
            <div className="text-2xl font-black text-on-surface font-mono">3.8s</div>
            <span className="text-[11px] text-indigo-500 font-bold">Peak speed on Q7</span>
          </div>
        </div>

        {/* Global Leaderboard Table */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Full Tournament Ranking</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Verified participant scores recorded on the Quizly Hall of Fame.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
                search
              </span>
              <input
                type="text"
                placeholder="Filter players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-outline-variant/20 text-on-surface-variant uppercase tracking-wider text-[11px]">
                  <th className="pb-3 pl-3">Rank</th>
                  <th className="pb-3">Player</th>
                  <th className="pb-3">Accuracy</th>
                  <th className="pb-3">Speed</th>
                  <th className="pb-3">Peak Streak</th>
                  <th className="pb-3 pr-3 text-right">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filteredLeaderboard.map((player) => {
                  const isYou = player.nickname === nickname || player.nickname === 'Alex Rivera';
                  return (
                    <tr
                      key={player.rank}
                      className={`hover:bg-surface-container transition-colors ${
                        isYou ? 'bg-primary/10 font-bold' : ''
                      }`}
                    >
                      <td className="py-3 pl-3">
                        <span
                          className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${
                            player.rank === 1
                              ? 'bg-amber-400 text-slate-950'
                              : player.rank === 2
                              ? 'bg-slate-300 text-slate-950'
                              : player.rank === 3
                              ? 'bg-amber-700 text-white'
                              : 'text-on-surface-variant'
                          }`}
                        >
                          {player.rank}
                        </span>
                      </td>

                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={player.avatar}
                            alt={player.nickname}
                            className="w-8 h-8 rounded-full object-cover border border-outline-variant/30"
                          />
                          <div>
                            <span className="font-bold text-on-surface flex items-center gap-1.5">
                              {isYou ? nickname : player.nickname}
                              {isYou && (
                                <span className="px-1.5 py-0.5 rounded-md bg-primary text-on-primary text-[10px] font-extrabold uppercase">
                                  You
                                </span>
                              )}
                            </span>
                            <span className="text-[10px] text-on-surface-variant font-normal">
                              Tier 1 Scholar
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 font-semibold text-emerald-600">
                        {player.accuracy}%
                      </td>

                      <td className="py-3 font-mono text-on-surface-variant">
                        {player.speed}
                      </td>

                      <td className="py-3">
                        <span className="inline-flex items-center gap-0.5 text-amber-500 font-bold">
                          <span className="material-symbols-outlined text-xs">local_fire_department</span>
                          {player.streak}x
                        </span>
                      </td>

                      <td className="py-3 pr-3 text-right font-mono font-black text-sm text-primary">
                        {player.score.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('events-calendar')}
            className="px-6 py-3.5 rounded-2xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-hover shadow-md transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Browse More Tournaments
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-sm border border-outline-variant/30 transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
