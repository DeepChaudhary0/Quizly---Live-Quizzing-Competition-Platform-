export type ScreenId =
  | 'home'
  | 'host-dashboard'
  | 'quiz-builder'
  | 'event-details'
  | 'launch-mode'
  | 'events-calendar'
  | 'live-player'
  | 'host-control'
  | 'results-standings';

export interface QuizOption {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  colorClass?: string;
  symbol?: string;
}

export interface QuizQuestion {
  id: string;
  type: string;
  timeLimit: number;
  points: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prompt: string;
  category?: string;
  correctIndex?: number;
  mediaUrl?: string;
  mediaAlt?: string;
  mediaTag?: string;
  options: QuizOption[];
  explanation: string;
}

export interface QuizItem {
  id: string;
  title: string;
  category: string;
  status: 'live' | 'scheduled' | 'draft' | 'completed';
  pin?: string;
  questionCount: number;
  participantsCount?: number;
  registeredCount?: number;
  maxSeats?: number;
  scheduledTime?: string;
  lastEdited?: string;
  winner?: {
    name: string;
    accuracy: number;
  };
  draftProgress?: number;
  activePlayers?: number;
  coverImage?: string;
  hostName?: string;
  isVerifiedHost?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  image: string;
  isLive: boolean;
  pin: string;
  questionCount: number;
  registeredCount: number;
  maxSeats: number;
  organizer: {
    name: string;
    avatar: string;
  };
}

export interface LeaderboardUser {
  rank: number;
  initials: string;
  name: string;
  subtitle: string;
  streak: string;
  streakCount: number;
  correct: number;
  total: number;
  accuracy: number;
  speedBonus: number;
  finalScore: number;
  isCurrentUser?: boolean;
  avatarUrl?: string;
  badge?: string;
  avgSpeed?: string;
}

export interface LeaderboardPlayer {
  rank: number;
  nickname: string;
  avatar: string;
  score: number;
  streak: number;
  accuracy: number;
  speed: string;
}
