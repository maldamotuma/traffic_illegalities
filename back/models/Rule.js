const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
    title: String,
    description: String,
    frequent: [
        { count: Number, expected: String }
    ],
    article: String
}, { timestamps: true });


const Rule = mongoose.model('Rule', RuleSchema);

module.exports = Rule;