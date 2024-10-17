import React from "react";
import InputField from "./components/InputField";
import useLocalStorageState from "./hooks/useLocalStorageState";
import SearchBar from "./components/SearchBar";
import ListItem from "./components/ListItem";

function TodoList() {
  const [todoList, setTodoList] = useLocalStorageState("listItem");
  const addItem = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: 'black'
      }}
    >
      <h1 className="page-title">Todo List</h1>
      <InputField addItem={addItem} />
      {todoList.map((todo, index) => {
        return <ListItem key={index} title={todo} />;
      })}
      <SearchBar />
    </div>
  );
}
export default TodoList;
