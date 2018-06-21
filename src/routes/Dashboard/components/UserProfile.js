import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class UserProfile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            statePassword: false,
            newPassword:'',
            confirmPassword:'',
        }
    }

    onClickPassword = () => {
        this.setState({statePassword: true})
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    itsOk = () => {
        const {newPassword, confirmPassword} = this.state;
        if( newPassword === confirmPassword
        && newPassword !== ''){
            return true;
        } else{
            return false;
        }
    }

    onSubmit = () => {
        if(!this.itsOk()){
            alert('Completar ambos campos');
            return console.log('error');
        }

        const data = {
            currentEmail: this.props.email,
            newEmail: this.props.email,
            newPassword: this.state.newPassword,
            newName: this.props.name,
        };

        fetch('https://apifinder.herokuapp.com/user/change/',{
            method: 'PUT',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(resp => {
            if(resp.status == 1){
                alert('Password cambiado correctamente')
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
        return(
            <div className="container-locations">
                <h1> Perfil </h1>
                <Grid container spacing={8} style={{width:"400px"}}>
                    <Grid item xs={12} sm={6} >
                      Usuario:
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {this.props.name}
                    </Grid>
                    <Grid item xs={12} sm={6} >
                      Email:
                    </Grid>
                    <Grid item xs={12} sm={6} >
                      {this.props.email}
                    </Grid>
                    <Grid item xs={12}>
                      <Button fullWidth onClick={this.onClickPassword}>
                        Cambiar contraseña
                      </Button>
                    </Grid>
                </Grid>
                {this.state.statePassword === true &&
                    <Grid container style={{width:"400px"}}>
                        <Grid item xs={12} >
                          <TextField
                            fullWidth
                            id="new-password"
                            label="Nueva Contraseña"
                            type="password"
                            margin="normal"
                            onChange={this.handleChange('newPassword')}
                          />
                        </Grid>
                        <Grid item xs={12} >
                          <TextField
                            fullWidth
                            id="confirm-password"
                            label="Confirmar Contraseña"
                            type="password"
                            margin="normal"
                            onChange={this.handleChange('confirmPassword')}
                          />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='primary' fullWidth onClick={this.onSubmit}>
                              Confirmar
                            </Button>
                        </Grid>
                    </Grid>
                }
            </div>
        );
    }
}

export default UserProfile;
