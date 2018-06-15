<<<<<<< HEAD
import React, { Component } from "react";

import "./Dashboard.scss"

class Map extends Component{
    render(){
        return(
            <div className="containerMap">
                <h1>MAPA</h1>
            </div>
        );
    }
}

=======
import React from "react";
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidG11bm96IiwiYSI6ImNqaWYxeGpxbDAwa3UzdmwzbjltdXpjZXEifQ.r6P1SbkxgT4C7xDgXIXA2w';

class Map extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9'
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };

    return <div style={style} ref={el => this.mapContainer = el} />;
  }
}



>>>>>>> c0e4c102f0904ff3f4223fafd79d0e20510cdb0e
export default Map;
