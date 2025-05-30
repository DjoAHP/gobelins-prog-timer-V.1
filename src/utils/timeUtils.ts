import { format, parse, differenceInSeconds, addMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DrawingModule } from '../types/types';

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours > 0 ? `${hours}:` : '';
  const formattedMinutes = hours > 0 ? minutes.toString().padStart(2, '0') : minutes.toString();
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
};

export const getCurrentTimeString = (): string => {
  return format(new Date(), 'HH:mm:ss', { locale: fr });
};

export const formatTimeHHMM = (date: Date): string => {
  return format(date, 'HH:mm', { locale: fr });
};

export const parseTimeString = (timeString: string): Date => {
  return parse(timeString, 'HH:mm', new Date());
};

export const getModuleEndTime = (module: DrawingModule): string => {
  const startTime = parseTimeString(module.startTime);
  const endTime = addMinutes(startTime, module.durationMinutes);
  return formatTimeHHMM(endTime);
};

export const getTimeRemainingUntilStart = (startTimeString: string): number => {
  const now = new Date();
  const startTime = parseTimeString(startTimeString);
  
  // Set start time to today
  startTime.setFullYear(now.getFullYear());
  startTime.setMonth(now.getMonth());
  startTime.setDate(now.getDate());
  
  // If start time is in the past, return 0
  if (startTime < now) {
    return 0;
  }
  
  return differenceInSeconds(startTime, now);
};

export const getCurrentActiveModule = (modules: DrawingModule[]): DrawingModule | null => {
  const now = new Date();
  
  for (const module of modules) {
    const startTime = parseTimeString(module.startTime);
    startTime.setFullYear(now.getFullYear());
    startTime.setMonth(now.getMonth());
    startTime.setDate(now.getDate());
    
    const endTime = addMinutes(startTime, module.durationMinutes);
    
    if (startTime <= now && now < endTime) {
      return module;
    }
  }
  
  return null;
};

export const getNextModule = (modules: DrawingModule[], currentModuleId: string | null): DrawingModule | null => {
  if (!currentModuleId) {
    return modules[0];
  }
  
  const currentIndex = modules.findIndex(module => module.id === currentModuleId);
  
  if (currentIndex === -1 || currentIndex === modules.length - 1) {
    return null;
  }
  
  return modules[currentIndex + 1];
};