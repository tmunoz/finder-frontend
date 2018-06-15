import React, { Component } from "react";

import Map from "./Map.js";
import SideBar from "./SideBar.js"

import "./Dashboard.scss"

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

class Dashboard extends Component {
    state = {
        locations: []
    }

    componentDidMount() {
      const token = sessionStorage.getItem("jwtToken");
      const email = parseJwt(token);
      let id = 0;
      fetch('http://apifinder.herokuapp.com/user/info/'+ email.admin)
      .then(response => response.json())
      .then(responseJSON => {
            responseJSON.data.id
            fetch('https://apifinder.herokuapp.com/location/user/'+ responseJSON.data.id)
            .then(res => res.json())
            .then(resJSON => {
                  this.setState({
                    locations: resJSON.data
                  });
            })
      })
    }

    render(){
        return(
            <div style={{display:"inline"}}>
                <div>
                    <SideBar/>
                </div>
                <div>
                    <Map />
                </div>
            </div>
        );
    }
}

export default Dashboard;
