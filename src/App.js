import React from 'react';
import { Container } from '@material-ui/core';
import './App.css';
import FileExplorer from './components/FileExplorer';

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
