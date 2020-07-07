import React from 'react';

import styles from './home.module.css';
import { ctaButton } from '../styles/shared.module.css'
import TabNav from '../shared/tabNav';
import { Link } from '@reach/router';
import { useQuery } from 'react-query';
import { fetch5 } from '../shared/scripts/fetches';
import Loading from '../shared/loading';
import ComicSmall from '../comics/comicSmall';

function Home() {
  let {isLoading, isError, data} = useQuery("First 5", fetch5)

  return (
    <>
      <section className="masthead">
        <div className={styles.masthead}>
          <div className={styles.hero}>
            <div className={styles.heroBg}>
              <figure>
                <div className={styles.heroImage} />
              </figure>
            </div>
            <div className={styles.heroText}>
              <h1 className={styles.heading}>
                <span className={styles.hEyebrow}>Carol Danvers</span>
                <span className={styles.hHeadline}>Captain Marvel</span>
              </h1>
              <div className={styles.copy}>
                Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.
              </div>
            </div>
          </div>
          <TabNav />
          <div className={styles.socialsWrap}>
            <div className={styles.socials}>
              <div className={styles.follow}>Follow</div>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/CaptainMarvelOfficial"
                className={styles.icon}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path fillRule="evenodd" d="M9.426 17.647H.974A.974.974 0 0 1 0 16.673V.974C0 .436.436 0 .974 0h15.7c.537 0 .973.436.973.974v15.699a.974.974 0 0 1-.974.974h-4.497v-6.834h2.294l.343-2.663h-2.637v-1.7c0-.772.214-1.297 1.32-1.297h1.41V2.77a18.853 18.853 0 0 0-2.055-.105c-2.033 0-3.425 1.241-3.425 3.52V8.15h-2.3v2.663h2.3v6.834z"></path>
                </svg>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/captainmarvel"
                className={styles.icon}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15">
                  <path fillRule="evenodd" d="M17.647 1.74a7.072 7.072 0 0 1-2.079.585A3.704 3.704 0 0 0 17.16.272a7.13 7.13 0 0 1-2.3.9A3.57 3.57 0 0 0 12.217 0C10.22 0 8.598 1.662 8.598 3.712c0 .291.031.574.093.846-3.009-.155-5.676-1.632-7.463-3.88a3.78 3.78 0 0 0-.49 1.868c0 1.287.64 2.424 1.611 3.09a3.555 3.555 0 0 1-1.64-.463v.045c0 1.8 1.248 3.3 2.905 3.64-.304.088-.624.131-.954.131-.233 0-.461-.022-.682-.066.461 1.475 1.798 2.549 3.382 2.577A7.149 7.149 0 0 1 0 13.04a10.08 10.08 0 0 0 5.55 1.666c6.66 0 10.3-5.656 10.3-10.562 0-.162-.002-.323-.008-.482a7.43 7.43 0 0 0 1.805-1.921"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="featured">
        <div className={styles.featured}>
          <div className={styles.featuredBg}>
            <figure>
                <div className={styles.featuredImage}></div>
            </figure>
          </div>
          <div className={styles.featuredWrapper}>
            <div className={styles.featuredText}>
              <div className={styles.textWrapper}> 
                <div className={styles.featuredHeading}>Captain Marvel</div>
                <div className={styles.featuredCopy}>Near death, Carol Danvers was transformed into a powerful warrior for the Kree. Now, returning to Earth years later, she must remember her past in order to to prevent a full invasion by shapeshifting aliens, the Skrulls.</div>
                <div className={styles.featuredCTA}>
                  <a className={ctaButton} href="https://www.marvel.com/movies/captain-marvel">
                    <div className="inner">
                      <span>Watch Now</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="comics">
        <div className={styles.comHead}>
          <h3>Comics</h3>
          <Link to="/comics">More</Link>
        </div>
        <div className={styles.comics}>
          { isLoading ?
            <Loading />
            : isError ?
            "An Error Occured" :
            data.map(result => (
              <ComicSmall key={result.id} data={result} />
            ))
          }
        </div>
      </section>
    </>
  )
}

export default Home;