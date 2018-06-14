import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import User from './components/User';
import Post from './components/Post';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'


ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/:page" component={Home}/>
            <Route  path="/post/:number" component={Post}/>
            <Route  path="/user/:number" component={User}/>
        </div>
    </Router>, document.getElementById('root'));
registerServiceWorker();
