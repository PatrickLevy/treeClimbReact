import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

App = React.createClass({
    render() {
        return <MapContainer />;
    }
});

class TreeMap extends Component {
    //mixins: [ReactMeteorData],
    componentDidMount() {
        console.log("About to load GoogleMaps...");

        GoogleMaps.load({key: "AIzaSyDnTqJ62KeCAZfZQk244RE5R-HFL1ntQkM"});
    }
    // _mapOptions() {
    //     return {
    //         center: new google.maps.LatLng(45.00, 38.9631),
    //         zoom: 8
    //     };
    // }
    render() {
        if (this.props.loaded)
            return (
                <div>
                    <GoogleMap name="mymap" options={this.props.mapOptions} />
                    <Link to="/findTrees/list" activeClassName="active">Switch to list view</Link>
                </div>
            );

        return (
        <div>
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
            <div>Getting your location and loading map...</div>
        </div>

        );
    }
}

//Validation check for propTypes
TreeMap.propTypes = {
    loaded: React.PropTypes.bool,
    //This validation throws an error because it starts out as a boolean until the map is loaded
    //mapOptions: React.PropTypes.object,
};

export default MapContainer = createContainer(({ params }) => {
    //const { id } = params;
    //const todosHandle = Meteor.subscribe('todos.inList', id);
    //const loading = !todosHandle.ready();
    //const list = Lists.findOne(id);
    //const listExists = !loading && !!list;
    // _mapOptions(){
    //     return {
    //         center: new google.maps.LatLng(-37.8136, 144.9631),
    //         zoom: 8
    //     };
    // }

    // const lat = 45.00;
    // const lng = -93.00;
    const zoom = 8;

    var currentLocation = Geolocation.currentLocation();
    console.log("currentLocation", currentLocation);

    //These are the props that will get passed to MyTestMap
    return {
        loaded: GoogleMaps.loaded() && !!currentLocation,
        mapOptions: GoogleMaps.loaded() && !!currentLocation && {center: new google.maps.LatLng(currentLocation.coords.latitude, currentLocation.coords.longitude), zoom: zoom}
    };
}, TreeMap);

GoogleMap = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        GoogleMaps.create({
            name: this.props.name,
            element: ReactDOM.findDOMNode(this),
            options: this.props.options
        });

        GoogleMaps.ready(this.props.name, function(map) {
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });
        });
    },
    componentWillUnmount() {
        if (GoogleMaps.maps[this.props.name]) {
            google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
            delete GoogleMaps.maps[this.props.name];
        }
    },
    render() {
        return <div className="map-container"></div>;
    }
});

// if (Meteor.isClient) {
//     Meteor.startup(function() {
//         console.log("running the startup function");
//         return render(<App />, document.getElementById('react-root'));
//     });
// }