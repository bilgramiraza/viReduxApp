import PropTypes from 'prop-types';

import { StatusFilters } from '../filters/filtersSlice';
import { availableColors, capitalize } from "../filters/colors";

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
    <div className="filters StatusFilters">
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
  const colors = [];
  const status = StatusFilters.All;
  const todosRemaining = 1;

  const onColorChange = (color, changeType) => console.log('Color Change', { color, changeType });
  const onStatusChange = (status) => console.log('Status Change', status);

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
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
