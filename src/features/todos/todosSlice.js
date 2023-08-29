const initalState = [
  { id: 0, text: 'Learn React', completed: true },
  { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  { id: 2, text: 'Build Fun Stuff', completed: false, color: 'blue' },
];

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

function todosReducer(state = initalState, action){
  switch(action.type){
    case 'todos/todoAdded':
      return [
          ...state,
          {
            id: nextTodoId(state),
            text: action.payload,
            completed: false,
          },
        ];
    case 'todos/todoToggled':
      return state.map(todo => (todo.id === action.payload) ? todo : { ...todo, completed: !todo.completed });
    default:
      return state;
  }
}

export default todosReducer;
