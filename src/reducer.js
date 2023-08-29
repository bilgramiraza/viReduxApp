function nextTodoId(todos){
  const maxId = todos.reduce((maxId,todo)=>Math.max(todo.id,maxId),-1);
  return maxId;
}

const initalState = {
  todos:[
    {id:0, text:'Learn React', completed:true},
    {id:1, text:'Learn Redux', completed:false, color:'purple' },
    {id:2, text:'Build Fun Stuff', completed:false, color:'blue'},
  ],
  filters:{
    status:'All',
    colors:[],
  },
};

function appReducer(state = initalState, action){
  switch(action.type){
    case 'todos/todoAdded':
      return {
        ...state,
        todos:[
          ...state.todos,
          {
            id:nextTodoId(state.todos),
            text:action.payload,
            completed:false,
          },
        ],
      };
    default: 
      return state;
  }
}

export default appReducer;