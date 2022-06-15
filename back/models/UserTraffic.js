const mongoose = require("mongoose");

const refFinder = refin => {
    const refs = {
        User: "User",
        Traffic: "Trafficpolice",
    }
    return refs[refin] ?? "Operator";
}

const MessageSchema = new mongoose.Schema({
    sender: {
        participatorType: String,
        pid: {
            type: mongoose.Types.ObjectId,
            ref: refFinder(this.participatorType)
        },
    },
    receiver: {
        participatorType: String,
        pid: {
            type: mongoose.Types.ObjectId,
            ref: refFinder(this.participatorType)
        }
    },
    text: {
        type: String,
        required: true,
    },
    location: {
        lat: Number,
        lng: Number,
        speed: Number,
    }
}, { timestamps: true });


const UserTrafficSchema = new mongoose.Schema({
    traffic: {
        type: mongoose.Types.ObjectId,
        ref: "Trafficpolice"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    closed: Boolean,
    messages: [MessageSchema]
}, { timestamps: true });

const UserTraffic = mongoose.model('UserTraffic', UserTrafficSchema);

module.exports = UserTraffic;