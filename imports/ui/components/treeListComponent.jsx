import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trees } from '../../api/trees.js';

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

var treeLocation = Geolocation.latLng();

class TreeListComponent extends Component {
    constructor(props) {
        super(props);
    }

    handleSelectedTreeChange(selectedTreeId) {
        this.props.updateSelectedTree(selectedTreeId);
    }

    componentDidMount() {
        //Initialize materialize drop-down
        $(document).ready(function() {
            $('select').material_select();
        });
        treeLocation = Geolocation.latLng();
    }
    renderTrees() {
        return this.props.trees.map( (tree) => (
           <li key={tree._id}>
               <a onClick={this.handleSelectedTreeChange.bind(this, tree._id)} >{tree.treeName}</a>
           </li>
        ));

    }
    render() {

        //do javascript here
        if(this.props.loaded){
            return (
                <div>
                    <ul>
                        {this.renderTrees()}
                    </ul>

                </div>
            );
        }
        else {
            return (
                <div>Loading...</div>
            );
        }

    }
}
TreeListComponent.propTypes = {

};

export default createContainer(() => {
    Meteor.subscribe('trees');

    //Props
    return {
        trees: Trees.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
        loaded: !!Trees.findOne()
    };
}, TreeListComponent);