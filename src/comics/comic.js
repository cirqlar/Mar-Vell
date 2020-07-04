import React from 'react';
import { useParams } from '@reach/router';
import { useQuery } from 'react-query';
import { fetchComic } from '../shared/scripts/fetches';
import TabNav from '../shared/tabNav';

function main({ isLoading, isError, error, data }) {
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div>{data.id}</div>
    </>
  );
}

function Comic() {
  const params = useParams();

  const query = useQuery(['comic', params.id], fetchComic);

  return (
    <>
      <TabNav />
      { main(query) }
    </>
  )
}

export default Comic;