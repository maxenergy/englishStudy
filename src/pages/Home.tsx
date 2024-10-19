import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Headphones, MessageCircle, BookA, Bot, Trophy } from 'lucide-react';
import { AuthContext } from '../App';
import Progress from '../components/Progress';
import { useLearningPath } from '../contexts/LearningPathContext';
import { useAchievements } from '../contexts/AchievementContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { recommendations } = useLearningPath();
  const { achievements, unlockedAchievements } = useAchievements();

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to EnglishPro</h1>
        <p className="text-xl mb-8">Please log in to access the learning platform.</p>
        <Link to="/auth" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Login / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to EnglishPro</h1>
      <p className="text-xl mb-8">Enhance your English skills with our comprehensive learning platform.</p>
      <Progress />
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Achievements</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg ${
                unlockedAchievements.includes(achievement.id)
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
              title={achievement.description}
            >
              <span className="text-2xl mr-2">{achievement.icon}</span>
              <span className="font-semibold">{achievement.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Personalized Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <Link
              key={index}
              to={`/${rec.module}`}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{rec.title}</h3>
              <p className="text-gray-600 mb-2">{rec.description}</p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {rec.difficulty}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[
          { path: '/reading', icon: BookOpen, title: 'Reading' },
          { path: '/listening', icon: Headphones, title: 'Listening' },
          { path: '/conversation', icon: MessageCircle, title: 'Conversation' },
          { path: '/vocabulary', icon: BookA, title: 'Vocabulary' },
          { path: '/ai-chat', icon: Bot, title: 'AI Chat' },
        ].map((module) => (
          <Link
            key={module.path}
            to={module.path}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <module.icon className="mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-semibold">{module.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;