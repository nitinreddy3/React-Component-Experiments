import React, { useState, useEffect } from 'react';
import Tree from './Tree';
import Profile from './Profile';
import Button from '@material-ui/core/Button';
import firebase from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Grid from '@material-ui/core/Grid';
import ProfileList from './ProfileList';
import Edit from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty, omit } from 'lodash';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

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

  const [positionVertical, setPositionVertical] = useState(0);
  const [profiles, setProfiles] = useState([]);

  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const [mouseHover, setMouseOver] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };
  const setMouseEnterEvent = async () => {
    await setMouseOver(() => true);
  };

  const setMouseOutEvent = () => {
    setMouseOver(false);
  };

  const handleChange = event => {
    const { id, value } = event.target;
    setProfile({ ...profile, [id]: value });
  };


  const handleChangeEdit = event => {
    const { id, value } = event.target;
    setSelectedProfile({ ...selectedProfile, [id]: value });
  };

  const handleCloseDelete = () => {
    setOpenDeleteModal(false);
  };

  const handleOpenDelete = () => {
    setOpenDeleteModal(true);
  };

  const getResponse = () => {
    firebase.firestore().collection('users').onSnapshot((snapshot) => {
      const profiles = snapshot.docs.map((doc) => ({
        id: doc.id,
        checked: false,
        open: false,
        ...doc.data()
      }))
      setProfiles(profiles);
    })
  };

  const addProfile = async (e) => {
    e.preventDefault();
    try {
      firebase.firestore().collection('users').add(profile);
      getResponse();
      setOpen(false);
    } catch (err) {
      console.log('Error: ', err);
      setOpen(false);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();
    try {
      const userRef = firebase.firestore().collection('users');
      userRef.doc(selectedProfile.id).update(omit(selectedProfile, ['id']));
      getResponse();
      setOpenEditModal(false);
    } catch (err) {
      console.log('Error: ', err);
      setOpenEditModal(false);
    }
  };

  const handleDeleteProfile = (e) => {
    e.preventDefault();
    try {
      const userRef = firebase.firestore().collection('users');
      userRef.doc(selectedProfile.id).delete();
      getResponse();
      setOpenDeleteModal(false);
    } catch (err) {
      console.log('Error: ', err);
      setOpenDeleteModal(false);
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

  const classes = useStyles();

  return (<Grid container spacing={3}>
    <Grid style={{marginTop: 100 }}  item xs={12}>
      {
        !isEmpty(selectedProfile) &&
        <>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleOpenEditModal}>
            Update <Edit className={classes.rightIcon} />
          </Button>
          <Button className={classes.button} variant="contained" color="primary" onClick={handleOpenDelete}>
            Delete <DeleteIcon className={classes.rightIcon} />
          </Button>
        </>
      }
      <Button className={classes.button} variant="contained" color="primary" onClick={handleOpen}>
        Add user profile
      </Button>
    </Grid>
    <Grid item xs={6} sm={3}>
      {
        profiles.length &&
        <ProfileList
          profiles={profiles}
          handleSelect={handleSelect}
          selectedProfile={selectedProfile}
          setMouseEnterEvent={setMouseEnterEvent}
          setMouseOutEvent={setMouseOutEvent}
          mouseHover={mouseHover}
        />
      }
    </Grid>
    <Grid item xs={"auto"} sm={9}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add repository</DialogTitle>
        <DialogContent>
          <Profile profileData={profile} handleChange={handleChange} handleSubmit={addProfile} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={openEditModal} onClose={handleCloseEditModal} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update repository</DialogTitle>
        <DialogContent>
          <Profile profileData={selectedProfile} handleChange={handleChangeEdit} handleSubmit={updateProfile} handleClose={handleCloseEditModal} />
        </DialogContent>
      </Dialog>
      <Dialog open={openDeleteModal} onClose={handleCloseDelete} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete a repository</DialogTitle>
        <DialogContent>
          Do you want to delete the profile?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProfile} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Tree selectedProfile={selectedProfile} nodes={nodes} setNodes={setNodes} />
    </Grid>
  </Grid>
  )
}

export default FileExplorer;