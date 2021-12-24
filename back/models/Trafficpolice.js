const mongoose = require("mongoose");

const TrafficPoliceSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    profilePicture: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    identificationCards: [{
        idType: String,
        issuedDate: Date,
        expiryDate: Date,
        photos: [String]
    }],
    password: {
        type: String,
        required: true
    },
    status: {
        current: Boolean,
        reason: String,
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Systemadmin',
        }
    },
    assignedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Systemadmin',
    }
}, { timestamps: true });

const Trafficpolice = mongoose.model('Trafficpolice', TrafficPoliceSchema);

module.exports = Trafficpolice;