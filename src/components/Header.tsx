import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Headphones, MessageCircle, BookA, Bot, User, LogOut } from 'lucide-react';
import { AuthContext } from '../App';

const Header: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex justify-between items-center">
          <li>
            <Link to="/" className="text-2xl font-bold">EnglishPro</Link>
          </li>
          {isAuthenticated ? (
            <div className="flex space-x-4 items-center">
              {[
                { path: '/reading', icon: BookOpen, label: 'Reading' },
                { path: '/listening', icon: Headphones, label: 'Listening' },
                { path: '/conversation', icon: MessageCircle, label: 'Conversation' },
                { path: '/vocabulary', icon: BookA, label: 'Vocabulary' },
                { path: '/ai-chat', icon: Bot, label: 'AI Chat' },
              ].map(({ path, icon: Icon, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`flex items-center hover:text-blue-200 ${isActive(path) ? 'border-b-2 border-white' : ''}`}
                  >
                    <Icon className="mr-1" size={18} /> {label}
                  </Link>
                </li>
              ))}
              <li>
                <button onClick={handleLogout} className="flex items-center hover:text-blue-200 ml-4">
                  <LogOut className="mr-1" size={18} /> Logout
                </button>
              </li>
            </div>
          ) : (
            <li>
              <Link to="/auth" className="flex items-center hover:text-blue-200">
                <User className="mr-1" size={18} /> Login / Register
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;