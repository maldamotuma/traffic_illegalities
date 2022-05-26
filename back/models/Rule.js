const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
    title: String,
    description: String,
    frequent: [
        { count: Number, expected: String }
    ],
    article: String,
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Systemadmin"
    }
}, { timestamps: true });


const Rule = mongoose.model('Rule', RuleSchema);

module.exports = Rule;