import { createContext, useContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

const DarkModeProvider = function ({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'dark mode'
  );

  const toggleDarkMode = function () {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode', isDarkMode);
      document.documentElement.classList.remove('light-mode', isDarkMode);
    } else {
      document.documentElement.classList.add('light-mode', isDarkMode);
      document.documentElement.classList.remove('dark-mode', isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = function () {
  const context = useContext(DarkModeContext);
  if (!context)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');
  return context;
};

export { DarkModeProvider, useDarkMode };
