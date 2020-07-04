import React from 'react';
import { Link, useLocation } from '@reach/router';
import cn from 'classnames';

import styles from './styles/tabNav.module.css';

function TabNav() {
  const location = useLocation();

  return (
    <nav className={styles.tabs}>
      <ul className={styles.tabList}>
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