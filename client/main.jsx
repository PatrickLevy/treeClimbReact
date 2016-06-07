// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';
//
// import '../imports/startup/accounts-config.js';
//
// import App from '../imports/ui/App.jsx';
//
// Meteor.startup(() => {
//     render(<App />, document.getElementById('render-target'));
// });


import './main.html';
import '/imports/startup/client'; //note that we do not have to specify index.js as this is assumed?  See the Meteor Chef article on React Router