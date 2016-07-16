import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Trees } from '../../api/trees.js';

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
                    <Link to="/findTrees/list" activeClassName="active">Switch to list view</Link>
                    <GoogleMap name="mymap" options={this.props.mapOptions} trees={this.props.trees} />
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

//Data Container
export default MapContainer = createContainer(({ params }) => {
    Meteor.subscribe('trees');
    const zoom = 19;
    var currentLocation = Geolocation.latLng();
    console.log("currentLocation", currentLocation);

    //These are the props that will get passed to MyTestMap
    return {
        trees: Trees.find({}, { sort: { createdAt: -1 } }).fetch(),
        loaded: GoogleMaps.loaded() && !!currentLocation && !!Trees.findOne(),
        mapOptions: GoogleMaps.loaded() && !!currentLocation && {center: new google.maps.LatLng(currentLocation.lat, currentLocation.lng), zoom: zoom}
    };
}, TreeMap);


//Google Map Component
class GoogleMap extends Component {

    drawNewMarker(latlng) {
        var latAndLng = {lat: 45, lng: -93};
        var marker = new google.maps.Marker({
            position: latAndLng,
            map: map.instance
        });
    }
    componentDidMount() {
        GoogleMaps.create({
            name: this.props.name,
            element: ReactDOM.findDOMNode(this),
            options: this.props.options
        });

        var trees = this.props.trees;
        GoogleMaps.ready(this.props.name, function(map) {

            //Add location marker to the map
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance,
                title: "Current Location"
            });

            //Add trees from the database to the map
            //var treeIcon = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            var treeIcon = 'favicon.ico'
            _.each(trees, function(tree) {
                console.log(tree);

                var infoContent =   '<div>' +
                                        '<h6>' + tree.treeName + '</h6>' +
                                        '<div>' + 'Description: ' + tree.treeDescription + '</div>' +
                                        '<div>' + 'Rating: ' + tree.treeRating + ' stars' + '</div>' +
                                    '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: infoContent
                });
                var marker = new google.maps.Marker({
                    position: tree.treeLocation,
                    title: tree.treeName,
                    map: map.instance,
                    animation: google.maps.Animation.DROP,
                    icon: treeIcon

                });
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });

            })
        });

        Materialize.toast("Click on a tree to view it's description", 3000);


    }
    componentWillUnmount() {
        if (GoogleMaps.maps[this.props.name]) {
            google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
            delete GoogleMaps.maps[this.props.name];
        }
    }
    render() {
        return <div className="map-container"></div>;
    }
}

GoogleMap.propTypes = {
    name: React.PropTypes.string.isRequired,
        options: React.PropTypes.object.isRequired,
        trees: React.PropTypes.array.isRequired
}

