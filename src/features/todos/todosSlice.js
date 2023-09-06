import { createSelector } from "reselect";
import { client } from "../../api/client";
import { StatusFilters } from "../filters/filtersSlice";

const initalState = {
  status: 'idle', //idle|loading|success|failed
  entities:[],
  // { id: 0, text: 'Learn React', completed: true },
  // { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
  // { id: 2, text: 'Build Fun Stuff', completed: false, color: 'blue' },
};

function todosReducer(state = initalState, action){
  switch(action.type){
    case 'todos/todosLoading':
      return { 
        ...state,
        status: 'loading',
      };
    case 'todos/todosLoaded': 
      return {
        ...state,
        status: 'idle',
        entities : action.payload,
      };
    case 'todos/todoAdded':
      return { 
        ...state,
        entities : [...state,action.payload],
      };
    case 'todos/todoToggled':
      return {
        ...state,
        entities : state.entities.map(todo => (todo.id === action.payload) ? { ...todo, completed: !todo.completed } : todo )
      };
    case 'todos/colorSelected':
      return {
        ...state,
        entities : state.entities.map(todo=>(todo.id === action.payload.todoId)?{ ...todo, color:action.payload.color } : todo),
      };
    case 'todos/todoDeleted':
      return {
        ...state,
        entities : state.entities.filter(todo=>todo.id!==action.payload),
      };
    case 'todos/allCompleted':
      return {
        ...state,
        entities : state.entities.map(todo=>({...todo,completed:true})),
      };
    case 'todos/completedCleared':
      return {
        ...state,
        entities : state.entities.filter(todo=>!todo.completed),
      };
    default:
      return state;
  }
}

export default todosReducer;

export const todosLoading = () => ({ type:'todos/todosLoading' });

export const todosLoaded = todos => ({ type:'todos/todosLoaded', payload:todos });

export const todosAdded = todos => ({ type:'todos/todosAdded', payload:todos })

export const todoToggled = todoId => ({ type:'todos/todoToggled', payload:todoId })

export const todoColorSelected = (todoId, color) => ({ type:'todos/colorSelected', payload:{ todoId, color } })

export const todoDeleted = todoId => ({ type:'todos/todoDeleted', payload:todoId })

export const todoAllCompleted = () => ({ type:'todos/allCompleted' })

export const todoClearCompleted = () => ({ type:'todos/completedCleared' })

export const selectTodos = state => state.todos.entities;

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find(todo => todo.id === todoId);
};

export const selectFilters = state => state.filters;

export const fetchTodos = () => async dispatch => {
  dispatch(todosLoading());
  const response = await client.get('/fakeApi/todos');
  dispatch(todosLoaded(response.todos));
};

export const saveNewTodo = text =>  async dispatch => {
  const response = await client.post('/fakeApi/todos', { todo: { text } });
  dispatch(todosAdded(response.todo));
};

export const selectFilteredTodos = createSelector(
  //inputs
  selectTodos,
  selectFilters,
  //output
  (todos, { status, colors }) => {
    const showAllCompletions = status === StatusFilters.All;
    if(showAllCompletions && !(colors.length))  return todos;

    const completedStatus = status === StatusFilters.Completed;

    return todos.filter(todo => {
      const statusMatches = showAllCompletions || (todo.completed === completedStatus);
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  filteredTodos => filteredTodos.map(todo => todo.id),
);
