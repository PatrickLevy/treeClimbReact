import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { App } from '../../ui/layouts/app.jsx';
import { Index } from '../../ui/components/index.jsx';

import { One } from '../../ui/pages/one.jsx';
import { Two } from '../../ui/pages/two.jsx';
import { NotFound } from '../../ui/pages/not-found.jsx';
import { Hello } from '../../ui/pages/hello.jsx';

import FindTrees from '../../ui/pages/findTrees.jsx';

import exampleMap from '../../ui/pages/exampleMap-updated.jsx';

//demo putting the todos app on the page
import Todos from '../../ui/App.jsx';


//to test the query params http://localhost:3000/hello/Pat?food=tacos
Meteor.startup( () => {
    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index } />
                <Route path="/findTrees" component={ exampleMap } />
                <Route path="/two" component={ Two } />
                <Route path="/hello/:name" component={ Hello } />
                <Route path="/todos" component={ Todos } />
            </Route>
            <Route path="*" component={ NotFound } />
        </Router>,
        document.getElementById( 'react-root' )
    );
});