import React from 'react';
import { TimerProvider } from './context/TimerContext';
import Dashboard from './components/Layout/Dashboard';

function App() {
  return (
    <TimerProvider>
      <Dashboard />
    </TimerProvider>
  );
}

export default App;