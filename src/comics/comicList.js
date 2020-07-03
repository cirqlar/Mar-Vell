import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchAllComics } from '../shared/scripts/fetches';
import { Link } from '@reach/router';
import ComicSmall from './comicSmall';

function ComicList({ titleStartsWith = null }) {
  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery(['comics', titleStartsWith], fetchAllComics, {
    getFetchMore: ({ data }) => {
      const { count, limit, offset, total } = data;
      const newOffset = count + ((offset === 0) ? 1 : offset);
      return (count === limit && newOffset < total ) ? newOffset : false;
    },
  });

  if (status === "loading") {
    return <div>Loading</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }
  return (
    <>
      {data.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.results.map(result => (
            <ComicSmall key={result.id} data={result} />
          ))}
        </React.Fragment>
      ))}
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

export default ComicList;
