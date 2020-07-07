// Package Imports
import React, { useRef, useState } from 'react';
import cn from 'classnames';

// Style imports
import styles from './nav.module.css';

// Shared Imports
import data from './navItems.json';

// Component Imports

function Link({ link, open, close }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <a className={styles.navItem} href={link.link}
        onClick={(ev) => {
          if (link.mainList) {
            ev.preventDefault();
            open();
            setIsOpening(true);
            setTimeout(() => setIsOpen(true));
          }
        }}
      >
        {link.name}
        {!link.mainList  || <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="16" viewBox="0 0 11 16">
            <path fill="none" d="M-.851-3L9.232 8-2.75 21.071"></path>
          </svg>
        </span>}
      </a>
      {!link.mainList  || <div className={cn({
        [styles.subNav]: true,
        [styles.subOpening]: isOpening,
        [styles.subOpen]: isOpen,
      })}>
        <button
          onClick={() => {
            close();
            setIsOpen(false);
            setTimeout(() => setIsOpening(false), 300);
          }}
          className={styles.navItem + " " + styles.subNavClose}
        >
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="16" viewBox="0 0 11 16">
              <path fill="none" d="M11.851-3L1.768 8 13.75 21.071"></path>
            </svg>
          </span>
          <div>{link.name}</div>
        </button>
        <ul className={styles.subMain}>
          {link.mainList.map(val => (
            <li key={val.link}>
              <a href={val.link} className={styles.navItem}>
                {val.name}
              </a>
            </li>
          ))}
        </ul>
        {!link.secondaryList || <ul className={styles.subSec}>
          <span>{link.secondaryList.name}</span>
          {link.secondaryList.items.map(val => (
            <li key={val.link}>
              <a href={val.link} className={styles.navItem}>
                {val.name}
              </a>
            </li>
          ))}
        </ul>}
      </div>}
    </li>
  );
}

function More({ name, links }) {
  return (
    <li className={styles.more}>
      <span>{name}</span>
      <ul>
        {links.map(val => <Link key={val.name} link={val} />)}
      </ul>
    </li>
  );
}

function Nav({ open, closeNav, openNav, forwardRef }) {
  const [subOpen, setSubOpen] = useState();

  let container = useRef();
  console.log(data);

  function openSubNav() {
    setSubOpen(true);
  }
  
  function closeSubNav() {
    setSubOpen(true);
  }

  return (
    <div
      ref={container}
      onBlur={ev => {
        setTimeout(() => {
          if (!container.current.contains(document.activeElement) && document.activeElement.tagName !== "BODY") {
            closeNav();
          }
        });
      }}
      onFocus={ev => {
        if (!open) {
          openNav()
        }
      }}
      className={cn({
        [styles.nav]: true,
        [styles.navOpen]: open,
        [styles.subNavOpen]: subOpen,
      })}
    >
      <button className={styles.navButton} onClick={closeNav} ref={forwardRef}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16">
            <path d="M-1-3L10.314 8.314M13 11l11.314 11.314M24.142-6L-4.142 22.284"></path>
          </svg>
        </span>
      </button>
      <nav className={styles.navWrap}>
        <ul>
          {data.map(val => {
            if (val.link) {
              return (<Link
                open={openSubNav}
                close={closeSubNav} 
                key={val.name} 
                link={val} 
              />)
            } else {
              return (<More 
                key={val.name} 
                name={val.name} 
                links={val.items}                 
              />)
            }
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;