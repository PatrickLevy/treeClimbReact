import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';

App = React.createClass({
    render() {
        return <MyTestMap />;
    }
});

//NOTE: This file is not being used and can be deleted.
//It uses the older style React.createClass rather than imports and exports

MyTestMap = React.createClass({
    mixins: [ReactMeteorData],
    componentDidMount() {
        GoogleMaps.load();
    },
    getMeteorData() {
        return {
            loaded: GoogleMaps.loaded(),
            mapOptions: GoogleMaps.loaded() && this._mapOptions()
        };
    },
    _mapOptions() {
        return {
            center: new google.maps.LatLng(-37.8136, 144.9631),
            zoom: 8
        };
    },
    render() {
        if (this.data.loaded)
            return <GoogleMap name="mymap" options={this.data.mapOptions} />;

        return <div>Loading map...</div>;
    }
});

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

if (Meteor.isClient) {
    Meteor.startup(function() {
        return render(<App />, document.getElementById('react-root'));
    });
}