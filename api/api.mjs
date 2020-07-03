import express from 'express'
import crypto from 'crypto';
import fetch from 'node-fetch';

import { PUBLIC_KEY, PRIVATE_KEY } from '../config/constants.mjs';

const app = express();

function hash(ts) {
  const data = ts + PRIVATE_KEY + PUBLIC_KEY;
  return crypto.createHash("md5").update(data).digest("hex");
}

async function API(req, res) {
  const ts = Date.now();
  const path = req.url.replace('/api', '');
  
  const url = new URL(`/v1/public${path}`, 'https://gateway.marvel.com:443/');
  url.searchParams.append('ts', ts);
  url.searchParams.append('apikey', PUBLIC_KEY);
  url.searchParams.append('hash', hash(ts));

  const result = await fetch(url);
  
  res.status(200).json(await result.json())
}

app.all('*', API)

export default app;