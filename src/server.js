const express = require('express');
const path = require('path');
const http = require('http');
const compression = require('compression');

const app = express();

app.use(compression());

const appName = 'Angular-SteamReview';

let p = path.join(__dirname, '..', 'dist', appName);

app.use(express.static(p));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', appName, 'index.html'));
});

const port = process.env.PORT || '4201';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Angular app \'${appName}\' running on port ${port}`));
