require('dotenv').config();
const Systemadmin = require("../../models/Systemadmin");

module.exports.schemaRefs = [Systemadmin];
module.exports.secretVariables = [process.env.SYSTEM_ADMIN_SIGN_STRING];