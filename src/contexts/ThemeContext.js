import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const lightTheme = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  primary: '#007BFF',
  secondary: '#6C757D',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#DEE2E6',
  card: '#FFFFFF',
  accent: '#17A2B8',
  error: '#DC3545',
  success: '#28A745',
  warning: '#FFC107',
};

export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#FF8C00',
  secondary: '#FF6347',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  card: '#1E1E1E',
  accent: '#FFA500',
  error: '#FF6B6B',
  success: '#51CF66',
  warning: '#FFD43B',
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};