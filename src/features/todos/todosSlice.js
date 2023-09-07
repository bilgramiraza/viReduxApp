import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { StatusFilters } from "../filters/filtersSlice";

const initialState = {
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
//

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos', 
  async () => {
    const response = await client.get('/fakeApi/todos');
    return response.todos;
  }
);

export const saveNewTodo = createAsyncThunk(
  'todos/saveNewTodo',
  async text => {
    const response = await client.post('/fakeApi/todos', { todo: { text } });
    return response.todo;
  },
);

const todoSlice = createSlice({
  name:'todos',
  initialState,
  reducers:{
    todoToggled(state,action){
      const todo = state.entities[action.payload];
      todo.completed = !todo.completed;
    },
    todoColorSelected:{
      reducer(state,action){
        const { color, todoId } = action.payload;
        state.entities[todoId].color = color;
      },
      prepare(todoId, color){
        return {
          payload:{ todoId, color },
        };
      },
    },
    todoDeleted(state, action){
      delete state.entities[action.payload];
    },
    allTodosCompleted(state){
      Object.values(state.entities).forEach(todo =>{
        todo.completed = true;
      });
    }, 
    completedTodosCleared(state){
      Object.values(state.entities).forEach(todo =>{
        if(todo.completed)  delete state.entities[todo.id];
      });
    } 
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status ='loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        action.payload.forEach(todo => {
          state.entities[todo.id] = todo;
        });
        state.status ='idle';
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        const todo = action.payload;
        state.entities[todo.id] = todo;
      })
  },
});

export default todoSlice.reducer;

export const { 
  todoToggled, 
  todoColorSelected, 
  todoDeleted,
  allTodosCompleted,
  completedTodosCleared,
} = todoSlice.actions;

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
