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
    identificationCard: {
        id_number: String,
        issuedDate: Date,
        expiryDate: Date,
        id_name: String,
        photos: [String]
    },
    region: {
        coordinates: {
            lat: Number,
            lng: Number
        },
        radius: Number
    },
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
    },
    activeSessions: [{
        token: String,
        dateTime: Date,
        userAgent: String,
        Os: String
    }],
}, { timestamps: true });

// OpratorSchema.virtual("full_name").get(function() {
//     return this.name.first + " " + this.name.last;
// });

const Operator = mongoose.model('Operator', OpratorSchema);

module.exports = Operator;