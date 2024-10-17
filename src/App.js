import { useState, createContext } from "react";
import './App.css';
import TodoList from "./pages/TodoList";

export const ThemeContext = createContext('dark')

function ThemeProvider({children}) {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

function App() {

  return (
    <ThemeProvider>
      <TodoList/>
    </ThemeProvider>
  );
}

export default App;
