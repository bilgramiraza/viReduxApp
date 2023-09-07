import { createSelector } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { StatusFilters } from "../filters/filtersSlice";

const initalState = {
  status: 'idle', //idle|loading|success|failed
  entities:{},
};
//initialState = {
// status:'idle',
// entities:
// {
//  0:{ id: 0, text: 'Learn React', completed: true },
//  1:{ id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
//  2:{ id: 2, text: 'Build Fun Stuff', completed: false, color: 'blue' },
// }
//};

function todosReducer(state = initalState, action){
  switch(action.type){
    case 'todos/todosLoading':
      return { 
        ...state,
        status: 'loading',
      };
    case 'todos/todosLoaded': {
      const newEntities = {};
      action.payload.forEach(todo => {
        newEntities[todo.id] = todo 
      });
      return {
        ...state,
        status: 'idle',
        entities : newEntities,
      };
    }
    case 'todos/todoAdded':{
      const todo = action.payload;
      return { 
        ...state,
        entities : { 
          ...state.entities, 
          [todo.id] : todo,
        },
      };
    }
    case 'todos/todoToggled':{
      const todoId = action.payload;
      const todo = state.entities[todoId];
      return {
        ...state,
        entities : {
          ...state.entities,
          [todoId] : {
            ...todo,
            completed : !todo.completed,
          },
        },
      };
    }
    case 'todos/colorSelected':{
      const { color, todoId } = action.payload;
      const todo = state.entities[todoId];
      return {
        ...state,
        entities : {
          ...state.entities,
          [todoId] : {
            ...todo,
            color,
          },
        },
      };
    }
    case 'todos/todoDeleted':{
      const newEntities = { ...state.entities };
      delete newEntities[action.payload];
      return {
        ...state,
        entities : newEntities,
      };
    }
    case 'todos/allCompleted':{
      const newEntities = { ...state.entities };
      Object.values(newEntities).forEach(todo => {
        newEntities[todo.id] = {
          ...todo,
          completed:true,
        };
      });
      return {
        ...state,
        entities : newEntities,
      };
    }
    case 'todos/completedCleared':{
      const newEntities = { ...state.entities };
      Object.values(newEntities).forEach(todo => {
        if(todo.completed)  delete newEntities[todo.id];
      });
      return {
        ...state,
        entities : newEntities,
      };
    }
    default:
      return state;
  }
}

export default todosReducer;

//Action Creators
export const todosLoading = () => ({ type:'todos/todosLoading' });

export const todosLoaded = todos => ({ type:'todos/todosLoaded', payload:todos });

export const todosAdded = todos => ({ type:'todos/todoAdded', payload:todos })

export const todoToggled = todoId => ({ type:'todos/todoToggled', payload:todoId })

export const todoColorSelected = (todoId, color) => ({ type:'todos/colorSelected', payload:{ todoId, color } })

export const todoDeleted = todoId => ({ type:'todos/todoDeleted', payload:todoId })

export const todoAllCompleted = () => ({ type:'todos/allCompleted' })

export const todoClearCompleted = () => ({ type:'todos/completedCleared' })

//Selectors
const selectTodoEntities = state => state.todos.entities;

export const selectTodos = createSelector(
  selectTodoEntities,
  entities => Object.values(entities)
);

export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId];
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
