import React from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidG11bm96IiwiYSI6ImNqaWYxeGpxbDAwa3UzdmwzbjltdXpjZXEifQ.r6P1SbkxgT4C7xDgXIXA2w';


class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: props.locations,
      lat: -70.64,
      lng: -33.47
    }
  }

  componentDidMount() {
    const {locations, lat, lng} = this.state;
    const features = [];
    locations.map((location, ix) => {
      features.push({
        "type": "Feature",
        "properties": {
            "address": location.address,
            "name": location.name
          },
          "geometry": {
            "type": "Point",
            "coordinates": [location.longitude, location.latitude]
          }
      });
    });
    console.log(features);
    console.log(locations);


    // navigator.geolocation.getCurrentPosition(position => {
    //     this.setState({
    //         lat: position.coords.latitude.toFixed(4),
    //         lng: position.coords.longitude.toFixed(4)
    //     });
    //     console.log(lat)
    //     console.log(lng)
    // });
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom: 1.5
    });

    const stores = {
      "type": "FeatureCollection",
      "features": features
    };

    this.map.on('load', () => {
      // Add the data to your map as a layer
      this.map.addLayer({
        id: 'locations',
        type: 'symbol',
        // Add a GeoJSON source containing place coordinates and information.
        source: {
          type: 'geojson',
          data: stores
        },
        layout: {
          'icon-image': 'star-15',
          'icon-allow-overlap': true,
        }
      });
    });
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
  }

  // componentWillUnmount() {
  //   this.map.remove();
  // }

  render() {
    const style = {
      position: 'absolute',
      top: '2px',
      bottom: '10px',
      width: '68%'
    };

    return (
      <div style = {style} ref = {el => this.mapContainer = el}/>
    );
  }
}



export default Map;
