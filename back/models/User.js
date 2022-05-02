const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: String,
    phoneNumber: String,
    profilePicture: String,
    username: String,
    identificationCards: {
        id_name: String,
        id_number: String,
        issuedDate: Date,
        expiryDate: Date,
        photos: [String]
    },
    ownedcars: [{
        type: mongoose.Types.ObjectId,
        ref: "Car"
    }],
    drivinglicense: [{
        license_name: String,
        license_number: String,
        issuedDate: Date,
        expiryDate: Date,
        photos: [String]
    }],
    password: String,
    status: {
        operator: {
            type: mongoose.Types.ObjectId,
            ref: 'Operator',
        },
        current: Boolean,
        reason: String
    },
    activeSessions: [{
        token: String,
        dateTime: Date,
        userAgent: String,
        Os: String
    }],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;