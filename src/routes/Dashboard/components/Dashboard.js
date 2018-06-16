import React, { Component } from "react";
import { createMuiTheme } from '@material-ui/core/styles';

import Map from './Map.js'
import SideBar from "./SideBar.js"

import "./Dashboard.scss"

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
      locations: [],
      loadingLocations: true
    }
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
                    locations: resJSON.data,
                    loadingLocations: false
                  });
                  console.log(resJSON.data);
            })
      })
    }

    render(){
        const {locations, loadingLocations} = this.state;
        return(
          <div>
            <div style={{display:"inline"}}>
                <div>
                    <SideBar/>
                </div>
            </div>
            <div style={{marginLeft: '274px'}}>
              {
                !loadingLocations ?
                  <Map locations = {locations}/>
                :
                  <span>Cargando lugares favoritos...</span>
              }
            </div>
          </div>

        );
    }
}

export default Dashboard;
