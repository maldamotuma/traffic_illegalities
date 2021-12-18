const mongoose = require("mongoose");

const OpratorSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: String,
    phoneNumber: String,
    profilePicture: String,
    username: String,
    identificationCards: [{
        idType: String,
        issuedDate: Date,
        expiryDate: Date,
        photos: [String]
    }],
    region: [{
        region: { latitude: String, longitude: String },
        specific: [{ latitude: String, longitude: String }]
    }],
    password: String,
    status: {
        _id: mongoose.Types.ObjectId,
        ref: 'Systemadmin',
        current: Boolean,
        reason: String
    },
    assignedBy: {
        _id: mongoose.Types.ObjectId,
        ref: 'Systemadmin',
    }
}, { timestamps });

module.exports = OpratorSchema;