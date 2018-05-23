import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import reducers from './reducers'
import APIMiddleware from './middlewares/APIMiddleware'
import * as Actions from './actions'

import Home from './components/presentations/Home'
import HeaderContainer from './components/containers/HeaderContainer'
import IssueListContainer from './components/containers/IssueListContainer'
import IssueContainer from './components/containers/IssueContainer'
import RegisterContainer from './components/containers/RegisterContainer'
import MemberList from './components/presentations/MemberList'
import Member from './components/presentations/Member'
// import { composeWithDevTools } from 'redux-devtools-extension'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const _routerMiddleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    reducers,
    router: routerReducer
  }),
  applyMiddleware(APIMiddleware),
  applyMiddleware(_routerMiddleware),
)

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <HeaderContainer/>
        <Route exact path='/' component={Home} />
        <Route path='/issue' component={IssueListContainer} />
        <Route path='/issue_edit/:id' component={IssueContainer} />
        <Route path='/register' component={RegisterContainer} />
        <Route path='/member' component={MemberList} />
        <Route path='/member/:id' component={Member} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

Promise.resolve()
    .then(() => {
        return Promise.all([
            store.dispatch(Actions.getGroups()),
            store.dispatch(Actions.getYears())
        ])
    })
    .then(() => {
        console.log("src/index.js getProjects");
            store.dispatch(Actions.getProjects())
    })
    .then(() => {
        console.log("src/index.js getGroupUsers");
            store.dispatch(Actions.getGroupUsers())
    })


// Promise.resolve()
//     .then(() => {
//         return Promise.all([
//             new Promise(function(fulfilled, rejected){
//               console.log("getGroups")
//               store.dispatch(Actions.getGroups())
//             }),
//             new Promise(function(fulfilled, rejected){
//               console.log("getYears")
//               store.dispatch(Actions.getYears())
//             })
//         ])
//     })
//     .then(() => {
//         console.log("src/index.js getProjects");
//         return new Promise(function(fulfilled, rejected){
//             store.dispatch(Actions.getProjects())
//         })
//     })
// store.dispatch(Actions.getGroups())
// store.dispatch(Actions.getYears())
