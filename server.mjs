import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import ExpressCache from 'express-cache-middleware';
import cacheManager from 'cache-manager';
import redisStore from 'cache-manager-redis-store';

import { PORT, CORS_HOSTS } from './config/constants.mjs';
import api from './api/api.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url);
    else
      return next();
  } else
    return next();
});

let caching;

if (process.env.NODE_ENV === "development") {
  caching = cacheManager.caching({
    store: 'memory', max: 10000, ttl: 3600
  })
} else {
  caching = cacheManager.caching({
    store: redisStore,
    url: process.env.REDIS_URL,
    ttl: 3600,
  });
}

const hosts = (CORS_HOSTS).split(', ');
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if(hosts.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
}

app.use(cors(corsOptions));
app.use(compression());

const cacheMiddleware = new ExpressCache(caching);

app.use(express.static(
  path.join(__dirname, '/app'),
  {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      const hashRegExp = new RegExp('\\.[0-9a-f]{8}\\.');

      if (hashRegExp.test(path)) {
        res.setHeader('Cache-Control', 'max-age=31536000');
      }
    }
  }
));

cacheMiddleware.attach(api);

app.all('/api(/*)?', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`) );