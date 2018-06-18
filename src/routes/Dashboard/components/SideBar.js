import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import "./Dashboard.scss";

class SideBar extends Component{
    state = {
        open: false,
    }

    handleOpen = () => {
        this.setState({open: true});
    }

    handleClose = () => {
        this.setState({open: false});
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="containerSidebar">
                <img className="logo" alt="logo" src="finder.png" width="30%"/>
                <div className="buttons">
                    <Button fullWidth onClick={this.handleOpen}>
                        Agregar
                        <Icon>add</Icon>
                    </Button>
                    <Button fullWidth>
                        Buscar
                        <Icon>location_on</Icon>
                    </Button>
                    <Button fullWidth>
                        Eliminar
                        <Icon>delete_forever</Icon>
                    </Button>
                    <Button fullWidth>
                        Opciones
                        <Icon>tune</Icon>
                    </Button>
                    <Button fullWidth>
                        Salir
                        <Icon>exit_to_app</Icon>
                    </Button>
                </div>
            </div>
        );
    }
}


export default SideBar;
