
import React, { useState, useEffect } from 'react';
import { UserState, Task } from './types';
import LandingPage from './views/LandingPage';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Admin from './views/Admin';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [view, setView] = useState<string>('landing');
  const [user, setUser] = useState<UserState>({
    isLoggedIn: false,
    onboardingComplete: false,
    profile: {},
    tasks: [
      { id: '1', title: 'Plan your day', completed: false, category: 'execution' },
      { id: '2', title: '1 hour skill deep-dive', completed: false, category: 'learning' },
      { id: '3', title: '10 min mindfulness', completed: false, category: 'health' },
    ],
    streak: 0,
  });

  // Simple "Router" based on state for this demo environment
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '');
      setView(hash || 'landing');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView: string) => {
    window.location.hash = `#/${newView}`;
    setView(newView);
  };

  const handleLogin = () => {
    setUser(prev => ({ ...prev, isLoggedIn: true }));
    if (!user.onboardingComplete) {
      navigate('onboarding');
    } else {
      navigate('dashboard');
    }
  };

  const handleOnboardingComplete = (data: any, decision: any) => {
    setUser(prev => ({
      ...prev,
      profile: data,
      decision: decision,
      onboardingComplete: true
    }));
    navigate('dashboard');
  };

  const toggleTask = (id: string) => {
    setUser(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    }));
  };

  const updateMood = (score: number) => {
    setUser(prev => ({
      ...prev,
      profile: { ...prev.profile, emotionScale: score }
    }));
  };

  // Guard routes (except for public landing and admin for demo purposes)
  if (view !== 'landing' && view !== 'login' && view !== 'admin' && !user.isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {user.isLoggedIn && view !== 'onboarding' && view !== 'admin' && <Navigation currentView={view} navigate={navigate} />}
      
      <main className={`${user.isLoggedIn && view !== 'onboarding' && view !== 'admin' ? 'pt-20 pb-24 md:pb-8 max-w-7xl mx-auto px-4' : ''}`}>
        {view === 'landing' && <LandingPage onStart={() => navigate('login')} />}
        {view === 'login' && <Login onLogin={handleLogin} />}
        {view === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
        {view === 'dashboard' && <Dashboard user={user} toggleTask={toggleTask} updateMood={updateMood} navigate={navigate} />}
        {view === 'guide' && <Dashboard user={user} toggleTask={toggleTask} updateMood={updateMood} navigate={navigate} initialTab="guide" />}
        {view === 'tasks' && <Dashboard user={user} toggleTask={toggleTask} updateMood={updateMood} navigate={navigate} initialTab="tasks" />}
        {view === 'progress' && <Dashboard user={user} toggleTask={toggleTask} updateMood={updateMood} navigate={navigate} initialTab="progress" />}
        {view === 'memory' && <Dashboard user={user} toggleTask={toggleTask} updateMood={updateMood} navigate={navigate} initialTab="memory" />}
        {view === 'admin' && <Admin navigate={navigate} />}
      </main>
    </div>
  );
};

export default App;
