import React from 'react';
import { Container } from '@material-ui/core';
import './App.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FileExplorer from './components/FileExplorer';
import BarChart from './components/BarChart';
import HeaderSliderMenu from './components/HeaderSliderMenu';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <HeaderSliderMenu />
      <Container maxWidth="xl">
        {/* <FileExplorer /> */}
        <BarChart />
        {/* <BarChart1 /> */}
      </Container>
    </div>
  );
}

export default App;
