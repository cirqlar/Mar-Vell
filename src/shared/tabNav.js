import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@reach/router';
import cn from 'classnames';

import styles from './styles/tabNav.module.css';

let scrollTop;
let width;
let top;

function TabNav() {
  const nav = useRef();
  const [fixed, setFixed] = useState(false);
  const location = useLocation();

  window.addEventListener('scroll', (ev) => {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    width = window.innerWidth || document.documentElement.clientWidth;
  })

  useEffect(() => {
    top = nav.current.getBoundingClientRect().top;
    const interval = setInterval(() => {
      if (width >= 839 && scrollTop && scrollTop > top) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={styles.tabs} ref={nav}>
      <ul className={cn({
        [styles.tabList]: !fixed,
        [styles.tabListFixed]: fixed,
      })}>
        <li className={cn({
          [styles.tabItem]: true,
          [styles.tabItemActive]: (location.pathname === '/'),
        })}>
          <Link to="/">
            <span>Overview</span>
          </Link>
        </li>
        <li className={cn({
          [styles.tabItem]: true,
          [styles.tabItemActive]: (location.pathname === '/comics'),
        })}>
          <Link to="/comics">
            <span>Captain Marvel Comics</span>
          </Link>
        </li>
        <li className={cn({
          [styles.tabItem]: true,
          [styles.tabItemActive]: (location.pathname === '/comics/issues'),
        })}>
          <Link to="/comics/issues">
            <span>Comics with Captain Marvel</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default TabNav;