import React from 'react';
import { Link } from '@reach/router';

function ComicSmall({ data }) {
  return (
    <Link to={`/comics/${data.id}`}>
      <div>
        <img
          style={{ "width": "200px", "height": "300px", "objectFit": "cover" }}
          src={`${data.images[0].path}/portrait_fantastic.${data.images[0].extension}`}
          loading="lazy"
          alt={data.title}
        />
        <span>{data.title}</span>
      </div>
    </Link>
  )
}

export default ComicSmall;