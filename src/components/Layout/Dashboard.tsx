import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useTimerContext } from '../../context/TimerContext';
import TabNavigation from '../Tabs/TabNavigation';
import TabContent from '../Tabs/TabContent';
import NotificationSystem from '../Notifications/NotificationSystem';

const Dashboard: React.FC = () => {
  const { modules, activeModuleId, setActiveModuleId, currentTime } = useTimerContext();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  // Keep selectedModuleId in sync with activeModuleId
  useEffect(() => {
    if (activeModuleId && !selectedModuleId) {
      setSelectedModuleId(activeModuleId);
    }
  }, [activeModuleId, selectedModuleId]);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModuleId(moduleId);
  };

  const selectedModule = modules.find(m => m.id === selectedModuleId) || modules[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-400 to-dark-500 text-white">
      {/* Particle Background Effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold text-white">Gobelins Programme /2 (5h)</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-lg backdrop-blur-md">
              <Clock size={18} className="text-primary-400" />
              <span className="text-gray-200 font-mono">{currentTime}</span>
            </div>
          </div>
          
          <TabNavigation onSelectModule={handleSelectModule} />
        </header>
        
        <main>
          {selectedModule && (
            <TabContent 
              key={selectedModule.id}
              module={selectedModule}
              isActive={true}
            />
          )}
        </main>
      </div>
      
      <NotificationSystem />
    </div>
  );
};

export default Dashboard;