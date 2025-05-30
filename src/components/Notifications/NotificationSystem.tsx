import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useTimerContext } from '../../context/TimerContext';
import { NotificationType } from '../../types/types';

const NotificationSystem: React.FC = () => {
  const { notifications, removeNotification } = useTimerContext();

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return <CheckCircle size={20} className="text-green-400" />;
      case NotificationType.WARNING:
        return <AlertCircle size={20} className="text-amber-400" />;
      case NotificationType.INFO:
        return <Info size={20} className="text-blue-400" />;
      default:
        return <Info size={20} className="text-blue-400" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS:
        return 'border-green-500 bg-green-500 bg-opacity-10';
      case NotificationType.WARNING:
        return 'border-amber-500 bg-amber-500 bg-opacity-10';
      case NotificationType.INFO:
        return 'border-blue-500 bg-blue-500 bg-opacity-10';
      default:
        return 'border-blue-500 bg-blue-500 bg-opacity-10';
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 space-y-4 max-w-md">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`px-4 py-3 rounded-lg backdrop-blur-sm border ${getNotificationColor(
              notification.type
            )} shadow-lg flex items-start gap-3`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-grow text-white">
              {notification.message}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;