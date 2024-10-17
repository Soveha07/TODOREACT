import { useContext } from "react";
import { ThemeContext } from "../App";

const ListItem = ({ title, onDelete }) => {
  const {theme} = useContext(ThemeContext)
  console.log(theme);
  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white'
      }}
    >
      <p>{title}</p>
    </div>
  )
}


export default ListItem
