import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { selectFilteredTodoIds } from "./todosSlice";


const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingState = useSelector(state => state.todos.status);

  if(loadingState === 'loading'){
    return (
      <div className="todo-list">
        <div className="loader"/>
      </div>
    );
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return <ul className="todo-list">{renderedListItems}</ul>;
};

export default TodoList;
