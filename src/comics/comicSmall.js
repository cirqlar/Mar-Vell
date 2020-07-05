import React from 'react';
import { Link } from '@reach/router';

import styles from './styles/comicSmall.module.css';

import { imgString } from '../shared/scripts/utils';


function ComicSmall({ data }) {
  const { date } = data.dates.find((el) => el.type === "onsaleDate");
  const dateString = (new Date(date)).toLocaleDateString();

  return (
    <Link to={`/comics/${data.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <picture className={styles.cardImg}>
          <source media="(min-width: 839px)" srcSet={imgString(data.images[0], "landscape_incredible")} />
          <source media="(min-width: 375px)" srcSet={imgString(data.images[0], "portrait_incredible")} />
          <source srcSet={imgString(data.images[0], "portrait_xlarge")} />
          <img
            className="little"
            src={imgString(data.images[0], "portrait_xlarge")}
            style={{ "width": "500px", "height": "500px" }}
            loading="lazy"
            alt={data.title}
          />
          {/* <img
            className="big"
            src={imgString(data.images[0], "portrait_incredible")}
            style={{ "width": "200px", "height": "300px" }}
            loading="lazy"
            alt={data.title}
          /> */}
        </picture>
        <div className={styles.cardText}>
          <p className={styles.cardTitle}>{data.title}</p>
          <time className={styles.cardDate} dateTime={date}>{dateString}</time>
        </div>
      </div>
    </Link>
  )
}

export default ComicSmall;