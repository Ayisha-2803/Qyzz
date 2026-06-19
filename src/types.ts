export enum QuestionType {
  MC = "mc",
  TF = "tf"
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: number; // in seconds
  xpReward: number;
  questions: Question[];
  isAiGenerated: boolean;
  rating?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  unlockedAt?: string;
  requirement: string;
}

export interface DailyChallenge {
  id: string;
  text: string;
  target: number;
  current: number;
  xpReward: number;
  completed: boolean;
  type: "play_quiz" | "get_score" | "earn_xp";
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  avatarUrl: string;
  xp: number;
  level: number;
  streak: number;
  highestScore: number;
  quizzesPlayed: number;
  completedQuizIds: string[];
  unlockedBadgeIds: string[];
  createdAt: string;
  lastActiveDate?: string;
  isAdmin?: boolean;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  category: string;
  score: number; // percentage or correct count
  totalQuestions: number;
  correctAnswers: number;
  xpEarned: number;
  duration: number; // in seconds
  accuracy: number; // 0 - 100
  completedAt: string;
}
