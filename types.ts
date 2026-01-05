
export type Role = 'student' | 'working' | 'founder' | 'business';

export interface UserState {
  isLoggedIn: boolean;
  onboardingComplete: boolean;
  profile: {
    age?: number;
    role?: Role;
    financePressure?: number; // 1-5
    interests?: string[];
    confusion?: string;
    emotionScale?: number; // 1-5
  };
  decision?: {
    focus: string;
    path: string;
    timeline: string;
    earningStart: string;
    lockedUntil: string;
    isLocked: boolean;
  };
  tasks: Task[];
  streak: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: 'execution' | 'learning' | 'health';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
