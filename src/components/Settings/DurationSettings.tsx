import React, { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTimerContext } from '../../context/TimerContext';
import { DrawingModule } from '../../types/types';

interface DurationSettingsProps {
  module: DrawingModule;
  onClose: () => void;
}

const DurationSettings: React.FC<DurationSettingsProps> = ({ module, onClose }) => {
  const { updateModuleDuration } = useTimerContext();
  const [duration, setDuration] = useState(module.durationMinutes);

  const handleSave = () => {
    updateModuleDuration(module.id, duration);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-dark-200 backdrop-blur-md bg-opacity-90 p-6 rounded-xl shadow-lg border border-gray-700"
    >
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Clock size={20} />
        Adjust Duration
      </h3>
      
      <div className="mb-4">
        <label htmlFor="duration" className="block text-gray-300 mb-2">
          Duration (minutes):
        </label>
        <input
          id="duration"
          type="number"
          min="1"
          max="180"
          value={duration}
          onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full px-3 py-2 bg-dark-100 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white transition-colors"
        >
          <Save size={18} />
          Save
        </button>
      </div>
    </motion.div>
  );
};

export default DurationSettings;