const mongoose = require("mongoose");

const SpeedSchema = new mongoose.Schema({
    regionInfo: String,
    speedLimit: Number,
    region: [{
        lat: Number,
        lng: Number
    }],
    status: {
        current: Boolean,
        reason: String,
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Systemadmin',
        }
    },
    assignedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Systemadmin',
    }
}, { timestamps: true });


const Speed = mongoose.model('Speed', SpeedSchema);

module.exports = Speed;