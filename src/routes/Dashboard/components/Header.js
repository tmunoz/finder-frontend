import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import "./Dashboard.scss";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Header extends Component{

    handleCloseSession = () => {
        sessionStorage.removeItem('jwtToken')
        browserHistory.push('/')
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="containerSidebar">
                <a href="/dashboard"><img className="logo" alt="logo" src="finder.png" /></a>
                <div className="options">
                    <Button className={classes.button} onClick={() => {this.props.handleChange('map')}}>
                        Mapa
                        <Icon className={classes.rightIcon}>location_on</Icon>
                    </Button>

                    <Button className={classes.button} onClick={() => {this.props.handleChange('addLocation')}}>
                        Agregar Lugar
                        <Icon className={classes.rightIcon}>add_circle</Icon>
                    </Button>

                    <Button className={classes.button} onClick={() => {this.props.handleChange('list')}}>
                        Listar
                        <Icon className={classes.rightIcon}>list</Icon>
                    </Button>

                    <Button className={classes.button} onClick={() => {this.props.handleChange('userProfile')}}>
                        {this.props.name}
                        <Icon className={classes.rightIcon}>account_circle</Icon>
                    </Button>

                    <Button className={classes.button} onClick={() => {this.handleCloseSession()}}>
                        <Icon className={classes.rightIcon}>power_settings_new</Icon>
                    </Button>
                </div>
            </div>
        );
    }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)
