import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

// Login component
class Login extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h5>Login / Logout</h5>
                <AccountsUIWrapper />
            </div>
        );
    }
}




App.propTypes = {
    //tasks: PropTypes.array.isRequired,
    //incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    Meteor.subscribe('tasks');
    return {
        //tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        //incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, Login);