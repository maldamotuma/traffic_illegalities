const mongoose = require("mongoose");

const OpratorSchema = new mongoose.Schema({
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
    region: [{
        region: { latitude: String, longitude: String },
        specific: [{ latitude: String, longitude: String }]
    }],
    password: {
        type: String,
        required: true
    },
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


const Operator = mongoose.model('Operator', OpratorSchema);

module.exports = Operator;