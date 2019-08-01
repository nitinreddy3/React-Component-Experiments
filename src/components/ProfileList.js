import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { filter, map, isEqual } from 'lodash';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const ITEM_HEIGHT = 48;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: 20,
    },
    moreBtn: {
        position: "absolute",
        right: 0,
    },
    typography: {
        textAlign: 'left',
        color: 'black'
    }
}));

const ProfileList = props => {
    const classes = useStyles();
    const { profiles, handleSelect, selectedProfile } = props;

    const filterProfiles = (key) => {
        return filter(profiles, { profileType: key });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div className={classes.root}><h1> Profiles</h1>
            <Paper className={classes.paper} disableSticky={false}>
                <Typography className={classes.typography} variant="h6" gutterBottom>
                    Github
                </Typography>
                {map(filterProfiles('github'), item => {
                    return (<ListItem
                        key={item.id}
                        button
                        selected={selectedProfile.id === item.id}
                        onClick={e => handleSelect(item)}
                    >
                        <ListItemText
                            primary={item.repositoryName}
                        />
                    </ListItem>)
                })}
            </Paper>
            <Paper className={classes.paper} disableSticky={false}>
                <Typography className={classes.typography} variant="h6" gutterBottom>
                    Jira
                </Typography>
                {map(filterProfiles('jira'), item => {
                    return (<ListItem key={item.id}
                        button
                        selected={selectedProfile.id === item.id}
                        onClick={e => handleSelect(item)}>
                        <ListItemText
                            primary={item.repositoryName}
                        />
                    </ListItem>)
                })}
            </Paper>
        </div>)
};

export default ProfileList;