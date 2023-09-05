import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import rootReducer from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
// import { print1, print2, print3 } from "./exampleAddons/middleware";
// import { includeMeaningOfLife, sayHiOnDispatch } from "./exampleAddons/enhancers";

// const loggingMiddleware = storeAPI => next => action =>{
//     // console.log('dispatching', action);
//     // let result = next(action);
//     // console.log('next State', storeAPI.getState());
//     // return result;
//     if(action.type === 'todos/todoAdded'){
//         console.log('Async Function Called on todoAdded'); 
//         setTimeout(()=>console.log('Async Function Completed on todoAdded'),1000);
//     }
//     return next(action);
// };
//
// const middlewareEnhancer = applyMiddleware(print1, print2, print3, loggingMiddleware);



// const composedEnhancer = composeWithDevTools(sayHiOnDispatch, includeMeaningOfLife, middlewareEnhancer);
const composedEnhancer = composeWithDevTools(
    applyMiddleware(thunkMiddleware),
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
