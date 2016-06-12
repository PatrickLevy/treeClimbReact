import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';
import { Index } from '../../ui/components/index.jsx';

import { One } from '../../ui/pages/one.jsx';
import { Two } from '../../ui/pages/two.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';
import { Hello } from '../../ui/pages/hello.jsx';

import TreeMap from '../../ui/pages/treeMap.jsx';
import { TreeList } from '../../ui/pages/treeList.jsx';

import AddTree from '../../ui/pages/addTree.jsx';

import Login from '../../ui/pages/login.jsx';

//demo putting the todos app on the page
import Todos from '../../ui/App.jsx';


//to test the query params http://localhost:3000/hello/Pat?food=tacos
Meteor.startup( () => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index } />
                <Route path="/findTrees" component={ TreeMap } />
                <Route path="/findTrees/list" component={ TreeList } />
                <Route path="/addTree" component={ AddTree } />
                <Route path="/two" component={ Two } />
                <Route path="/hello/:name" component={ Hello } />
                <Route path="/login" component={ Login } />
            </Route>
            <Route path="*" component={ NotFound } />
        </Router>,
        document.getElementById( 'react-root' )
    );
});