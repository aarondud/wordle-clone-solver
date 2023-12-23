import React, { createContext, useState } from "react";

const ThemeContext = createContext({
  darkTheme: null,
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [darkTheme, setTheme] = useState(false);

  const toggleTheme = () => setTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
