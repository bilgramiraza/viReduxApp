import { applyMiddleware, /* compose, */ createStore } from "redux";
import rootReducer from "./reducer";
import { print1, print2, print3 } from "./exampleAddons/middleware";
// import { includeMeaningOfLife, sayHiOnDispatch } from "./exampleAddons/enhancers";

// const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife);

const middlewareEnhancer = applyMiddleware(print1, print2, print3);

const store = createStore(rootReducer, middlewareEnhancer);

export default store;
