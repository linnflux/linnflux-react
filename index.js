import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './modules/App'
import style from './style.scss'

import About from './pages/About'
import Home from './pages/Home'
import Login from './modules/Login'
import Repos from './pages/Repos'
import Repo from './modules/Repo'
import Signup from './modules/Signup'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/repos" component={Repos}>
        <Route path="/repos/:userName/:repoName" component={Repo}/>
      </Route>
      <Route path="/about" component={About}/>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
    </Route>
  </Router>
), document.getElementById('app'))
