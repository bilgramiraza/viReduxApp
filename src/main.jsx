import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import './api/server'

import store from './store.js'


// console.log('Initial state: ', store.getState())
//
// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState())
// )
//
// // Now, dispatch some actions
//
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })
//
// store.dispatch({ type: 'todos/todoToggled', payload: 0 })
// store.dispatch({ type: 'todos/todoToggled', payload: 1 })
//
// store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })
//
// store.dispatch({
//   type: 'filters/colorFilterChanged',
//   payload: { color: 'red', changeType: 'added' }
// })
// unsubscribe();
// store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
