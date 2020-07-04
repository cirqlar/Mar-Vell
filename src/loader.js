
import loadable from '@loadable/component';

import Loading from './shared/loading';

export const Home = loadable(() => import('./home/home'), {
  fallback: Loading(),
});

export const ComicList = loadable(() => import('./comics/comicList'), {
  fallback: Loading(),
});

export const Comic = loadable(() => import('./comics/comic'), {
  fallback: Loading(),
});