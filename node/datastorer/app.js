'use strict';

const io = require('socket.io-client')('http://localhost:4000');
const mongoose = require('mongoose');
const uri = "mongodb+srv://ghuser:ghuser@cluster0.iklun.gcp.mongodb.net/greenhouse?retryWrites=true&w=majority";
const measureModel = require('./models/measure');
const wateringModel = require('./models/watering');

try {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
}
catch(error) {
    console.log(error);
}

io.on('measure', async data => {
    console.log(`ON - measure: ${data}`)
    const measure = new measureModel(data);
    try { await measure.save()}
    catch(err) { console.log(err)}
});

io.on('wateringFinish', async data => {
    console.log(`ON - wateringFinish: ${data}`)
    const watering = new wateringModel(data);
    try {await watering.save()}
    catch(err) { console.log(err) }
});