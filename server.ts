// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 80;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory } = require('./dist/server/main');
const compression = require('compression');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));


app.use(compression());

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/www./) !== null || req.headers.host.match(/.es/) !== null ) {
    let url = 'http://' + req.headers.host + req.url;
    if (url.match(/.es/) !== null ) {
      url = url.replace(/.es/, '.net');
    }
    if (url.match(/www./) !== null ) {
      url = url.replace(/www./, '');
    }
    res.redirect(url);
  } else {
    next();
  }
});

app.get('/*index*', (req, res) => {
  res.status(301).redirect('/');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('/', (req, res) => {
  res.render('index', { req });
});

app.get('/*', (req, res) => {
  res.status(404).send('Not found');
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
