require('dotenv').config();
const Systemadmin = require("../../models/Systemadmin");
const User = require("../../models/User");

module.exports.schemaRefs = [Systemadmin, User];
module.exports.secretVariables = [process.env.SYSTEM_ADMIN_SIGN_STRING, process.env.USER_SIGN_STRING];