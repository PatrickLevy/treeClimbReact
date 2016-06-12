import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Trees } from '../../api/trees.js';

import AccountsUIWrapper from '../AccountsUIWrapper.jsx';

var treeLocation = Geolocation.latLng();

class AddTree extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Initialize materialize drop-down
        $(document).ready(function() {
            $('select').material_select();
        });
        treeLocation = Geolocation.latLng();
    }

    submitTree(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const treeName = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const treeDescription = ReactDOM.findDOMNode(this.refs.descriptionInput).value.trim();
        const treeRating = ReactDOM.findDOMNode(this.refs.ratingInput).value.trim();

        //Use a promise to determine the location
        //Todo - it seems like the while loop should be unnecessary!!!

        var p1 = new Promise (function (resolve, reject) {

                var endTime = moment().add(10, 'seconds'); //seconds
                while (!treeLocation && moment().isBefore(endTime)) {
                    treeLocation = Geolocation.latLng();
                }

                if(treeLocation){
                    resolve(treeLocation);
                }
                else {
                    reject("treeLocation can not be determined");
                }
            }
        );
        p1.then(function(val) {
                console.log("val", val);
                console.log("Submit was clicked", treeName);
                console.log(treeName);
                console.log(treeDescription);
                console.log(treeRating);
                console.log(treeLocation);

                //Insert into database
                Meteor.call('trees.insert', treeName, treeDescription, treeRating, treeLocation);

                // Materialize.toast(message, displayLength, className, completeCallback);
                Materialize.toast('New tree saved!', 1000) // 4000 is the duration of the toast
            })
            .catch(function(reason) {
                console.log("Promise was rejected: ", reason);
            });

        //Clear form Todo - the rating form does not seem to return to a default value after submitting
        ReactDOM.findDOMNode(this.refs.nameInput).value = '';
        ReactDOM.findDOMNode(this.refs.descriptionInput).value = '';
        ReactDOM.findDOMNode(this.refs.ratingInput).value = '';


    }

    render() {

        //do javascript here

        return (
            <div>
                <h5>Add a New Tree</h5>
                <div className="row">

                    <form className="col s12" onSubmit={this.submitTree.bind(this)}>

                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">info_outline</i>
                                <input id="tree_name" type="text" ref="nameInput" className="validate" required/>
                                <label for="tree_name">Give the tree a unique name</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">description</i>
                                <textarea id="textarea1" ref="descriptionInput" className="materialize-textarea" required></textarea>
                                <label for="textarea1">Description of tree</label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">star_rate</i>

                                <select ref="ratingInput" className="select-with-icon">
                                    <option value="" disabled>Rate the tree</option>
                                    <option value="5">★★★★★ Awesome!</option>
                                    <option value="4">★★★★ Pretty Cool</option>
                                    <option value="3">★★★ Average</option>
                                    <option value="2">★★ I've seen better</option>
                                    <option value="1">★ Don't bother...</option>
                                </select>



                                <label>Rate the tree</label>
                            </div>
                        </div>

                        <button className="btn waves-effect waves-light green" type="submit" name="action">Save
                            <i className="material-icons right">save</i>
                        </button>

                    </form>

                </div>
            </div>
        );
    }
}
AddTree.propTypes = {
    // tasks: PropTypes.array.isRequired,
    // incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
    //treeLocation: PropTypes.object
};

export default createContainer(() => {
    Meteor.subscribe('trees');
    return {
        //trees: Trees.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, AddTree);