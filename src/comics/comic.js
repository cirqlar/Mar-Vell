// Package imports
import React from 'react';
import { useParams, Link, useLocation } from '@reach/router';
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

function Share() {
  const location = useLocation();
  const tweetShare = `Check out this Comic ${location.href}`;

  return (<>
    <button className={styles.share}
      onClick={ev => {
        if (navigator.share) {
          navigator.share({
            title: "Mar Vell",
            text: "Check out this comic",
            url: location.href,
          }).then(() => console.log("shared, maybe"))
            .catch(() => console.log("maybe not"));
        } else {
          document.querySelector(`.${styles.share}`).classList.add('open');
        }
      }}
      onBlur={ev => {
        let me = document.querySelector(`.${styles.share}`);
        setTimeout(() => {
          if (!me.contains(document.activeElement) && document.activeElement !== 'BODY') {
            me.classList.remove("open");
          }
        })
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.765 12C13.4282 12.0013 13.0952 12.0706 12.7859 12.2038C12.4766 12.3369 12.1973 12.5312 11.965 12.775L5.86997 9.725C6.01991 9.27038 6.01991 8.77962 5.86997 8.325L11.975 5.22C12.4123 5.68081 13.0053 5.96258 13.6387 6.01053C14.2722 6.05848 14.9008 5.86919 15.4025 5.47945C15.9042 5.08971 16.243 4.52736 16.3532 3.90171C16.4633 3.27606 16.3369 2.63181 15.9985 2.09417C15.6601 1.55653 15.1339 1.16391 14.5222 0.992632C13.9104 0.821353 13.2568 0.883647 12.6885 1.16741C12.1201 1.45116 11.6775 1.93612 11.4468 2.528C11.216 3.11989 11.2136 3.77642 11.44 4.37L5.39497 7.445C5.0685 7.04572 4.62652 6.75719 4.12963 6.61896C3.63274 6.48073 3.10526 6.49957 2.61949 6.67288C2.13372 6.8462 1.71345 7.16552 1.41628 7.58706C1.11911 8.0086 0.959595 8.51174 0.959595 9.0275C0.959595 9.54326 1.11911 10.0464 1.41628 10.4679C1.71345 10.8895 2.13372 11.2088 2.61949 11.3821C3.10526 11.5554 3.63274 11.5743 4.12963 11.436C4.62652 11.2978 5.0685 11.0093 5.39497 10.61L11.425 13.645C11.3231 13.9186 11.2706 14.2081 11.27 14.5C11.27 14.9945 11.4166 15.4778 11.6913 15.8889C11.966 16.3 12.3565 16.6205 12.8133 16.8097C13.2701 16.9989 13.7727 17.0484 14.2577 16.952C14.7427 16.8555 15.1881 16.6174 15.5377 16.2678C15.8874 15.9181 16.1255 15.4727 16.2219 14.9877C16.3184 14.5028 16.2689 14.0001 16.0797 13.5433C15.8905 13.0865 15.57 12.696 15.1589 12.4213C14.7478 12.1466 14.2644 12 13.77 12H13.765Z" fill="black"/>
      </svg>
      <div>
        <a href="/"
          onClick={ev => {
            function copied() {
              let copy = document.querySelector('.copied');
              copy.classList.add("show");
              setTimeout(() => copy.classList.remove("show"), 1000);
            }
            ev.preventDefault();
            if (navigator.clipboard) {
              navigator.clipboard.writeText(location.href)
                .then(() => copied());
            }
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 1.78002C13.5 1.67716 13.4797 1.57532 13.4402 1.48036C13.4006 1.3854 13.3427 1.29919 13.2698 1.2267C13.1968 1.1542 13.1102 1.09685 13.015 1.05795C12.9198 1.01905 12.8179 0.999357 12.715 1.00002H2.785C2.68215 0.999357 2.58018 1.01905 2.48497 1.05795C2.38976 1.09685 2.30318 1.1542 2.23022 1.2267C2.15726 1.29919 2.09936 1.3854 2.05985 1.48036C2.02034 1.57532 2 1.67716 2 1.78002V14.22C2 14.3229 2.02034 14.4247 2.05985 14.5197C2.09936 14.6146 2.15726 14.7008 2.23022 14.7733C2.30318 14.8458 2.38976 14.9032 2.48497 14.9421C2.58018 14.981 2.68215 15.0007 2.785 15H3.045V2.03502H13.5V1.78002Z" fill="black"/>
            <path d="M14.75 3H4.75C4.33579 3 4 3.33579 4 3.75V16.25C4 16.6642 4.33579 17 4.75 17H14.75C15.1642 17 15.5 16.6642 15.5 16.25V3.75C15.5 3.33579 15.1642 3 14.75 3Z" fill="black"/>
          </svg>
        </a>
        <a rel="noopener noreferrer" target="_blank"
          href={`https://twitter.com/intent/tweet?text=${tweetShare}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 3.97344C14.0219 4.17969 13.5015 4.32813 12.9656 4.38594C13.522 4.05537 13.9387 3.53313 14.1375 2.91719C13.6153 3.2278 13.0433 3.44561 12.4468 3.56094C12.1975 3.29442 11.896 3.0821 11.5611 2.93721C11.2261 2.79231 10.8649 2.71795 10.5 2.71876C9.02341 2.71876 7.83591 3.91563 7.83591 5.38438C7.83591 5.59063 7.86091 5.79688 7.90154 5.99532C5.6906 5.87969 3.71873 4.82344 2.40779 3.20626C2.16892 3.61425 2.04375 4.0788 2.04529 4.55157C2.04529 5.47657 2.5156 6.29219 3.23279 6.77188C2.81014 6.75524 2.39739 6.63907 2.0281 6.43282V6.46563C2.0281 7.76094 2.94373 8.83438 4.16404 9.08126C3.93491 9.14077 3.69921 9.17122 3.46248 9.17188C3.28904 9.17188 3.12498 9.15469 2.95935 9.13126C3.29685 10.1875 4.27966 10.9547 5.44998 10.9797C4.53435 11.6969 3.38748 12.1188 2.14216 12.1188C1.91873 12.1188 1.71248 12.1109 1.49841 12.0859C2.67966 12.8438 4.08123 13.2813 5.5906 13.2813C10.4906 13.2813 13.1719 9.22188 13.1719 5.69844C13.1719 5.58282 13.1719 5.46719 13.164 5.35157C13.6828 4.97188 14.1375 4.50157 14.5 3.97344Z" fill="black"/>
          </svg>
        </a>
        <a href={`whatsapp://send?text=${tweetShare}`} data-action="share/whatsapp/share">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.516 2.01194C6.206 2.26194 2.017 6.65194 2.033 11.9289C2.03564 13.4822 2.40753 15.0127 3.118 16.3939L2.06 21.4949C2.0471 21.5587 2.05048 21.6247 2.06983 21.6868C2.08919 21.749 2.1239 21.8052 2.17075 21.8504C2.2176 21.8955 2.27508 21.9281 2.33787 21.9452C2.40067 21.9622 2.46675 21.9632 2.53 21.9479L7.564 20.7639C8.89729 21.4228 10.361 21.7754 11.848 21.7959C17.275 21.8789 21.799 17.6009 21.968 12.2159C22.15 6.44094 17.351 1.73494 11.516 2.01094V2.01194ZM17.523 17.3789C16.7975 18.1019 15.9364 18.6745 14.9892 19.064C14.042 19.4536 13.0272 19.6523 12.003 19.6489C10.798 19.6526 9.60869 19.376 8.52901 18.8409L7.828 18.4939L4.741 19.2199L5.391 16.0889L5.045 15.4169C4.4841 14.3297 4.19324 13.1234 4.197 11.8999C4.197 9.82994 5.009 7.88294 6.483 6.41994C7.9522 4.96564 9.93576 4.14958 12.003 4.14894C14.089 4.14894 16.049 4.95494 17.523 6.41894C18.2492 7.13458 18.8255 7.98779 19.2182 8.92871C19.6109 9.86962 19.8121 10.8794 19.81 11.8989C19.81 13.9509 18.985 15.9289 17.523 17.3799V17.3789Z" fill="black"/>
            <path d="M16.842 14.045L14.911 13.495C14.7864 13.4592 14.6545 13.4576 14.529 13.4903C14.4036 13.5231 14.2893 13.5889 14.198 13.681L13.726 14.159C13.6284 14.2579 13.5037 14.3259 13.3676 14.3543C13.2316 14.3828 13.0901 14.3705 12.961 14.319C12.048 13.952 10.126 12.256 9.63502 11.407C9.56619 11.2871 9.53475 11.1493 9.54472 11.0114C9.5547 10.8735 9.60564 10.7418 9.69102 10.633L10.103 10.103C10.1823 10.0015 10.2325 9.88023 10.2482 9.75234C10.2639 9.62445 10.2445 9.4947 10.192 9.377L9.38002 7.553C9.33409 7.45105 9.26514 7.36114 9.1786 7.29034C9.09205 7.21954 8.99026 7.16979 8.88124 7.14498C8.77221 7.12017 8.65891 7.12098 8.55025 7.14736C8.44159 7.17374 8.34053 7.22496 8.25502 7.297C7.71602 7.75 7.07602 8.437 6.99902 9.2C6.86202 10.543 7.44202 12.236 9.63602 14.27C12.171 16.619 14.202 16.93 15.523 16.611C16.273 16.431 16.873 15.708 17.25 15.117C17.3103 15.0231 17.3477 14.9164 17.3593 14.8054C17.3708 14.6945 17.3562 14.5823 17.3165 14.4781C17.2768 14.3738 17.2132 14.2803 17.1308 14.2051C17.0484 14.1299 16.9495 14.075 16.842 14.045V14.045Z" fill="black"/>
          </svg>
        </a>
      </div>
    </button>
    <div className="copied">Copied!</div>
  </>);
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
                      <span className={homes.hHeadline}>
                        {comic.title}
                      </span>    
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
              <h1>
                Info
                <Share />
              </h1>
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
              <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Characters</h3>
                <ul>
                  {comic.characters.map(val => (
                    <li key={val.name}>
                      {val.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Creators</h3>
                <ul>
                  {comic.creators.map(val => (
                    <li key={val.name}>
                      {`${val.name} (${splits(val.role)})`}
                    </li>
                  ))}
                </ul>
              </div>
              {!comic.events[0] || <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Events</h3>
                <ul>
                  {comic.events.map(val => (
                    <li key={val.name}>
                      {val.name}
                    </li>
                  ))}
                </ul>
              </div>}
              {!comic.collections[0] || <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Collections</h3>
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
              {!comic.issues[0] || <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Issues</h3>
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
              {!comic.variants[0] || <div className={styles.gridDiv + " no-flex"}>
                <h3 className={styles.title}>Variants</h3>
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
                <h3 className={styles.title}>Blurbs</h3>
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