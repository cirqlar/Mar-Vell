import React from 'react';
import { useParams } from '@reach/router';
import { useQuery } from 'react-query';
import { fetchComic } from '../shared/scripts/fetches';
import TabNav from '../shared/tabNav';
import Loading from '../shared/loading';

import homes from '../home/home.module.css';
import styles from './styles/comic.module.css';

import { imgString } from '../shared/scripts/utils';

function splits(str) {
  let cap = str => str[0].toUpperCase() + str.substring(1, str.length);
  str = str.split(" (")
  if (str.length > 1) str[1] = str[1].substring(0, str[1].length - 1)
  return `${cap(str[0])}${!str[1] ? "" : " - " + cap(str[1])}`;
}

function sanitize(data) {
  const { date: releaseDate } = data.dates.find((el) => el.type === "onsaleDate");
  const releaseDateString = (new Date(releaseDate)).toLocaleDateString();
  const modifiedDateString = (new Date(data.modified)).toLocaleDateString();

  const length = 400;
  let desc = data.description;
  if (desc && desc.length > length) {
    desc = desc.substring(0, length - 3);
    desc = desc + "...";
  }

  const { isbn, upc, diamondCode, ean, issn } = data;

  return {
    releaseDate,
    releaseDateString,
    modifiedDate: data.modified,
    modifiedDateString,
    title: data.title,
    desc,
    img: data.thumbnail,
    creators: data.creators.items,
    codes: {
      isbn,
      upc,
      diamondCode,
      ean,
      issn,
    },
    links: data.urls,
  }
}

function Comic() {
  const params = useParams();

  const { isLoading, isError, data } = useQuery(['comic', params.id], fetchComic);
  let san;
  
  if (!isLoading && !isError) {
    san = sanitize(data);
  }

  return (
    <>
      {
        isLoading ?
        <>
          <Loading />
          <TabNav />
        </>
        : isError ?
        <>
          "An error occurred"
          <TabNav />
        </> :
        <>
          <section className="masthead">
            <div className={homes.masthead}>
              <div className={homes.hero}>
                <div className={homes.heroBg}>
                  <figure className={styles.figureEmpty}>

                  </figure>
                </div>
                <div className={homes.heroText + " " + styles.heroText}>
                  <picture className={styles.comicCover}>
                    <source media="(min-width: 375px)" srcSet={imgString(data.images[0], "portrait_uncanny")} />
                    <source srcSet={imgString(data.images[0], "portrait_incredible")} />
                    <img src={imgString( san.img, "portrait_incredible")} alt={san.title} />
                  </picture>
                  <div className={styles.comicDesc}>
                    <h1 className={homes.heading}>
                      <time dateTime={san.releaseDate} className={homes.hEyebrow + " " + styles.hEyebrow}>{san.releaseDateString}</time>
                      <span className={homes.hHeadline}>{san.title}</span>
                    </h1>
                    <div className={homes.copy}>
                      { san.desc || "No description available" }
                    </div>
                    <div className={homes.copy + " " + styles.creators}>
                      <span>Last Modified:</span>
                      <time dateTime={san.modifiedDate}>
                        { san.modifiedDateString }
                      </time>
                    </div>
                    <div className={homes.copy + " " + styles.creators}>
                      <span>Codes:</span>
                      <ul>
                        {Object.entries(san.codes).map(([key, val], i, a) => {
                          return (val ? (
                            <React.Fragment key={key}>
                              <li>
                                {`${key.toUpperCase()}: ${val || "none"}`}
                              </li>
                              {a.length === (i + 1) ? "" : <><span>{","}</span>{" "}</>}
                            </React.Fragment>
                          ) : "" );
                        })}
                      </ul>
                    </div>
                    <div className={homes.copy + " " + styles.creators}>
                      <span>Links:</span>
                      <span>
                        {san.links.map((val, i, a) => (
                          <React.Fragment key={val.type}>
                            <a href={val.url} target="_blank" rel="noopener noreferrer">
                              {splits(val.type)}
                            </a>
                            {a.length === (i + 1) ? "" : ", "}
                          </React.Fragment>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <TabNav />
            </div>
          </section>
          <section>
            <div>Info</div>
            <div className={homes.copy + " " + styles.creators}>
              <span>Creators:</span>
              <span>
                {san.creators.map((val, i, a) => (
                  <span key={val.name}>
                    {`${val.name} (${splits(val.role)})${a.length === (i + 1) ? "" : ", "}`}
                  </span>
                ))}
              </span>
            </div>
          </section>
        </>
      }
    </>
  )
}

export default Comic;