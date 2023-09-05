import { client } from "../../api/client";

const initalState = [
  // { id: 0, text: 'Learn React', completed: true },
  // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  // { id: 2, text: 'Build Fun Stuff', completed: false, color: 'blue' },
];

function todosReducer(state = initalState, action){
  switch(action.type){
    case 'todos/todoAdded':
      return [...state,action.payload];
    case 'todos/todoToggled':
      return state.map(todo => (todo.id === action.payload) ? { ...todo, completed: !todo.completed } : todo );
    case 'todos/colorSelected':
      return state.map(todo=>(todo.id === action.payload.todoId)?{ ...todo, color:action.payload.color } : todo);
    case 'todos/todoDeleted':
      return state.filter(todo=>todo.id!==action.payload);
    case 'todos/allCompleted':
      return state.map(todo=>({...todo,completed:true}));
    case 'todos/completedCleared':
      return state.filter(todo=>!todo.completed);
    case 'todos/todosLoaded': 
      return action.payload;
    default:
      return state;
  }
}

export default todosReducer;

export const todosLoaded = todos => ({ type:'todos/todosLoaded', payload:todos });

export const todosAdded = todos => ({ type:'todos/todosAdded', payload:todos })

export const fetchTodos = () => async dispatch => {
  const response = await client.get('/fakeApi/todos');
  dispatch(todosLoaded(response.todos));
};

export const saveNewTodo = text =>  async dispatch => {
  const response = await client.post('/fakeApi/todos', { todo: { text } });
  dispatch(todosAdded(response.todo));
};
