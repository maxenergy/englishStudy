import React, { createContext, useState, useContext, useEffect } from 'react';

interface ProgressContextType {
  progress: {
    reading: number;
    listening: number;
    conversation: number;
    vocabulary: number;
  };
  updateProgress: (module: keyof ProgressContextType['progress'], value: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem('userProgress');
    return savedProgress ? JSON.parse(savedProgress) : {
      reading: 0,
      listening: 0,
      conversation: 0,
      vocabulary: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (module: keyof ProgressContextType['progress'], value: number) => {
    setProgress(prev => ({
      ...prev,
      [module]: Math.min(100, Math.max(0, prev[module] + value))
    }));
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};