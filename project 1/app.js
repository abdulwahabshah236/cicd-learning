const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello from Project 1 - Basic Web App!'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;