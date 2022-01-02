require('dotenv').config();
const jwt = require('jsonwebtoken');
const { secretVariables, schemaRefs } = require('../../controllers/helpers/datas');
const { sendRespose } = require('../../controllers/helpers/utils');

const verifyToken = async (res, req, secauth, next) => {
    try {
        const { username } = await jwt.verify(secauth.token, secretVariables[secauth.gs]);
        const currentUser = await schemaRefs[secauth.gs].findOne({ username, "activeSessions.token": secauth.token });
        if (currentUser) {
            req.user = currentUser;
            req.user.secToken = secauth.token;
            return next();
        }
        sendRespose(res, {user: null}, -1);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong while verifying your cookie' });
    }
}

module.exports.VerifyAuth = async (req, res, next) => {
    const { secauth } = req.cookies;
    /**
     * ? gs=actor values
     *   -> 0 system admin
     *   -> 1 operator system
     *   -> 2 traffic office
     *   -> 3 driver/car owner
     *   -> 4 client
     *   -> 5 car
     *   -> 6 traffic police
     */
    (secauth) ? await verifyToken(res, req, secauth, next) : sendRespose(res, {user: null}, -1);
}