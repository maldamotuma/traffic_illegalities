const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: [String],
    phoneNumber: [String],
    profilePicture: [String],
    username: String,
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
        _id: mongoose.Types.ObjectId,
        ref: 'Oprator',
        current: Boolean,
        reason: String
    },
    carsDriving: [{
        _id: mongoose.Types.ObjectId,
        ref: 'Car',
        current: Boolean,
        StartingDateTime: Date,
        lastingDateTime: Date
    }],
    ownedCar: [{
        _id: mongoose.Types.ObjectId,
        ref: 'Car',
    }],
    history: [{
        _id: mongoose.Types.ObjectId,
        ref: 'Recordpunishment',
    }]
}, { timestamps });

module.exports = DriverSchema;