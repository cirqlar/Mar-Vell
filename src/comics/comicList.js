import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchAllComics } from '../shared/scripts/fetches';
import ComicSmall from './comicSmall';
import TabNav from '../shared/tabNav';

import styles from './styles/comicList.module.css';

function guts({ status, data, fetchMore, canFetchMore, isFetchingMore }) {
  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }
  return (
    <>
      <div className={styles.grid}>
        {data.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.results.map(result => (
              <ComicSmall key={result.id} data={result} />
            ))}
          </React.Fragment>
        ))}
      </div>
      <button
        onClick={() => {
          console.log("clicked");
          fetchMore();
        }}
        disabled={!canFetchMore || isFetchingMore}
      >
        {isFetchingMore
          ? 'Loading More'
          : canFetchMore
          ? 'Load More'
          : 'Nothing More to Load'}
      </button>
    </>
  );
}

function ComicList({ titleStartsWith = null }) {
  const stuff = useInfiniteQuery(['comics', titleStartsWith], fetchAllComics, {
    getFetchMore: ({ data }) => {
      const { count, limit, offset, total } = data;
      const newOffset = count + ((offset === 0) ? 1 : offset);
      return (count === limit && newOffset < total ) ? newOffset : false;
    },
  });

  return (
    <>
      <TabNav />
      { guts(stuff) }
    </>
  )
}

export default ComicList;
