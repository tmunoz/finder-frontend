import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

import Header from './Header.js';
import Map from './Map.js';
import AddLocation from './AddLocation.js';
import ListLocations from './ListLocations.js';
import UserProfile from './UserProfile.js';

import "./Dashboard.scss"
// import "./Map.scss"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#578d95",
      dark: "#002884",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000"
    }
  }
});

const styles = {
  textField: {
    color: "white"
  }
};

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      action: "map",
      id: "",
      name: "",
      email:"",
      password:"",
      locations: [],
      loadingLocations: true,
      searchedAddress: "",
      pointLat: 0,
      pointLng: 0
    }
  }

  handleChange = (action) => {
      this.setState({action});
  }

  handleMapClick (lat, lng) {
    this.setState({
      pointLat: lat,
      pointLng: lng
    });
  }

  handleMapSearch(address, lat, lng){
    this.setState({
      pointLat: lat,
      pointLng: lng,
      searchedAddress: address // TODO: DESPUES DE QUE CREES LA LOCATION LIMPIAR VARIABLE, esta se cambia c/vez que se busca una direccion en el mapa.
    });
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
        } else {
            alert('Ups! ha ocurrido un problema, intenta más tarde')
        }
    })
    .catch(error => {
        alert('Ups! ha ocurrido un problema, intenta más tarde')
        console.log(error)
    })
  }

  componentDidUpdate(){
      fetch('https://apifinder.herokuapp.com/location/user/'+ this.state.id)
      .then(res => res.json())
      .then(resJSON => {
            this.setState({
              locations: resJSON.data,
              loadingLocations: false
            });
      })
  }

  componentDidMount() {
    const token = sessionStorage.getItem("jwtToken");
    const email = parseJwt(token);
    let id = 0;
    fetch('https://apifinder.herokuapp.com/user/info/'+ email.admin)
    .then(response => response.json())
    .then(responseJSON => {
        responseJSON.data.id
        fetch('https://apifinder.herokuapp.com/location/user/'+ responseJSON.data.id)
        .then(res => res.json())
        .then(resJSON => {
              this.setState({
                id: responseJSON.data.id,
                name: responseJSON.data.name,
                email: responseJSON.data.email,
                password: responseJSON.data.password,
                locations: resJSON.data,
                loadingLocations: false
              });
        })
    })
  }

    render(){
        const {action, locations, loadingLocations} = this.state;
        return(
          <div>
            <Header
                handleChange={this.handleChange}
                name={this.state.name}
            />
            {action == 'addLocation' &&
                <AddLocation
                    longitude={this.state.pointLng}
                    latitude={this.state.pointLat}
                    userID={this.state.id}
                />
            }
            {action == 'list' &&
              <ListLocations locations={this.state.locations} handleDeleteLocation = {this.handleDeleteLocation.bind(this)}/>
            }
            {action == 'userProfile' &&
                <UserProfile name={this.state.name} email={this.state.email} />
            }
            {action == 'map' && !loadingLocations &&
                  <Map
                    locations = {locations}
                    handleClickCoords = {this.handleMapClick.bind(this)}
                    handleSearchAddress = {this.handleMapSearch.bind(this)}
                  />
            }


          </div>

        );
    }
}

export default Dashboard;
