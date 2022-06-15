const mongoose = require("mongoose");

const TrafficHoldingSchema = new mongoose.Schema({
    cars: [mongoose.Schema.Types.ObjectId],
    customers: [mongoose.Schema.Types.ObjectId],
    traffic: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });


const TrafficHolding = mongoose.model('TrafficHolding', TrafficHoldingSchema);

module.exports = TrafficHolding;