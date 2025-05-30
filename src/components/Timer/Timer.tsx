import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { useTimer } from '../../hooks/useTimer';
import { useTimerContext } from '../../context/TimerContext';
import { formatTime } from '../../utils/timeUtils';
import ProgressBar from './ProgressBar';
import { DrawingModule, NotificationType } from '../../types/types';

const completionSoundUrl = 'https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3';

interface TimerProps {
  module: DrawingModule;
}

const Timer: React.FC<TimerProps> = ({ module }) => {
  const { addNotification } = useTimerContext();
  const [playCompletionSound] = useSound(completionSoundUrl);

  const handleTimerComplete = () => {
    playCompletionSound();
    addNotification({
      type: NotificationType.SUCCESS,
      message: `Session "${module.name}" completed!`,
      duration: 5000,
    });
  };

  const {
    isRunning,
    isPaused,
    timeRemaining,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
  } = useTimer({
    module,
    onComplete: handleTimerComplete,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-4">
        <motion.div 
          className="text-5xl font-bold text-white mb-2"
          key={timeRemaining}
          initial={{ opacity: 0.8, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {formatTime(timeRemaining)}
        </motion.div>
        
        <ProgressBar progress={progress} color={module.color} />
      </div>
      
      <div className="flex justify-center gap-4">
        {!isRunning && (
          <button
            onClick={startTimer}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg text-white"
          >
            <Play size={18} />
            Start
          </button>
        )}
        
        {isRunning && (
          <button
            onClick={pauseTimer}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 transition-colors rounded-lg text-white"
          >
            <Pause size={18} />
            Pause
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 transition-colors rounded-lg text-white"
        >
          <RefreshCw size={18} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer