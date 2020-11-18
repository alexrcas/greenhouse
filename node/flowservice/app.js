'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const ioServer = require('socket.io')(server);
app.use(bodyParser.json())
app.io = ioServer;

const PORT = process.argv[2] || 443;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


server.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

const ioClient = require('socket.io-client')('http://localhost:4000');

ioClient.on('watering', data => {
    console.log(`ON - watering: ${data}`)
    ioServer.emit('watering', data.volume)
});

ioClient.on('wateringFinish', data => {
    console.log(`ON - wateringFinish: ${data}`)
    ioServer.emit('wateringFinish', data.volume)
})