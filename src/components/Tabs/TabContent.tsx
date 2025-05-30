import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import { DrawingModule } from '../../types/types';
import Timer from '../Timer/Timer';
import DurationSettings from '../Settings/DurationSettings';

interface TabContentProps {
  module: DrawingModule;
  isActive: boolean;
}

const TabContent: React.FC<TabContentProps> = ({ module, isActive }) => {
  const [showSettings, setShowSettings] = useState(false);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-6 bg-dark-200 bg-opacity-70 backdrop-blur-md rounded-xl shadow-lg border border-dark-100"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">{module.name}</h2>
          <p className="text-gray-400 mt-1">{module.description}</p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg bg-dark-100 hover:bg-dark-100 text-gray-300 hover:text-white transition-colors"
        >
          <Settings size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showSettings ? (
          <DurationSettings module={module} onClose={() => setShowSettings(false)} />
        ) : (
          <Timer module={module} autoStart={isActive} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TabContent;