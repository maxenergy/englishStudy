import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Reading from './pages/Reading';
import Listening from './pages/Listening';
import Conversation from './pages/Conversation';
import Vocabulary from './pages/Vocabulary';
import AIChat from './pages/AIChat';
import Auth from './pages/Auth';
import { ProgressProvider } from './contexts/ProgressContext';
import { LearningPathProvider } from './contexts/LearningPathContext';
import { AchievementProvider } from './contexts/AchievementContext';
import ErrorBoundary from './components/ErrorBoundary';

// ... (AuthContext and other imports remain the same)

function App() {
  // ... (state and useEffect remain the same)

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <ProgressProvider>
          <LearningPathProvider>
            <AchievementProvider>
              <Router>
                <div className="flex flex-col min-h-screen bg-gray-100">
                  <Header />
                  <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                      {/* ... (routes remain the same) */}
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </AchievementProvider>
          </LearningPathProvider>
        </ProgressProvider>
      </AuthContext.Provider>
    </ErrorBoundary>
  );
}

export default App;