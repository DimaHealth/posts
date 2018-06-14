import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import User from './components/User';
import Post from './components/Post';
import {Link} from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom'


ReactDOM.render(
    <Router>
        <div>
            {/*<div>*/}
                {/*<Link to="/">Home </Link>*/}
                {/*<Link to="/post/:number"> POST</Link>*/}
                {/*<Link to="/user"> user</Link>*/}

            {/*</div>*/}
            <Route exact path="/" component={Home}/>
            <Route exact path="/:page" component={Home}/>
            <Route path="/post/:number" component={Post}/>
            <Route path="/user" component={User}/>
        </div>
    </Router>, document.getElementById('root'));
registerServiceWorker();
