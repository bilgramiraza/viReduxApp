const initalState = {
  status: 'All',
  colors: [],
};

function filtersReducer(state = initalState, action){
  switch(action.type){
    case 'filters/statusFilterChanged':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}

export default filtersReducer;
