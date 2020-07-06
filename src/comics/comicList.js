// Package Imports
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useLocation, useNavigate } from '@reach/router';

// Style imports
import styles from './styles/comicList.module.css';
import homes from '../home/home.module.css';
import { ctaButton, visuallyHidden } from '../styles/shared.module.css';

// Shared imports
import { fetchAllComics } from '../shared/scripts/fetches';
import TabNav from '../shared/tabNav';
import Loading from '../shared/loading';

// Component Imports
import ComicSmall from './comicSmall';

// Closure variables
let scrollBottom;
let documentHeight;
let padding = 1800;

// Helper functions
function scrollHandler(event) {
  scrollBottom = (window.pageYOffset || document.documentElement.scrollTop)
                  + (window.innerHeight || document.documentElement.clientHeight);
}

function effect({ isFetching, isFetchingMore, canFetchMore, fetchMore }) {
  const interval = setInterval(() => {
    if (!isFetching && !isFetchingMore && canFetchMore) {
      documentHeight = document.querySelector("#root").clientHeight;

      if (documentHeight - scrollBottom < padding) {
        fetchMore();
      }
    }
  }, 1000);
  return () => clearInterval(interval);
}

function Url(href) {
  let url;

  if (URL) {
    url = new URL(href);
  } else {
    url = new window.URL(href);
  }

  return url;
}

function getSort(href) {
  let url = Url(href);

  return {
    direction: url.searchParams.get('dir') || "down",
    sortBy: url.searchParams.get('sortBy') || "none",
  };
}

function useSort() {
  const location = useLocation();

  const [direction, setDirection] = useState("down");
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    const sort = getSort(location.href);
    setDirection(sort.direction)
    setSortBy(sort.sortBy);
  }, [location.href]);

  return { direction, sortBy };
}

function useNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const url = Url(location.href);

  return (key, value) => {
    url.searchParams.set(key, value);
    navigate(url);
  }
}

// Component
function ComicList({ titleStartsWith = null }) {
  const { direction, sortBy } = useSort();
  const navigate = useNavigation();

  const {
    isFetching,
    isLoading,
    isError,
    data,
    isFetchingMore,
    canFetchMore,
    fetchMore,
  } = useInfiniteQuery(['comics', titleStartsWith, sortBy, direction], fetchAllComics, {
    getFetchMore: ({ data }) => {
      const { count, limit, offset, total } = data;
      const newOffset = count + ((offset === 0) ? 1 : offset);
      return (count === limit && newOffset < total ) ? newOffset : false;
    }
  });

  window.addEventListener("scroll", scrollHandler);

  useEffect(() => {
    return effect({
      isFetching,
      isFetchingMore,
      canFetchMore,
      fetchMore
    });
  }, [isFetching, isFetchingMore, canFetchMore, fetchMore]);

  return (
    <>
      <section className="masthead">
        <div className={homes.masthead}>
          <div className={homes.hero}>
            <div className={homes.heroBg}>
              <figure>
                <div className={homes.heroImage} />
              </figure>
            </div>
            <div className={homes.heroText}>
              <h1 className={homes.heading}>
                <span className={homes.hEyebrow}>Carol Danvers</span>
                <span className={homes.hHeadline}>Captain Marvel</span>
              </h1>
              <div className={homes.copy}>
                { titleStartsWith ?
                  `Check here from all ${titleStartsWith} comics`
                  : `These are all comics featuring Captain Marvel`
                }
              </div>
            </div>
          </div>
          <TabNav />
          <div className={homes.socialsWrap}>
            <div className={homes.socials}>
              <div className={homes.follow}>Follow</div>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/CaptainMarvelOfficial"
                className={homes.icon}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path fillRule="evenodd" d="M9.426 17.647H.974A.974.974 0 0 1 0 16.673V.974C0 .436.436 0 .974 0h15.7c.537 0 .973.436.973.974v15.699a.974.974 0 0 1-.974.974h-4.497v-6.834h2.294l.343-2.663h-2.637v-1.7c0-.772.214-1.297 1.32-1.297h1.41V2.77a18.853 18.853 0 0 0-2.055-.105c-2.033 0-3.425 1.241-3.425 3.52V8.15h-2.3v2.663h2.3v6.834z"></path>
                </svg>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/captainmarvel"
                className={homes.icon}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15">
                  <path fillRule="evenodd" d="M17.647 1.74a7.072 7.072 0 0 1-2.079.585A3.704 3.704 0 0 0 17.16.272a7.13 7.13 0 0 1-2.3.9A3.57 3.57 0 0 0 12.217 0C10.22 0 8.598 1.662 8.598 3.712c0 .291.031.574.093.846-3.009-.155-5.676-1.632-7.463-3.88a3.78 3.78 0 0 0-.49 1.868c0 1.287.64 2.424 1.611 3.09a3.555 3.555 0 0 1-1.64-.463v.045c0 1.8 1.248 3.3 2.905 3.64-.304.088-.624.131-.954.131-.233 0-.461-.022-.682-.066.461 1.475 1.798 2.549 3.382 2.577A7.149 7.149 0 0 1 0 13.04a10.08 10.08 0 0 0 5.55 1.666c6.66 0 10.3-5.656 10.3-10.562 0-.162-.002-.323-.008-.482a7.43 7.43 0 0 0 1.805-1.921"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.grid}>
        <div className={styles.options}>
          <form  className={styles.optionsForm}>
            <select
              value={sortBy}
              className={styles.sortBy}
              onChange={(e) => {
                navigate('sortBy', e.target.value);
              }}
            >
              <option value="none">None</option>
              <option value="onsaleDate">Release Date</option>
            </select>
            <input
              type="checkbox"
              id="dir"
              className={styles.checkboxInput + " " + visuallyHidden}
              checked={direction === "up"}
              disabled={!sortBy || sortBy === "none"}
              onChange={(e) => {
                navigate('dir', e.target.checked ? "up" : "down");
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) navigate('dir', !e.target.checked ? "up" : "down");
              }}
            />
            <label className={styles.checkboxLabel} htmlFor="dir">
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="down" d="M1.28123 9H8.71873C9.38748 9 9.72185 9.80937 9.24998 10.2812L5.53123 14C5.23748 14.2937 4.76248 14.2937 4.47185 14L0.749977 10.2812C0.278102 9.80937 0.612477 9 1.28123 9Z" fill="black"/>
                  <path className="up" d="M9.24998 5.71873L5.53123 1.99998C5.23748 1.70623 4.76248 1.70623 4.47185 1.99998L0.749977 5.71873C0.278102 6.1906 0.612477 6.99998 1.28123 6.99998H8.71873C9.38748 6.99998 9.72185 6.1906 9.24998 5.71873Z" fill="black"/>
              </svg>      
            </label>
          </form>
        </div>
        {
          isLoading ?
          <Loading />
          : isError ?
          <div>An Error has occurred</div> :
          data.map((group, i) => {
            return (
              <React.Fragment key={i}>
                {group.data.results.map(result => (
                  <ComicSmall key={result.id} data={result} />
                ))}
              </React.Fragment>
            );
          })
        }
      </div>
      <div className={styles.action}>
        {
          isLoading ?
          ""
          : isFetchingMore ?
          <Loading />
          : !canFetchMore ?
          "Nothing more to fetch" :
          <button
            className={ctaButton + " " + styles.btn}
            onClick={() => {
              console.log("clicked");
              fetchMore();
            }}
            disabled={!canFetchMore || isFetchingMore}
          >
            <div className="inner">
              <span>
                Load More
              </span>
            </div>
          </button>
        }
      </div>
    </>
  )
}

export default ComicList;
