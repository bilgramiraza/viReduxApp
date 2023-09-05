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

export async function fetchTodos(dispatch, getState){
  const response = await client.get('/fakeApi/todos');
  dispatch({ type:'todos/todosLoaded', payload:response.todos });
}

export function saveNewTodo(text){
  return async (dispatch, getState)=>{
    const response = await client.post('/fakeApi/todos', { todo: { text } });
    dispatch({ type:'todos/todoAdded', payload:response.todo });
  };
}
