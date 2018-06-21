import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

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
    state = {
        value: 'map',
    }

    handleChange = (value) => {
        this.setState({value});
    }


    render(){
        const { classes } = this.props;
        return(
            <div className="containerSidebar">
                <img className="logo" alt="logo" src="finder.png" />
                <div className="options">
                    <Button className={classes.button} onClick={() => {this.handleChange('map')}}>
                        Mapa
                        <Icon className={classes.rightIcon}>location_on</Icon>
                    </Button>

                    <Button className={classes.button} onClick={() => {this.handleChange('list')}}>
                        Listar
                        <Icon className={classes.rightIcon}>list</Icon>
                    </Button>

                    <TextField
                        className={classes.button}
                        id="input-with-icon-textfield"
                        label="Buscar"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon>search</Icon>
                            </InputAdornment>
                          ),
                        }}
                    />

                    <Button className={classes.button} onClick={() => {this.handleChange('list')}}>
                        <Icon className={classes.rightIcon}>add_circle</Icon>
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