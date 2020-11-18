'use strict';

const axios = require('axios');
const express = require('express');
const app = express();

const PORT = process.argv[2] || 3000;

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})


app.get('/', (req, res) => {
    console.log(`GET - /: ${req.query}`)
    let data = {
        temperature: req.query.temp,
        humidity: req.query.hum,
        terrain: req.query.terr,
        timestamp: new Date()
    }
    axios.post('http://localhost:4000/measure', data)
        .then(response => {res.send(response.data)})
        .catch(e => console.log(e));
});


app.get('/watering', (req, res) => {
    console.log(`GET - watering: ${req.query}`)
    let data = {
        volume: req.query.volume
    }
    axios.post('http://localhost:4000/watering', data)
        .then(response => {res.send(response.data)})
        .catch(e => console.log(e));
})


app.get('/watering/finish', (req, res) => {
    console.log(`GET - watering/finish: ${req.query}`)
    let data = {
        volume: req.query.volume,
        timestamp: new Date()
    }
    axios.post('http://localhost:4000/wateringFinish', data)
    .then(response => {res.send(response.data)})
    .catch(e => console.log(e));
})