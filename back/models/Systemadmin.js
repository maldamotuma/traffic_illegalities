const mongoose = require("mongoose");

const SystemadminSchema = new mongoose.Schema({
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
    veryFirst: {
        type: Boolean,
        default: false
    },
    status: {
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Systemadmin'
        },
        current: Boolean,
        reason: String
    },
    assignedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Systemadmin'
    },
    activeSessions: [{
        token: String,
        dateTime: Date,
        userAgent: String,
        Os: String
    }],
}, { timestamps: true });

const Systemadmin = mongoose.model('Systemadmin', SystemadminSchema);

module.exports = Systemadmin;