import { useEffect, useState } from "react";

const useLocalStorageState = (key) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem(key)
    if (savedTodos) {
      setState(savedTodos.split(","))
    }
  }, [key])

  useEffect(() => {
    console.log('Update local storage');
    if (state.length !== 0) {
      localStorage.setItem(key, state)
    }
  }, [state, key])

  return [state, setState];
}

export default useLocalStorageState
