import React, { useState, useEffect } from 'react';

interface EditNamesModalProps {
  isOpen: boolean;
  hostName: string;
  joinerName: string;
  onClose: () => void;
  onSave: (newHostName: string, newJoinerName: string) => void;
}

export const EditNamesModal: React.FC<EditNamesModalProps> = ({
  isOpen,
  hostName,
  joinerName,
  onClose,
  onSave,
}) => {
  const [currentHost, setCurrentHost] = useState(hostName);
  const [currentJoiner, setCurrentJoiner] = useState(joinerName);

  useEffect(() => {
    setCurrentHost(hostName);
    setCurrentJoiner(joinerName);
  }, [hostName, joinerName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentHost.trim() || currentJoiner.trim()) {
      onSave(
        currentHost.trim() || hostName,
        currentJoiner.trim() || joinerName
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest text-on-surface max-w-md w-full rounded-3xl p-6 sm:p-7 border border-outline-variant/30 shadow-2xl space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">badge</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Edit Display Names</h3>
              <p className="text-xs text-on-surface-variant">Update identity for Host and Joiner views</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Host Name Field */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-primary">podium</span>
                <span>Host Display Name</span>
              </label>
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider px-2 py-0.5 rounded-md bg-primary/10">
                Host Views
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Shown on quiz covers, dashboard greeting, control room, and announcements.
            </p>
            <input
              type="text"
              value={currentHost}
              onChange={(e) => setCurrentHost(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full mt-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary shadow-xs"
              required
            />
          </div>

          {/* Joiner Name Field */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-500">sports_esports</span>
                <span>Joiner / Player Nickname</span>
              </label>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10">
                Player Views
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              Shown on live player HUD, streak announcements, and final leaderboards.
            </p>
            <input
              type="text"
              value={currentJoiner}
              onChange={(e) => setCurrentJoiner(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="w-full mt-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-on-surface focus:outline-none focus:border-primary shadow-xs"
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Save Names</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
