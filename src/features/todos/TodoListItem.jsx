import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { availableColors, capitalize } from "../filters/colors";
import TimesSolid from "./TimesSolid";

const selectTodoById = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId);
};

const TodoListItem = ( { id } ) =>{
  const todo = useSelector(state => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => dispatch({ type:'todos/todoToggled', payload:todo.id });

  const handleColorChanged = (e) => dispatch({ type:'todos/colorSelected', payload:{ todoId:todo.id, color:e.target.value } });

  const handleTodoDeleted = () => dispatch({ type:'todos/todoDeleted', payload:todo.id });

  const colorOptions = availableColors.map((c)=>(
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input className="toggle" type="checkbox" checked={completed} onChange={handleCompletedChanged}/>
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select className="colorPicker" value={color} style={{ color }} onChange={handleColorChanged}>
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleTodoDeleted}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;


TodoListItem.propTypes = {
  id:PropTypes.number.isRequired,
};
