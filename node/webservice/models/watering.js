const mongoose = require('mongoose');

const WateringSchema = new mongoose.Schema({
        volume: {
            type: Number
        },
        timestamp: {
            type: Date
        }
    }
)

const Watering = mongoose.model('Watering', WateringSchema);

module.exports = Watering;