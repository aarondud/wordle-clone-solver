import React, { createContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  darkTheme: null,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [darkTheme, setTheme] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark);
  }, []);

  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
