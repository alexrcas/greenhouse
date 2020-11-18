'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(bodyParser.json())
app.io = io;

const PORT = process.argv[2] || 4000;


server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

app.post('/measure', (req, res) => {
    console.log(`POST - measure: ${req.body}`)
    io.emit('measure', req.body)
    res.sendStatus(200);
})

app.post('/watering', (req, res) => {
    console.log(`POST - watering: ${req.body}`)
    io.emit('watering', req.body)
    res.sendStatus(200);
})

app.post('/wateringFinish', (req, res) => {
    console.log(`POST - wateringFinish: ${req.body}`)
    io.emit('wateringFinish', req.body);
    res.sendStatus(200);
})

app.post('/valve/open', (req, res) => {
    console.log(`POST - /valve/open`)
    io.emit('openValve');
    res.sendStatus(200);
})

app.post('/valve/close', (req, res) => {
    console.log(`POST - /valve/close`)
    io.emit('closeValve');
    res.sendStatus(200);
})
