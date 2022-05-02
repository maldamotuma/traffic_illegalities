const mongoose = require("mongoose");

const refFinder = refin => {
    const refs = {
        User: "User",
        Opertor: "Operator",
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


const UserOperatorSchema = new mongoose.Schema({
    operator: {
        type: mongoose.Types.ObjectId,
        ref: "Operator"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    closed: Boolean,
    messages: [MessageSchema]
}, { timestamps: true });

const UserOperator = mongoose.model('UserOperator', UserOperatorSchema);

module.exports = UserOperator;