import { useState, useEffect } from "react";
import './App.css';
import InputField from "./components/InputField";
import ListItem from "./components/ListItem";
import SearchBar from "./components/SearchBar";


function App() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    const savedTodos = localStorage.getItem("listItem")
    if (savedTodos) {
      setTodoList(savedTodos.split(","))
    }
  }, [])

  useEffect(() => {
    console.log('Update local storage');
    localStorage.setItem("listItem", todoList)
  }, [todoList])

  useEffect(() => {
    return () => {
      console.log('Component unmount');
    }
  }, )

  const addItem = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const deleteItem = (todoToDelete) => {
    setTodoList(todoList.filter((todo) => todo !== todoToDelete));
  };

return (
    <div className="App">
      <h1 id="todo">Todo List</h1>
      <InputField addItem={addItem} />
      <br />
      {todoList.map((todo) => {
        return (
          <>
            <ListItem
              title={todo}
              deleteItem={() => deleteItem(todo)} 
            />
            <br/>
          </>
        );
      })}
      <br />
      <SearchBar />
    </div>
  );
}

export default App;
