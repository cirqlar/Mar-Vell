import React, { useState } from 'react';
import cn from 'classnames';

import styles from '../styles/nav.module.css';

function Nav() {
  let [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }} className={cn(styles.button, styles.icon)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
          <g fillRule="evenodd">
            <path d="M0 14h24v2H0zM0 8h24v2H0zM0 2h24v2H0z"></path>
          </g>
        </svg>
      </button>
      <nav className={cn({
        [styles.nav]: true,
        [styles.navOpen]: open,
      })}>

      </nav>
    </>
  );
}

export default Nav;