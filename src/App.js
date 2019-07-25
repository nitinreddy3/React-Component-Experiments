import React from 'react';
import { Grid, Container } from '@material-ui/core';
import './App.css';
// import MuiTreeView from './components/MuiTreeView';
import FileExplorer from './components/FileExplorer';

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A' }, { value: 'Child B' }],
  },
  {
    value: 'Parent B',
    nodes: [
      {
        value: 'Child C',
      },
      {
        value: 'Parent C',
        nodes: [
          { value: 'Child D', id: 'example-id' },
          { value: 'Child E' },
          { value: 'Child F' },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">Tree View</header>
      <Container maxWidth="xl">
        <FileExplorer />
      </Container>
    </div>
  );
}

export default App;
