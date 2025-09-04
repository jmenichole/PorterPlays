import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  name: string;
  avatar?: string;
  discordId: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_DISCORD_IDS = ['1063145938455117826', '1153034319271559328'];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // In a real app, this would be a Discord OAuth flow
    // For demo, logging in as an admin user.
    setUser({ name: 'Porter (Admin)', discordId: '1063145938455117826' });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const isAdmin = user ? ADMIN_DISCORD_IDS.includes(user.discordId) : false;

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
