import React, { createContext, useState, useContext, useEffect } from 'react';
import { useProgress } from './ProgressContext';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: any) => boolean;
}

interface AchievementContextType {
  achievements: Achievement[];
  unlockedAchievements: string[];
  checkAchievements: () => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

const achievements: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Start your learning journey',
    icon: '🏁',
    condition: (progress) => Object.values(progress).some(value => value > 0)
  },
  {
    id: 'reading_novice',
    title: 'Reading Novice',
    description: 'Reach 25% progress in Reading',
    icon: '📚',
    condition: (progress) => progress.reading >= 25
  },
  {
    id: 'listening_enthusiast',
    title: 'Listening Enthusiast',
    description: 'Reach 50% progress in Listening',
    icon: '🎧',
    condition: (progress) => progress.listening >= 50
  },
  {
    id: 'conversation_master',
    title: 'Conversation Master',
    description: 'Reach 75% progress in Conversation',
    icon: '💬',
    condition: (progress) => progress.conversation >= 75
  },
  {
    id: 'vocabulary_expert',
    title: 'Vocabulary Expert',
    description: 'Reach 100% progress in Vocabulary',
    icon: '📖',
    condition: (progress) => progress.vocabulary >= 100
  },
  {
    id: 'all_rounder',
    title: 'All-Rounder',
    description: 'Reach at least 50% progress in all skills',
    icon: '🌟',
    condition: (progress) => Object.values(progress).every(value => value >= 50)
  }
];

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('unlockedAchievements');
    return saved ? JSON.parse(saved) : [];
  });
  const { progress } = useProgress();

  const checkAchievements = () => {
    const newUnlocked = achievements.filter(
      achievement => !unlockedAchievements.includes(achievement.id) && achievement.condition(progress)
    ).map(achievement => achievement.id);

    if (newUnlocked.length > 0) {
      setUnlockedAchievements(prev => [...prev, ...newUnlocked]);
    }
  };

  useEffect(() => {
    checkAchievements();
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  return (
    <AchievementContext.Provider value={{ achievements, unlockedAchievements, checkAchievements }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};