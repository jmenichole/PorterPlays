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
  
  // Get the base path from the document or environment
  const getBasePath = () => {
    const base = document.querySelector('base');
    if (base && base.href) {
      return new URL(base.href).pathname;
    }
    // Fallback for production build - check if running on GitHub Pages or similar
    const pathname = window.location.pathname;
    if (pathname.startsWith('/PorterPlays/')) {
      return '/PorterPlays/';
    }
    return '/';
  };

  const getRouteFromPathname = (pathname: string) => {
    const basePath = getBasePath();
    // Remove base path if it exists at the start
    if (pathname.startsWith(basePath)) {
      return pathname.slice(basePath.length - 1); // Keep leading slash
    }
    return pathname;
  };

  const [route, setRoute] = React.useState(getRouteFromPathname(window.location.pathname));

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromPathname(window.location.pathname));
    };
    
    // Listen for navigation changes
    window.addEventListener('popstate', handlePopState);
    
    // Also handle manual URL changes that don't fire popstate
    const currentRoute = getRouteFromPathname(window.location.pathname);
    if (route !== currentRoute) {
      setRoute(currentRoute);
    }
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [route]);

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