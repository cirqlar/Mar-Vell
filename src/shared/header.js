import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './styles/header.module.css';

import Nav from './_components/nav';

let lastTop;
let scrollTop;

function Header() {
  let [goingUp, setGoingUp] = useState(false);
  let [top, setTop] = useState(true);
  let [ open, setOpen] = useState(false);

  let link = useRef();

  function openNav() {
    setOpen(true);
    document.querySelector('body').classList.add("nav-open");
  }

  function closeNav() {
    setOpen(false);
    document.querySelector('body').classList.remove("nav-open");
  }

  window.addEventListener('scroll', (event) => {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastTop) {
        if (scrollTop < lastTop) {
          setGoingUp(true);
        } else if (scrollTop > lastTop) {
          setGoingUp(false);
        }
        if (scrollTop === 0) {
          setTop(true);
        } else {
          setTop(false);
        }
      }
      lastTop = scrollTop;
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={cn({
      [styles.header]: true,
      [styles.headerFixed]: goingUp,
      [styles.headerTop]: top,
    })}>
      <div className={styles.top}>
        <div className={styles.left}>
          <button onClick={(e) => {
            e.preventDefault();
            openNav();
            link.current.focus();
          }} className={cn(styles.button, styles.icon)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
              <g fillRule="evenodd">
                <path d="M0 14h24v2H0zM0 8h24v2H0zM0 2h24v2H0z"></path>
              </g>
            </svg>
          </button>
          <button className={styles.signUp}>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65.6 66.7">
                <path fillRule="evenodd" d="M59.5 15.1L53 51.4c0 .4-.3.6-.6.6h-6.5c-.3 0-.6-.2-.8-.6l-8.8-24.7H36l-4.3 24.7c-.1.3-.3.6-.6.6H25c-.3 0-.6-.2-.5-.6l6.6-37.3c.1-.3.3-.6.6-.6h6.4c.5 0 .7.2.8.6l8.8 24.7h.3l5.5-30.4C47.9 3.7 40.6.9 32.7.9 14.7.9.2 15.5.2 33.4c0 8.8 3.5 16.7 9.1 22.5l7.3-41.7c.1-.3.3-.6.6-.6H24c.3 0 .5.2.5.6l-8.3 47.2c4.8 2.8 10.4 4.5 16.4 4.5 17.9 0 32.5-14.5 32.5-32.5 0-6.8-2.1-13.1-5.6-18.3z"></path>
              </svg>
            </span>
            <div className={styles.signUpText}>
              <a href="https://www.marvel.com/signin?referer=https%3A%2F%2Fwww.marvel.com%2Fcharacters%2Fcaptain-marvel-carol-danvers">Sign In</a>
              <span> | </span>
              <a href="https://www.marvel.com/register?referer=https%3A%2F%2Fwww.marvel.com%2Fcharacters%2Fcaptain-marvel-carol-danvers">Join</a>
            </div>
          </button>
        </div>

        <a href="https://www.marvel.com/" className={styles.logo}>
          <svg width="130" height="52" xmlns="http://www.w3.org/2000/svg">
            <rect fill="#EC1D24" width="100%" height="100%"></rect>
            <path fill="#FEFEFE" d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"></path>
            <path fill="#EC1D24" d="M0 0h30v52H0z"></path>
            <path fill="#FEFEFE" d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"></path>
          </svg>
        </a>
        
        <div className={styles.right}>
          <a className={styles.masterCard} href="https://www.marvel.com/creditcard?siteCode=MCMONB4&amp;Dcom=MCMONB4&amp;cid=MMCMDC&amp;clientCode=MARVEL">
            <span>
              <svg id="Layer_2_1_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.8 80.5">
                <style>
                  {".st0{fill:#fff}"}
                </style>
                <path className="st0" d="M1.3 64.2c0 8.3 6.7 15 15 15h112.3c8.3 0 15-6.7 15-15V30.9H1.3v33.3zM143.6 16.2c0-8.3-6.7-15-15-15H16.3c-8.3 0-15 6.7-15 15v4.5h142.2l.1-4.5z"></path>
              </svg>
            </span>
            Marvel<br/>Mastercard®
          </a>
          <div className={styles.searchCont}>
            <a href="https://www.marvel.com/search" className={styles.searchIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" 
                height="17" viewBox="0 0 19 17" fillRule="evenodd"
              >
                <circle cx="6.5" cy="6.5" r="5.5"></circle>
                <path d="M14 14l3.536 3.536"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <Nav open={open} closeNav={closeNav} openNav={openNav} forwardRef={link} />
    </header>
  );
}

export default Header;