import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trees } from '../../api/trees.js';

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

class TreeDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Initialize materialize drop-down
        $(document).ready(function() {
            $('select').material_select();
        });

    }

    render() {

        //do javascript here
        let selectedTree = this.props.selectedTree ? Trees.findOne({_id: this.props.selectedTree}) : Trees.findOne({});
        if(selectedTree){
            return (
                <div>
                    <ul>
                        <li><h5>{selectedTree.treeName}</h5> </li>
                        <li>Rating: {selectedTree.treeRating} </li>
                        <li>Description: {selectedTree.treeDescription} </li>
                    </ul>

                </div>
            );
        }
        else {
            return (
                <div>Please select a tree...</div>
            );
        }

    }
}
TreeDetails.propTypes = {

};

export default createContainer(() => {
    Meteor.subscribe('trees');


    //Additional Props
    return {
        currentUser: Meteor.user(),
        loaded: !!Trees.findOne()
    };
}, TreeDetails);