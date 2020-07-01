import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { PORT } from './config/constants.mjs';
import api from './api/api.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(
  path.join(__dirname, '/app')
));

app.all('/api(/*)?', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/index.html'));
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`) );