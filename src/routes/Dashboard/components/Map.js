import React from "react";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import "./Map.scss"
mapboxgl.accessToken = 'pk.eyJ1IjoidG11bm96IiwiYSI6ImNqaWYxeGpxbDAwa3UzdmwzbjltdXpjZXEifQ.r6P1SbkxgT4C7xDgXIXA2w';

if (!('remove' in Element.prototype)) {
  Element.prototype.remove = () => {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: props.locations,
      lat: -26.968657,
      lng: -69.909756
    }
  }

  onPointClick (point){
    this.props.handleClickCoords(point.lat, point.lng);
  }

  onSearchAddress (obj){
    let address = obj.place_name;
    let lng = obj.geometry.coordinates[0];
    let lat = obj.geometry.coordinates[1];
    this.props.handleSearchAddress(address, lat, lng)
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

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom: 5
    });


    const stores = {
      "type": "FeatureCollection",
      "features": features
    };

    this.map.on('load', () => {
      this.map.addSource('single-point', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      });
      this.map.addLayer({
        "id": "searchPoint",
        "source": "single-point",
        "type": "circle",
        "paint": {
          "circle-radius": 8,
          "circle-color": "#B40431",
          'circle-stroke-width': 3,
          'circle-stroke-color': '#fff'
        }
      });

      this.map.addLayer({
        id: 'locations',
        type: 'symbol',
        source: {
          type: 'geojson',
          data: stores
        },
        layout: {
          'icon-image': 'star-15',
          'icon-allow-overlap': true,
        }
      });

      geocoder.on('result', (ev) => {
        this.map.getSource('single-point').setData(ev.result.geometry);
        this.onSearchAddress(ev.result);
      });
    });

    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });

    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    this.map.addControl(geocoder);

    const flyToPoint = (currentFeature) => {
      this.map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
      });
    }

    this.map.on('dblclick', (e)=> {
      var point = {
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [
                      e.lngLat.lng,
                      e.lngLat.lat
                  ]
              },
              "properties": {
                  "id": String(new Date().getTime())
              }
          };
      this.map.getSource('single-point').setData(point.geometry);
      this.onPointClick(e.lngLat);
    });

    this.map.on('click', (e) => {
      const f = this.map.queryRenderedFeatures(e.point, { layers: ['locations'] });
      if (f.length){
        const clickedPoint = f[0];
        flyToPoint(clickedPoint);
        createPopUp(clickedPoint);
      }
    });

    const createPopUp = (currentFeature) => {
      const popUps = document.getElementsByClassName('mapboxgl-popup');
      if (popUps[0]) popUps[0].remove();

      const popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h3>' + currentFeature.properties.name + '</h3>' +
          '<h4>' + currentFeature.properties.address + '</h4>')
        .addTo(this.map);
    }
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
