import './App.css';

import { useEffect, useState } from 'react';

import Pane1 from './Pane1'
import Pane2 from './Pane2'
import Pane3 from './Pane3'
import Pane4 from './Pane4'
import ScrollSnap from './ScrollSnap'

function App() {

  const sitePanes = [
    <Pane1 />,
    <Pane2 />,
    <Pane3 />,
    <Pane4 />
  ]


  return (
    <div className="App">
      <ScrollSnap panes={sitePanes} />
    </div>
  );
}

export default App;
