import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu } from 'lucide-react';
import { useTimerContext } from '../../context/TimerContext';
import { DrawingModule } from '../../types/types';
import { getModuleEndTime } from '../../utils/timeUtils';

interface TabNavigationProps {
  onSelectModule: (moduleId: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ onSelectModule }) => {
  const { modules, currentTime } = useTimerContext();
  const [selectedModule, setSelectedModule] = useState<DrawingModule>(modules[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleModuleSelect = (module: DrawingModule) => {
    setSelectedModule(module);
    onSelectModule(module.id);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Mobile Dropdown */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-dark-200 bg-opacity-70 backdrop-blur-md rounded-xl text-white"
          style={{ backgroundColor: selectedModule.color, color: '#000' }}
        >
          <div className="flex items-center gap-2">
            <Menu size={20} />
            <span className="font-medium">{selectedModule.name}</span>
          </div>
          <ChevronDown
            size={20}
            className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 py-2 bg-dark-200 backdrop-blur-md rounded-xl shadow-xl border border-dark-100"
            >
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleSelect(module)}
                  className="w-full px-4 py-3 text-left hover:bg-dark-100 transition-colors flex justify-between items-center"
                >
                  <div>
                    <div className="text-white font-medium">{module.name}</div>
                    <div className="text-sm text-gray-400">
                      {module.startTime} - {getModuleEndTime(module)}
                    </div>
                  </div>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: module.color }}
                  />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden lg:flex overflow-x-auto hide-scrollbar gap-2 p-2 bg-dark-300 bg-opacity-70 backdrop-blur-md rounded-xl">
        {modules.map((module) => {
          const isActive = selectedModule.id === module.id;
          const endTime = getModuleEndTime(module);
          
          return (
            <motion.button
              key={module.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleModuleSelect(module)}
              className={`relative flex-shrink-0 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-opacity-90 shadow-lg'
                  : 'bg-dark-200 bg-opacity-50 hover:bg-opacity-70'
              }`}
              style={{
                backgroundColor: isActive ? module.color : undefined,
                color: isActive ? '#000' : '#fff',
              }}
            >
              <div className="text-sm font-medium">{module.name}</div>
              <div className={`text-xs mt-1 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                {module.startTime} - {endTime}
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;