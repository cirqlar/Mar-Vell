import React from 'react';
import { Router } from '@reach/router';

import mainStyles from './styles/main.module.css';

import Header from './shared/header';
import Footer from './shared/footer';

import Home from './home/home';
import Comics from './comics/comics';

function App() {
  return (
    <>
      <Header />

      <div className={mainStyles.main}>
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
