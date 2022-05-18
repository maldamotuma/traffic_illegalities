const mongoose = require("mongoose");

const OfficeTrafficSchema = new mongoose.Schema({
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
    identificationCards: {
        idType: String,
        issuedDate: Date,
        expiryDate: Date,
        photos: [String]
    },
    password: {
        type: String,
        required: true
    },
    status: {
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Systemadmin',
        },
        current: Boolean,
        reason: String
    },
    assignedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Systemadmin',
    },
    activeSessions: [{
        token: String,
        dateTime: Date,
        userAgent: String,
        Os: String
    }],
}, { timestamps: true });

const Officetraffic = mongoose.model('Officetraffic', OfficeTrafficSchema);

module.exports = Officetraffic;