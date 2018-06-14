import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import ReactDOM from 'react-dom'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import './Login.scss'

class Login extends Component{

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loadingLogin: false
    }
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

  handleLogin = () => {
    if (this.checkValuesForm()) {
      this.setState({ loadingLogin: true })
      fetch('http://localhost:5555/user/login', {
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
        </div>
      </div>
    );
  }

}

export default Login
