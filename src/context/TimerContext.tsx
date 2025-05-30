import React, { createContext, useContext, useState, useEffect } from 'react';
import { DRAWING_MODULES } from '../data/modules';
import { DrawingModule, Notification, NotificationType } from '../types/types';
import { getCurrentTimeString } from '../utils/timeUtils';

interface TimerContextProps {
  modules: DrawingModule[];
  currentTime: string;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  updateModuleDuration: (moduleId: string, durationMinutes: number) => void;
  findModuleById: (id: string) => DrawingModule | undefined;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const useTimerContext = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimerContext must be used within a TimerProvider');
  }
  return context;
};

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<DrawingModule[]>(DRAWING_MODULES);
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTimeString());
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeString());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    const newNotification = { ...notification, id };
    setNotifications(prev => [...prev, newNotification]);
    
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const updateModuleDuration = (moduleId: string, durationMinutes: number) => {
    setModules(prev => 
      prev.map(module => 
        module.id === moduleId 
          ? { ...module, durationMinutes } 
          : module
      )
    );
  };

  const findModuleById = (id: string) => {
    return modules.find(module => module.id === id);
  };

  return (
    <TimerContext.Provider
      value={{
        modules,
        currentTime,
        notifications,
        addNotification,
        removeNotification,
        updateModuleDuration,
        findModuleById
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};