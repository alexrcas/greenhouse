'use strict';

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const uri = "mongodb+srv://ghuser:ghuser@cluster0.iklun.gcp.mongodb.net/greenhouse?retryWrites=true&w=majority";
const measureModel = require('./models/measure');
const wateringModel = require('./models/watering');

const PORT = process.argv[2] || 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
}
catch(error) {
    console.log(error);
}


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
})


app.get('/lastmeasure', (req, res) => {
    measureModel.findOne({}, {}, {sort: {'_id' : -1}}, (err, measures) => {
        res.json(measures);
    })
});

app.get('/measure', (req, res) => {
    measureModel.find({}, (err, measures) => {
        res.json(measures);
    })
});

app.get('/watering', (req, res) => {
    wateringModel.find({}, (err, waterings) => {
        res.json(waterings);
    })
});