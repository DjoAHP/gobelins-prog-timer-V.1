import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div className="w-full h-2 bg-dark-100 rounded-full overflow-hidden mt-2">
      <motion.div
        className="h-full rounded-full"
        style={{ 
          backgroundColor: color,
          width: `${progress}%` 
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default ProgressBar;