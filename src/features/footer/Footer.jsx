import PropTypes from 'prop-types';

import { StatusFilters, colorFilterChanged, statusFilterChanged } from '../filters/filtersSlice';
import { availableColors, capitalize } from "../filters/colors";
import { useDispatch, useSelector } from 'react-redux';
import { selectTodos, allTodosCompleted, completedTodosCleared } from '../todos/todosSlice';

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's';

  return (
    <div className="todo-count">
      <h5>Remaining todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);
    const className = value === status ? 'selected' : '';

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added';
      onChange(color, changeType);
    };

    return (
      <label key={color}>
        <input type="checkbox" name={color} checked={checked} onChange={handleChange} />
        <span className="color-block" style={{ backgroundColor: color }}></span>
        {capitalize(color)}
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Colors</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  );
};

const Footer = () => {
  const dispatch  = useDispatch();
  const todosRemaining = useSelector(state =>{
    return selectTodos(state).filter(todo => !todo.completed).length;
  });

  const { status, colors } = useSelector(state => state.filters);

  const onColorChange = (color, changeType) => dispatch(colorFilterChanged(color, changeType));
  const onStatusChange = status => dispatch(statusFilterChanged(status));
  const handleAllCompleted = () => dispatch(allTodosCompleted()); 
  const handleDeleteCompleted= () => dispatch(completedTodosCleared()); 

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={ handleAllCompleted }>Mark All Completed</button>
        <button className="button" onClick={ handleDeleteCompleted }>Clear Completed</button>
      </div>
      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
};

export default Footer;

RemainingTodos.propTypes = {
  count:PropTypes.number.isRequired,
};

StatusFilter .propTypes = {
  value:PropTypes.string.isRequired,
  onChange:PropTypes.func.isRequired,
};

ColorFilters.propTypes = {
  value:PropTypes.array.isRequired,
  onChange:PropTypes.func.isRequired,
};
