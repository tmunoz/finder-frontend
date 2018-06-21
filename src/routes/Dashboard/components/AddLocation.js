import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddLocation extends Component {

    state = {
        address: '',
        name: '',
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    itsOk = () => {
        const {name, address} = this.state;
        if( name === '' || address === ''){
            return false;
        } else{
            return true;
        }
    }

    onSubmit = () => {
        if(!this.itsOk()){
            alert('Completar ambos campos');
            return console.log('error');
        }

        if (this.props.latitude === 0 || this.props.longitude === 0){
            alert('Seleccione la ubicación en el mapa!')
            return console.log('error')
        }

        const data = {
            name: this.state.name,
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            categoriesId: 1,
            usersId: this.props.userID,
            address: this.state.address
        };

        console.log(data)

        fetch('https://apifinder.herokuapp.com/location',{
            method: 'POST',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(resp => {
            if(resp.status == 1){
                alert('Localidad agregada!')
            } else {
                alert('Ups! ha ocurrido un problema, intenta nuevamente')
            }
        })
        .catch(error => {
            alert('Ups! ha ocurrido un problema, intenta nuevamente')
            console.log(error)
        })
    }

    render(){
        return(
            <div  className="container-locations" style={{width:"400px"}}>
                <h2>Add Localidad</h2>
                <TextField
                  fullWidth
                  id="new-location"
                  label="Nombre"
                  type="text"
                  margin="normal"
                  onChange={this.handleChange('name')}
                />
                <TextField
                  fullWidth
                  id="new-address"
                  label="Dirección"
                  type="text"
                  margin="normal"
                  onChange={this.handleChange('address')}
                />
                <Button color='primary' fullWidth onClick={this.onSubmit}>
                  Agregar
                </Button>
            </div>
        );
    }
}

export default AddLocation;
