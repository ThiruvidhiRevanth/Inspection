import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#007bff',
    background: '#f5f5f5',
    surface: '#ffffff',
    text: '#333333',
    onSurface: '#333333',
    outline: '#ddd',
    error: '#d32f2f',
    errorContainer: '#ffebee',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#4dabf7',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#ffffff',
    onSurface: '#ffffff',
    outline: '#333333',
    error: '#f44336',
    errorContainer: '#5d1a1a',
  },
};

export function ThemeProvider({ children }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [themePreference, setThemePreference] = useState('system');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    if (themePreference === 'system') {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, themePreference]);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem('theme_preference');
      if (saved) {
        const preference = saved;
        setThemePreference(preference);
        if (preference === 'dark') {
          setIsDarkMode(true);
        } else if (preference === 'light') {
          setIsDarkMode(false);
        } else {
          setIsDarkMode(systemColorScheme === 'dark');
        }
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async (preference) => {
    try {
      await AsyncStorage.setItem('theme_preference', preference);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    const newPreference = newMode ? 'dark' : 'light';
    setThemePreference(newPreference);
    saveThemePreference(newPreference);
  };

  const setSystemTheme = () => {
    setThemePreference('system');
    setIsDarkMode(systemColorScheme === 'dark');
    saveThemePreference('system');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    theme,
    themePreference,
    toggleTheme,
    setSystemTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};