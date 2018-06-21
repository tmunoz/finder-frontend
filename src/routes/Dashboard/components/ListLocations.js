import React, { Component } from 'react';
import Button from '@material-ui/core/Button'

import "./ListLocation.scss"

class ListLocations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: props.locations,
            id: props.userid,
            notChanged: true
        }
    }

    componentDidMount(){
      this.setState({
        notChanged: true
      })
    }

    handleDeleteLocation (name, lat, lng) {
      const data = {
        name: name,
        latitude: lat,
        longitude: lng,
        usersId: this.state.id
      };
      fetch('https://apifinder.herokuapp.com/location/erase',{
        method: 'DELETE',
        headers: {
            "content-type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(resp => {
          if(resp.status == 1){
              alert('Lugar eliminado correctamente')
              var arr = []
              for(var i = 0; i<this.state.locations.length;i++){
                if(this.state.locations[i].name !== name &&
                  this.state.locations[i].latitude !== lat &&
                  this.state.locations[i].longitude !== lng){
                    arr.push(this.state.locations[i]);
                  }
              }
              this.setState({
                locations: arr
              })
          } else {
              alert('Ups! ha ocurrido un problema, intenta más tarde')
          }
      })
      .catch(error => {
          alert('Ups! ha ocurrido un problema, intenta más tarde')
          console.log(error)
      })
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
                    </tr>
                    </thead>

                    {this.state.notChanged && <tbody>
                        { locations.map((location) => {
                            return(
                                <tr key={location.id.toString()}>
                                    <td><h6>{ location.name }</h6></td>
                                    <td><h6>{ location.latitude }</h6></td>
                                    <td><h6>{ location.longitude }</h6></td>
                                    <td><h6>{ location.address }</h6></td>
                                    <td>
                                      <Button color="primary" onClick={() => this.handleDeleteLocation(location.name, location.latitude, location.longitude)}>
                                        Borrar
                                      </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    }
                </table>


            </div>
        );
    }
}

export default ListLocations;
