import React from 'react';
import { Router } from '@reach/router';

import mainStyles from './styles/main.module.css';

import Header from './shared/header';
import Footer from './shared/footer';

import Home from './home/home';
import Comics from './comics/comics';
import ComicList from './comics/comicList';
import Comic from './comics/comic';

function App() {
  return (
    <>
      <Header />

      <div className={mainStyles.main}>
        <Router>
          <Home path='/' />
          <Comics path='/comics'>
            <ComicList path="/" titleStartsWith="Captain Marvel" />
            <ComicList path="/issues" />
            <Comic path="/:id" />
          </Comics>
        </Router>
      </div>

      <Footer />
    </>
  );
}

export default App;
