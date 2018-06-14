import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Map from './Map.js'
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from "@material-ui/icons/Search";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import './Dashboard.scss'

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
            <MuiThemeProvider theme={theme}>
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
                <TextField
                  //className={classes.margin}
                  id="input-with-icon-textfield"
                  label="Buscar dirección"
                  inputStyle={styles.textField}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="inherit" />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton color="inherit" aria-label="profile" onClick={() => this.handleProfileSettings()}>
                  <AccountCircle />
                </IconButton>
              </Toolbar>
            </AppBar>
            </MuiThemeProvider>
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
              <span> <Map /> </span>
            </div>
          }
        </div>
        </div>

      );
    }
}


export default User;
