import { useState, useEffect, useCallback, useRef } from 'react';
import { DrawingModule } from '../types/types';

interface UseTimerProps {
  module: DrawingModule;
  onComplete?: () => void;
}

export const useTimer = ({ module, onComplete }: UseTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(module.durationMinutes * 60);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<number | null>(null);
  const totalDuration = module.durationMinutes * 60;
  
  const startTimer = useCallback(() => {
    if (isRunning || timeRemaining <= 0) return;
    
    setIsRunning(true);
    setIsPaused(false);
    
    timerRef.current = window.setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isRunning, timeRemaining, onComplete]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsPaused(true);
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeRemaining(totalDuration);
    setProgress(0);
    setIsRunning(false);
    setIsPaused(false);
  }, [totalDuration]);

  // Set progress
  useEffect(() => {
    const calculatedProgress = ((totalDuration - timeRemaining) / totalDuration) * 100;
    setProgress(calculatedProgress);
  }, [timeRemaining, totalDuration]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const updateDuration = (newDurationMinutes: number) => {
    const newTotalDuration = newDurationMinutes * 60;
    setTimeRemaining(newTotalDuration);
  };

  return {
    isRunning,
    isPaused,
    timeRemaining,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    updateDuration
  };
};