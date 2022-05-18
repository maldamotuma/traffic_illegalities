require('dotenv').config();
const Operator = require('../../models/Oprator');
const Systemadmin = require("../../models/Systemadmin");
const Trafficpolice = require('../../models/Trafficpolice');
const User = require("../../models/User");
const Officetraffic = require("../../models/Officetraffic");

module.exports.schemaRefs = [Systemadmin, User, Operator, Trafficpolice, Officetraffic];
module.exports.secretVariables = [
    process.env.SYSTEM_ADMIN_SIGN_STRING,
    process.env.USER_SIGN_STRING,
    process.env.OPERATOR_SIGN_STRING,
    process.env.TRAFFIC_POLICE_SIGN_STRING,
];