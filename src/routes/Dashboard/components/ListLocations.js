import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import "./ListLocation.scss"

class ListLocations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: props.locations,
        }
    }

    deleteLocation(name, lat, lng){
      this.props.handleDeleteLocation(name,lat,lng);
    }

    render(){
        const {locations} = this.state;
        return(
            <div className="container-locations">
                <br />
                <h1>Listado de Localidades</h1>

                <table>
                    <thead>
                    <tr>
                        <th><h5>Nombre</h5></th>
                        <th><h5>Latitud</h5></th>
                        <th><h5>Longitud</h5></th>
                        <th><h5>Dirección</h5></th>
                        <th><h5></h5></th>
                    </tr>
                    </thead>

                    <tbody>
                        { locations.map((location) => {
                            return(
                                <tr key={location.id.toString()}>
                                    <td><h6>{ location.name }</h6></td>
                                    <td><h6>{ location.latitude }</h6></td>
                                    <td><h6>{ location.longitude }</h6></td>
                                    <td><h6>{ location.address }</h6></td>
                                    <td>
                                      <Button color="secondary" onClick={() => this.deleteLocation(location.name, location.latitude, location.longitude)}>
                                        <Icon>delete</Icon>
                                      </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>


            </div>
        );
    }
}

export default ListLocations;
