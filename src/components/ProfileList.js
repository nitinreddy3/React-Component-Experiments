import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { filter, map } from 'lodash';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';

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
}));

const ProfileList = props => {
    const classes = useStyles();
    const { profiles, handleSelect, selectedProfile } = props;

    const filterProfiles = (key) => {
        return filter(profiles, { profileType: key });
    };

    return (
        <div className={classes.root}><h1> Profiles</h1>
            <Paper className={classes.paper}>
                <p style={{ textAlign: 'left' }}>Github</p>
                {map(filterProfiles('github'), item => {
                    return (<ListItem key={item.id}>
                        <Radio
                            checked={selectedProfile.id === item.id}
                            onChange={e => handleSelect(item)}
                            value="b"
                            name="radio-button-demo"
                        />
                        <ListItemText
                            primary={item.repositoryName}
                        />
                    </ListItem>)
                })}
            </Paper>
            <Paper className={classes.paper}>
                <p style={{ textAlign: 'left' }}>Jira</p>
                {map(filterProfiles('jira'), item => {
                    return (<ListItem key={item.id}>
                        <Radio
                            checked={selectedProfile.id === item.id}
                            onChange={e => handleSelect(item)}
                            value="b"
                            name="radio-button-demo"
                        />
                        <ListItemText
                            primary={item.repositoryName}
                        />
                    </ListItem>)
                })}
            </Paper>
        </div>)
};

export default ProfileList;