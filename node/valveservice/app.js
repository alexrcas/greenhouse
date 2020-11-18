'use strict';

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

const PORT = process.argv[2] || 7000;

let volumeLimit = 0;

let sendValveRequest = option => {
    axios.post(`http://localhost:4000/valve/${option}`)
        .then(response => {return response.data})
        .catch(e => console.log(e));
}


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/open', (req, res) => {
    volumeLimit = req.body.volume;
    sendValveRequest('open');
    res.sendStatus(200);
});

app.post('/close', (req, res) => {
    sendValveRequest('close');
    res.sendStatus(200);
});

const ioClient = require('socket.io-client')('http://localhost:4000');

ioClient.on('watering', volumeData => {
    console.log(`limite: ${volumeLimit} - usados: ${volumeData.volume}`)
    if (volumeData.volume >= volumeLimit) {
        volumeLimit = 0;
        sendValveRequest('close');
    }
})