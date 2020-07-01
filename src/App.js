import React from 'react';
import { Router } from '@reach/router';

import Header from './shared/header';
import Footer from './shared/footer';

import Home from './home/home';
import Comics from './comics/comics';

function App() {
  return (
    <>
      <Header />

      <div>
        <Router>
          <Home path='/' />
          <Comics path='/comics' />
        </Router>
      </div>

      <Footer />
    </>
  );
}

export default App;
