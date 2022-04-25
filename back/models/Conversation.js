const mongoose = require("mongoose");

const refFinder = refin => {
    const refs = {
        Systemadmin: "Systemadmin",
        Opertor: "Operator"
    }
    return refs[refin] ?? "Systemadmin";
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
        }
}, { timestamps: true });


const ConversationSchema = new mongoose.Schema({
    participators: [
        {
            participatorType: String,
            pid: {
                type: mongoose.Types.ObjectId,
                ref: refFinder(this.participatorType)
            }
        }
    ],
    messages: [ MessageSchema ]
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = Conversation;