const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    platenumber: {
        type: String,
        required: true
    },
    level: {
        community: String,
        level: Number
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    photos: [String],
    illegalDriver: Boolean,
    driver: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status: {
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Oprator'
        },
        current: Boolean,
        reason: String
    }
}, { timestamps: true });

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;