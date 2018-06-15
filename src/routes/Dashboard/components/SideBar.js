import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

import "./Dashboard.scss"

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SideBar extends Component{
    state = {
        open: true,
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
                    <Button fullWidth onClick={this.handleOpen.bind(this)}>
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

                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={classes.paper}>
                        <h1>Hola Mundo</h1>
                    </div>
                </Modal>
            </div>
        );
    }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
