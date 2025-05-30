export interface DrawingModule {
  id: string;
  name: string;
  durationMinutes: number;
  startTime: string; // In format "HH:MM"
  description: string;
  color: string;
}

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  timeRemaining: number; // in seconds
  totalDuration: number; // in seconds
  progress: number; // 0 to 100
  moduleId: string | null;
}

export enum NotificationType {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // in milliseconds
}