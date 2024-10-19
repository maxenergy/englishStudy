import React from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { BookOpen, Headphones, MessageCircle, BookA } from 'lucide-react';

const Progress: React.FC = () => {
  const { progress } = useProgress();

  const modules = [
    { name: 'Reading', value: progress.reading, icon: BookOpen },
    { name: 'Listening', value: progress.listening, icon: Headphones },
    { name: 'Conversation', value: progress.conversation, icon: MessageCircle },
    { name: 'Vocabulary', value: progress.vocabulary, icon: BookA },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
      <div className="grid grid-cols-2 gap-4">
        {modules.map(({ name, value, icon: Icon }) => (
          <div key={name} className="flex items-center">
            <Icon className="mr-2" size={24} />
            <div className="flex-grow">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{name}</span>
                <span>{value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;