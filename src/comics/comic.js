import React from 'react';
import { useParams } from '@reach/router';
import { useQuery } from 'react-query';
import { fetchComic } from '../shared/scripts/fetches';

function Comic() {
  const params = useParams();

  const {
    isLoading,
    isError,
    data,
    error,
  } = useQuery(['comic', params.id], fetchComic);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>{data.id}</div>
  )
}

export default Comic;