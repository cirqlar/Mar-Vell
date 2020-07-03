import React from 'react';
import { Link } from '@reach/router';

function Comics({ children }) {

  return (
    <>
      <Link to="" >Comics</Link>
      <Link to="issues">Issues</Link>

      <h1>Comics</h1>
      { children }
    </>
  )
}

export default Comics;