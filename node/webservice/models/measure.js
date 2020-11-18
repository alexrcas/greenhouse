const mongoose = require('mongoose');

const MeasureSchema = new mongoose.Schema({
        temperature: {
            type: Number
        },
        humidity: {
            type: Number
        },
        terrain: {
            type: Number
        },
        timestamp: {
            type: Date
        }
    }
)

const Measure = mongoose.model('Measure', MeasureSchema);

module.exports = Measure;