import React, { createContext, useState, useContext, useEffect } from 'react';
import { useProgress } from './ProgressContext';

interface Recommendation {
  module: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface LearningPathContextType {
  recommendations: Recommendation[];
  updateRecommendations: () => void;
}

const LearningPathContext = createContext<LearningPathContextType | undefined>(undefined);

export const LearningPathProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { progress } = useProgress();

  const updateRecommendations = () => {
    const newRecommendations: Recommendation[] = [];

    // Logic to generate recommendations based on progress
    if (progress.reading < 30) {
      newRecommendations.push({
        module: 'reading',
        title: 'Improve Your Reading Skills',
        description: 'Start with some beginner-level articles to build your foundation.',
        difficulty: 'Beginner'
      });
    } else if (progress.reading < 70) {
      newRecommendations.push({
        module: 'reading',
        title: 'Challenge Your Reading Comprehension',
        description: 'Try some intermediate articles to expand your vocabulary and understanding.',
        difficulty: 'Intermediate'
      });
    }

    if (progress.listening < 40) {
      newRecommendations.push({
        module: 'listening',
        title: 'Enhance Your Listening Skills',
        description: 'Practice with some easy listening exercises to improve your comprehension.',
        difficulty: 'Beginner'
      });
    }

    if (progress.conversation < 50) {
      newRecommendations.push({
        module: 'conversation',
        title: 'Boost Your Speaking Confidence',
        description: 'Engage in simple conversation topics to practice your speaking skills.',
        difficulty: 'Intermediate'
      });
    }

    if (progress.vocabulary < 60) {
      newRecommendations.push({
        module: 'vocabulary',
        title: 'Expand Your Vocabulary',
        description: 'Learn and practice new words to enhance your overall language skills.',
        difficulty: 'Intermediate'
      });
    }

    // Limit to 3 recommendations
    setRecommendations(newRecommendations.slice(0, 3));
  };

  useEffect(() => {
    updateRecommendations();
  }, [progress]);

  return (
    <LearningPathContext.Provider value={{ recommendations, updateRecommendations }}>
      {children}
    </LearningPathContext.Provider>
  );
};

export const useLearningPath = () => {
  const context = useContext(LearningPathContext);
  if (context === undefined) {
    throw new Error('useLearningPath must be used within a LearningPathProvider');
  }
  return context;
};