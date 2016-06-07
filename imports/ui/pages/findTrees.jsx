import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


// App component - represents the whole app
class FindTrees extends Component {
    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         //hideCompleted: false,
    //     };
    // }
    componentDidMount() {
        console.log("component mounted!");
        GoogleMaps.create({
            name: 'exampleMap',
            element: document.getElementById('exampleMap'),
            options: {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            }
        });
    }

    render() {
        return (
            <div>
                <div id="exampleMap" class="map-container">
                    Let's find a tree!
                </div>
            </div>
        );
    }
}




FindTrees.propTypes = {
    // tasks: PropTypes.array.isRequired,
    // incompleteCount: PropTypes.number.isRequired,
    // currentUser: PropTypes.object,
};

export default createContainer(() => {
    //Meteor.subscribe('tasks');
    return {
        // tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        // incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        // currentUser: Meteor.user(),
    };
}, FindTrees);