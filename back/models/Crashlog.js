const mongoose = require("mongoose");

const CrashlogSchema = new mongoose.Schema({
    log_file: String,
    seen_at: Date,
    addressed_at: Date,
    from: String
}, { timestamps: true });

const Crashlog = mongoose.model('CrashlogOwner', CrashlogSchema);

module.exports = Crashlog;