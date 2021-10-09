import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" component={Home} exact></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/profile" component={Profile}></Route>
        </div>
    </Router>
, document.getElementById('root'))

