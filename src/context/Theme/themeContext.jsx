import { createContext, useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext({
  darkTheme: false,
  setDarkTheme: () => null,
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = useCallback(() => {
    setDarkTheme((prevTheme) => !prevTheme);
  }, []);

  const contextValue = useMemo(
    () => ({ darkTheme, toggleTheme }),
    [darkTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
