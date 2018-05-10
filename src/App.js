import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // props son los atributos de la clase, aca se llaman propiedades.
  constructor(props){
    // super llama al constructor de la clase padre.
    super(props);
    this.state = {
      name: 'Juan'
    };
    fetch('URL-Backend') // conectarse al Backend
      .then(response => response.json())
      .then(responseJSON => {

      }).catch(error => {

      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
