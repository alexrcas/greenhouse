'use strict';

const express = require('express');
const app = express();

const PORT = process.argv[2] || 8080;

app.use(express.static( __dirname));


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Now listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {root : __dirname})
});