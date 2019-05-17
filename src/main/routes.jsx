import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Todo from '../todo/todo'
import About from '../about/about'
import Energy from '../energy/energy'

export default props => (
    <Router history={hashHistory}>
        <Route path='/energygraph' component={Energy} />
        <Route path='/todos' component={Todo} />
        <Route path='/about' component={About} />
        <Redirect from='*' to='/energygraph' />
    </Router>
)