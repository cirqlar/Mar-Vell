
import Loadable from 'react-loadable';

import Loading from './shared/loading';

export const Home = Loadable({
  loader: () => import('./home/home'),
  loading: Loading,
});

export const Comics = Loadable({
  loader: () => import('./comics/comics'),
  loading: Loading,
});

export const ComicList = Loadable({
  loader: () => import('./comics/comicList'),
  loading: Loading,
});

export const Comic = Loadable({
  loader: () => import('./comics/comic'),
  loading: Loading,
});