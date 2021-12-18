const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    name: String,
    type: { type: String },
    platenumber: String,
    level: {
        community: String,
        level: Number
    },
    owner: {
        _id: mongoose.Types.ObjectId,
        ref: 'Driverowner'
    },
    photos: [String],
    illegalDriver: Boolean,
    driver: {
        _id: mongoose.Types.ObjectId,
        ref: 'Driverowner'
    },
    status: {
        _id: mongoose.Types.ObjectId,
        ref: 'Oprator',
        current: Boolean,
        reason: String
    }
}, { timestamps });

module.exports = CarSchema;