// Package imports
import React from 'react';
import { useParams, Link } from '@reach/router';
import { useQuery } from 'react-query';
import { startCase } from 'lodash'

// Style imports
import homes from '../home/home.module.css';
import styles from './styles/comic.module.css';

// Shared imports
import { fetchComic } from '../shared/scripts/fetches';
import { imgString } from '../shared/scripts/utils';

// Component Imports
import TabNav from '../shared/tabNav';
import Loading from '../shared/loading';



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

  const variants = data.variants.map( ({resourceURI, name}) => ({ name, id: resourceURI.split('/').pop() }) )
  const issues = data.collectedIssues.map( ({resourceURI, name}) => ({ name, id: resourceURI.split('/').pop() }) )
  const collections = data.collections.map( ({resourceURI, name}) => ({ name, id: resourceURI.split('/').pop() }) )

  const texts = data.textObjects.map(val => ({
    ...val,
    type: startCase(val.type).split(" ").slice(1).join(" "),
  }));

  const stories = data.stories.items.map( ({name, type}) => ({ name, type: startCase(type) }) );

  const { isbn, upc, diamondCode, ean, issn } = data;

  const dates = data.dates.map(val => ({ 
    name: startCase(val.type), 
    value: {
      date: val.date,
      dateString: (new Date(val.date)).toLocaleDateString(),
    },
  }))

  const prices = data.prices.map(val => ({
    name: startCase(val.type),
    value: val.price,
  }));

  const details = {
    dates,
    digitalId: data.digitalId === 0 ? "n/a" : data.digitalId,
    pages: data.pageCount,
    issue: data.issueNumber === 0 ? "n/a" : "#" + data.issueNumber,
    variant: data.variantDescription,
    format: data.format,
    series: data.series === "" ? "n/a" : data.series.name,
    prices,
  }

  const images = data.images.map(val => ({ small: imgString(val, "portrait_small"), large: imgString(val, "portrait_uncanny")}))

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
    variants,
    details,
    characters: data.characters.items,
    events: data.events.items,
    issues,
    collections,
    texts,
    stories,
    images,
  }
}

function Comic() {
  const params = useParams();

  const { isLoading, isError, data } = useQuery(['comic', params.id], fetchComic);
  let comic;
  
  if (!isLoading && !isError) {
    comic = sanitize(data);
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
                    <img src={imgString( comic.img, "portrait_incredible")} alt={comic.title} />
                  </picture>
                  <div className={styles.comicDesc}>
                    <h1 className={homes.heading}>
                      <time dateTime={comic.releaseDate} className={homes.hEyebrow + " " + styles.hEyebrow}>{comic.releaseDateString}</time>
                      <span className={homes.hHeadline}>{comic.title}</span>
                    </h1>
                    <div className={homes.copy}>
                      { comic.desc || "No description available" }
                    </div>
                    <div className={homes.copy + " " + styles.copy}>
                      <span>Last Modified:</span>
                      <time dateTime={comic.modifiedDate}>
                        { comic.modifiedDateString }
                      </time>
                    </div>
                    <div className={homes.copy + " " + styles.copy}>
                      <span>Codes:</span>
                      <ul>
                        {Object.entries(comic.codes).map(([key, val], i, a) => {
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
                    <div className={homes.copy + " " + styles.copy}>
                      <span>Links:</span>
                      <span>
                        {comic.links.map((val, i, a) => (
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
          <section className="details">
            <div className={styles.grid} >
              <h1>Info</h1>
              <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Details</h3>
                <div className={styles.text}>
                  <p>Digital Id: <span>{comic.details.digitalId}</span></p>
                  <p>Format: <span>{comic.details.format}</span></p>
                  {comic.details.dates.map(val => (
                    <p key={val.name}>{val.name}: <time dateTime={val.value.date}>{val.value.dateString}</time></p>
                  ))}
                  <p>Pages: <span>{comic.details.pages}</span></p>
                  <p>Issue: <span>{comic.details.issue}</span></p>
                  <p>Series: <span>{comic.details.series}</span></p>
                  {!comic.details.variant || <p>Variant: <span>{comic.details.variant}</span></p>}
                  {comic.details.prices.map(val => (
                    <p key={val.name}>{val.name}: <span>${val.value}</span></p>
                  ))}
                </div>
              </div>
              <div className={styles.gridDiv}>
                <span>Characters:</span>
                <ul>
                  {comic.characters.map(val => (
                    <li key={val.name}>
                      {val.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.gridDiv}>
                <span>Creators:</span>
                <ul>
                  {comic.creators.map(val => (
                    <li key={val.name}>
                      {`${val.name} (${splits(val.role)})`}
                    </li>
                  ))}
                </ul>
              </div>
              {!comic.events[0] || <div className={styles.gridDiv}>
                <span>Events:</span>
                <ul>
                  {comic.events.map(val => (
                    <li key={val.name}>
                      {val.name}
                    </li>
                  ))}
                </ul>
              </div>}
              {!comic.collections[0] || <div className={styles.gridDiv}>
                <span>Collections:</span>
                <ul>
                  {comic.collections.map(val => (
                    <li key={val.id}>
                      <Link to={`/comics/${val.id}`}>
                        {val.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>}
              {!comic.issues[0] || <div className={styles.gridDiv}>
                <span>Issues:</span>
                <ul>
                  {comic.issues.map(val => (
                    <li key={val.id}>
                      <Link to={`/comics/${val.id}`}>
                        {val.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>}
              {!comic.variants[0] || <div className={styles.gridDiv}>
                <span>Variants:</span>
                <ul>
                  {comic.variants.map(val => (
                    <li key={val.id}>
                      <Link to={`/comics/${val.id}`}>
                        {val.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>}
              <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Stories</h3>
                <div className={styles.text}>
                  {comic.stories.map((val, i) => (
                    <p key={val.type + i}>{val.type}: <span>{val.name}</span></p>
                  ))}
                </div>
              </div>
              {!comic.texts[0] || <div className={styles.gridDiv + " no-flex"}>
                <div className={styles.text}>
                  {comic.texts.map(val => (
                    <p key={val.type}>{val.type}: <span>{val.text}</span></p>
                  ))}
                </div>
              </div>}
              <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Images</h3>
                <div className={styles.images}>
                  {comic.images.map(val => (
                    <a key={val.small} href={val.large} target="_blank" rel="noopener noreferrer">
                      <img src={val.small} alt="Comic"/>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      }
    </>
  )
}

export default Comic;