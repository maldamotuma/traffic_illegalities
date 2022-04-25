const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
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
    email: [String],
    phoneNumber: [String],
    profilePicture: [String],
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
    drivingSchool: String,
    licsenceIssuedDate: Date,
    licsenceRenewedDate: Date,
    licsenceExpiryDate: Date,
    licsenceType: String,
    password: String,
    status: {
        updatedBy: {
            type: mongoose.Types.ObjectId,
            ref: 'Oprator'
        },
        current: Boolean,
        reason: String
    },
    carsDriving: [{
        car: {
            type: mongoose.Types.ObjectId,
            ref: 'Car'
        },
        current: Boolean,
        StartingDateTime: Date,
        lastingDateTime: Date
    }],
    ownedCar: [{
        type: mongoose.Types.ObjectId,
        ref: 'Car',
    }],
    history: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recordpunishment',
    }]
}, { timestamps: true });

const DriverOwner = mongoose.model('DriverOwner', DriverSchema);

module.exports = DriverOwner;