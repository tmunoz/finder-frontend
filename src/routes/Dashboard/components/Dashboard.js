import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from "@material-ui/icons/Search";
import './Dashboard.scss'

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

class Location extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: props.name,
      image: props.image,
      address: props.address,
      latitude: props.latitude,
      longitude: props.longitude,
      updatedAt: props.updatedAt
    }
  }

  render() {
    const {name, image, address, updatedAt} = this.state;
    return(
      <p>
      {name}<br/>
      {image}<br/>
      {address}<br/>
      {updatedAt}<br/>
      </p>
    )
  }
}

class User extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        userID: -1,
        displayOption: 0,
        locations: []
      }
    }

    componentDidMount() {
      const token = sessionStorage.getItem("jwtToken");
      const email = parseJwt(token);
      fetch('http://localhost:5555/user/info/'+ email.admin)
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          userID: responseJSON.data.id
        });
      })
      .then(responseJSON => {
      fetch('http://localhost:5555/location/user/'+ this.state.userID)
      .then(res => res.json())
      .then(resJSON => {
        this.setState({
          locations: resJSON.data
        });
      })
      })
      .catch( error => {
        console.log(':(', error);
      });
    }

    handleDisplayButton = (value) => {
      this.setState({
        displayOption: value
      })
    }

    handleProfileSettings = () => {

    }

    render() {
      const {displayOption, locations} = this.state;
      return (
        <div>
        <div className = "content-dashboard">
          <Grid container spacing={0}>
            <Grid item lg={12}>
            <AppBar position = "static">
              <Toolbar>
                <Grid container spacing={0}>
                  <Button color="inherit" onClick={() => this.handleDisplayButton(0)}>
                    Mapa
                  </Button>
                  <Button color="inherit" onClick={() => this.handleDisplayButton(1)}>
                    Lista
                  </Button>
                </Grid>
                <FormControl className = "directions-searcher">
                  <InputLabel htmlFor="directions-searcher">Buscar</InputLabel>
                  <Input
                    id="direction"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <IconButton color="inherit" aria-label="profile" onClick={() => this.handleProfileSettings()}>
                  <AccountCircle />
                </IconButton>
              </Toolbar>
            </AppBar>
            </Grid>
          </Grid>
        </div>
        <div>
          {
          displayOption ?
              locations.map( (location, ix) =>
                <Location name = {location.name}
                          image = {location.image}
                          address = {location.address}
                          latitude = {location.latitude}
                          longitude = {location.longitude}
                          updatedAt = {location.updatedAt}
                          key = {ix}
                />
              )
            :
            <div>
              <span>Nada aun...</span>
            </div>
          }
        </div>
        </div>

      );
    }
}


export default User;
