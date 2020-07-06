import React from 'react';
import { Router } from '@reach/router';

import mainStyles from './styles/main.module.css';

import Header from './shared/header';
import Footer from './shared/footer';

import { Home, Comic, ComicList } from './loader';

function App() {
  return (
    <>
      <Header />

      <div className={mainStyles.main}>
        <Router>
          <Home path='/' />
          <ComicList path="/comics" titleStartsWith="Captain Marvel" />
          <ComicList path="/comics/issues" />
          <Comic path="/comics/:id" />
        </Router>
      </div>

      <Footer />
    </>
  );
}

export default App;
