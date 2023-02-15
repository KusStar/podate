'use strict';

const express = require('express');

const { exec } = require('child_process')

console.log('env token', process.env.PODATE_TOKEN)

// Constants
const PORT = 9999;
const HOST = '0.0.0.0';

// App
const app = express();

app.set('view engine', 'ejs')

const log = (...args) => {
  const msgs = [`[${new Date().toLocaleTimeString()}]`, ...args]
  console.log(...msgs)
  logs.push(msgs.join(' '))
}

const logs = []

log('LOG STARTED')
log('LISTENING...')

app.get('/', (req, res) => {
  res.render('index', { data: logs })
});

app.get('/hook', (req, res) => {
  if (req.headers.authorization !== process.env.PODATE_TOKEN) {
    return res.status(403).send('Err: Unauthorization!')
  }

  const { stderr, stdout } = exec('podman auto-update')
  stdout.on('data', data => {
    log('ON_DATA', data)
  })
  stderr.on('data', data => {
    log('ON_ERR', data)
  })
  stdout.on('end', () => {
    logs.push('\n')
  })
  res.status(200).send('triggered auto-update');
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});