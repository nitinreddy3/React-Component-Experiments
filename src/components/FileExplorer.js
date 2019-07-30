import React, { Component, useState, useEffect } from 'react';
import styled from 'styled-components';
import Tree from './Tree';
import Profile from './Profile';
import Button from '@material-ui/core/Button';
import firebase from '../firebase'; import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ProfileList from './ProfileList';


const StyledFileExplorer = styled.div`
  width: 800px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;  
`;

const TreeWrapper = styled.div`
  width: 250px;
`;

const FileExplorer = (props) => {

  useEffect(() => {
    getResponse();
  }, []);

  const [selectedProfile, setSelectedProfile] = useState({});
  let [nodes, setNodes] = useState({});
  const [profile, setProfile] = useState({
    username: '',
    profileType: '',
    password: '',
    repositoryName: '',
    url: ''
  });

  const [profiles, setProfiles] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    const { id, value } = event.target;
    setProfile({ ...profile, [id]: value });
  };

  const getResponse = () => {
    firebase.firestore().collection('users').onSnapshot((snapshot) => {
      const profiles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setProfiles(profiles);
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.firestore().collection('users').add(profile);
      await getResponse();
      setOpen(false);
    } catch (err) {
      console.log('Error: ', err);
      setOpen(false);
    }
  };

  const handleSelect = async (item) => {
    await setSelectedProfile(item);
    nodes = {};
    nodes = {
      ...nodes, [`/${item.repositoryName}`]: {
        path: `/${item.repositoryName}`,
        type: 'folder',
        isRoot: true,
        children: [],
        apiUrl: `${item.url}/user/orgs`,
      },
    }
    setNodes(nodes);
  };

  return (<Grid container spacing={3}>
    <Grid item xs={12}>
      <Button style={{ float: 'right', marginTop: 10 }} variant="contained" color="primary" onClick={handleOpen}>
        Add user profile
      </Button>
    </Grid>
    <Grid item xs={6} sm={3}>
      {
        profiles.length &&
        <ProfileList profiles={profiles} handleSelect={handleSelect} selectedProfile={selectedProfile} />
      }
    </Grid>
    <Grid item xs={"auto"} sm={9}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a user profile</DialogTitle>
        <DialogContent>
          <Profile profileData={profile} handleChange={handleChange} handleSubmit={handleSubmit} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Tree selectedProfile={selectedProfile} nodes={nodes} setNodes={setNodes} />
    </Grid>
  </Grid>
  )
}

export default FileExplorer;