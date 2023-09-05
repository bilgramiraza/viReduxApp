import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e)=>{
    if(e.key !== 'Enter')  return;
    const trimmedText = e.target.value.trim();
    if(trimmedText){
      dispatch(saveNewTodo(trimmedText));
      setText('');
    }
  };

  return (
    <header className="header">
      <input className="new-todo" placeholder="What we gotta do?" autoFocus={true} value={text} onChange={handleChange} onKeyDown={handleSubmit} />
    </header>
  );
};

export default Header;
