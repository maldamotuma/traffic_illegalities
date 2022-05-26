const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
    title: String,
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    traffic_police: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trafficpolice'
    },
    region: [{
        lat: Number,
        lng: Number
    }],
    violated_rule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rule'
    }],
    exact_violation: [String],
    driver_fault: Boolean,
    consequences: [{
        consequence_type: String,
        measurement: String,
        numeric_measurement: Number
    }],
    arrested: [
        { arrest_type: String, measurement: String }
    ]
}, { timestamps: true });


const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;