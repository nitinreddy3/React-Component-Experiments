import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
    },
    width: {
        width: '100%'
    },
    button: {
        float: 'right',
        marginLeft: 10,
    },
    cancel: {
        backgroundColor: 'red',
        color: 'white'
    }
}));

const Profile = (props) => {
    const classes = useStyles();
    const { profileData, handleChange, handleSubmit, handleClose } = props;
    const { username, profileType, repositoryName, url, password } = profileData;
    return (
        <>
            <TextField
                id="repositoryName"
                className={clsx(classes.margin, classes.textField, classes.width)}
                variant="outlined"
                label="Repository Name"
                value={repositoryName}
                onChange={handleChange}
            />
            <TextField
                id="url"
                className={clsx(classes.margin, classes.textField, classes.width)}
                variant="outlined"
                label="URL"
                value={url}
                onChange={handleChange}
            />
            <TextField
                id="username"
                className={clsx(classes.margin, classes.textField, classes.width)}
                variant="outlined"
                label="Username"
                value={username}
                onChange={handleChange}
            /><TextField
                id="profileType"
                className={clsx(classes.margin, classes.textField, classes.width)}
                variant="outlined"
                label="Profile Type"
                value={profileType}
                onChange={handleChange}
            />
            <TextField
                id="password"
                className={clsx(classes.margin, classes.textField, classes.width)}
                variant="outlined"
                label="Password"
                value={password}
                onChange={handleChange}
            />
            <Button variant="contained" color="primary" className={clsx(classes.button)} onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="contained" className={clsx(classes.button, classes.cancel)} onClick={handleClose}>
                Cancel
            </Button>
        </>
    )
};

Profile.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    profile: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
}

Profile.defaultProps = {
    profile: {}
}

export default Profile;