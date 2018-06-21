import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Modal from '@material-ui/core/Modal'

import './Login.scss'

class Login extends Component{

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      password: '',
      loadingLogin: false,
      createUser: false
    }
  }

  handleCreateUser = () => {
    this.setState({ createUser: true })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  checkValuesForm = () => {
    if (this.state.username === '' ||  this.state.password === '')
      return false
    return true
  }

  handleCreateUserOK = () => {
    fetch('https://apifinder.herokuapp.com/user', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "name": this.state.name,
          "email": this.state.username,
          "password": this.state.password
        }),
      })
      .then((response) => response.json())
      .then(responseJSON => {
        console.log(responseJSON.status)
      })
  }

  handleLogin = () => {
    if (this.checkValuesForm()) {
      this.setState({ loadingLogin: true })
      fetch('https://apifinder.herokuapp.com/user/login', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          "email": this.state.username,
          "password": this.state.password
        }),
      })
      .then((response) => response.json())
      .then(responseJSON => {
        if (responseJSON.status == 1) {
            sessionStorage.setItem('jwtToken', responseJSON.token)
            browserHistory.push('/dashboard')
        } else {
            alert(responseJSON.description)
        }
      })
      .catch((error) => {
        alert(error.description)
      })
      this.setState({ loadingLogin: false })
    } else
        console.log('error')
  }

  render(){
    return(
      <div className="bg-login">

      { this.state.createUser == false &&
        
        <div className="content-login">
          { this.state.loadingLogin == true &&
            <div className="content-loading">
              <CircularProgress color="secondary" className="loading-css" />
            </div>
          }
          <Grid container spacing={0}>
            <Grid item lg={12}>
              <img src="logotipo-finder.png" width="100px" />
            </Grid>
          </Grid>
          <form noValidate autoComplete="off">
            <Grid container spacing={0}>
              <Grid item lg={12}>
              <TextField
                  id="username"
                  label="Nombre de usuario"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item lg={12}>
                <TextField
                  id="password"
                  label="Contraseña"
                  type="password"
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Grid container spacing={0}>
              <Grid item lg={12}>
                <Button variant="raised" color="primary" onClick={this.handleLogin}>
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </form>
          <br />
          <button className="btn-create-user" onClick={this.handleCreateUser}>Crear usuario</button>
        </div>

      }

      { this.state.createUser == true &&
        <div>
          
          <div className="content-login">
            <Grid container spacing={0}>
              <Grid item lg={12}>
                <img src="logotipo-finder.png" width="100px" />
                <h4>Crear Usuario</h4>
              </Grid>
            </Grid>
            <form noValidate autoComplete="off">
            <Grid container spacing={0}>
                <Grid item lg={12}>
                <TextField
                    id="name"
                    label="Nombre"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item lg={12}>
                <TextField
                    id="username"
                    label="Email"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item lg={12}>
                  <TextField
                    id="password"
                    label="Contraseña"
                    type="password"
                    onChange={this.handleChange('password')}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item lg={12}>
                  <Button variant="raised" color="primary" onClick={this.handleCreateUserOK}>
                    Crear usuario
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>

        </div>
      }

        
      </div>
    );
  }

}

export default Login
