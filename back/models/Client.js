const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    email: [String],
    phoneNumber: [String],
    profilePicture: String,
    username: String,
    identificationCards: [{
        idType: String,
        issuedDate: Date,
        expiryDate: Date,
        photos: [String]
    }],
    password: String,
    status: {
        _id: mongoose.Types.ObjectId,
        ref: 'Oprator',
        current: Boolean,
        reason: String
    }
}, { timestamps });

module.exports = ClientSchema;