import React from 'react';
import { Router } from '@reach/router';

import Home from './home/home';
import Comics from './comics/comics';

function App() {
  return (
    <Router>
      <Home path='/' />
      <Comics path='/comics' />
    </Router>
  );
}

export default App;
