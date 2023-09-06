import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e)=>{
    const trimmedText = text.trim();
    if(e.key === 'Enter' && trimmedText){
      setStatus('loading');
      await dispatch(saveNewTodo(trimmedText));
      setText('');
      setStatus('idle');
    }
  };

  let isLoading = status === 'loading';
  let placeHolder = isLoading ? '' : 'What we gotta do?';
  let loader = isLoading ? <div className="loader" /> : null;

  return (
    <header className="header">
      <input className="new-todo" placeholder={placeHolder} autoFocus={true} value={text} onChange={handleChange} onKeyDown={handleSubmit} disabled={isLoading}/>
      {loader}
    </header>
  );
};

export default Header;
