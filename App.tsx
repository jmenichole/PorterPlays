import React from 'react';
import { useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ForbiddenPage from './pages/ForbiddenPage';
import UpdatesPage from './pages/UpdatesPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import CommunityPage from './pages/CommunityPage';

const App: React.FC = () => {
  const { isAdmin, isLoggedIn } = useAuth();
  
  // Get base path for GitHub Pages deployment
  const basePath = import.meta.env.PROD ? '/PorterPlays' : '';
  
  // Remove base path from pathname to get clean route
  const getCleanPath = (pathname: string) => {
    if (basePath && pathname.startsWith(basePath)) {
      return pathname.slice(basePath.length) || '/';
    }
    return pathname;
  };
  
  const [route, setRoute] = React.useState(getCleanPath(window.location.pathname));

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(getCleanPath(window.location.pathname));
    };
    
    // Listen for navigation changes
    window.addEventListener('popstate', handlePopState);
    
    // Also handle manual URL changes that don't fire popstate
    const currentPath = getCleanPath(window.location.pathname);
    if (route !== currentPath) {
      setRoute(currentPath);
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [route, basePath]);

  // Simple router logic
  if (route === '/admin') {
    // Show admin page if logged in and is an admin, otherwise show forbidden page
    return isLoggedIn && isAdmin ? <AdminPage /> : <ForbiddenPage />;
  }

  if (route === '/updates') {
    return <UpdatesPage />;
  }
  
  if (route === '/leaderboards') {
    return <LeaderboardsPage />;
  }

  if (route === '/community') {
    return <CommunityPage />;
  }

  // Default to home page
  return <HomePage />;
};

export default App;