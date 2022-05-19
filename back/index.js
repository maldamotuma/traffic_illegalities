const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const databaseConfiguration = require('./config/database');
const AdminRouter = require('./routes/systemadmin/authroute');
const UserRouter = require('./routes/userroute');
const OperatorRouter = require('./routes/operatorroute');
const TraffcPoliceRouter = require("./routes/trafficPoliceRoute");
const TraffcOfficeRouter = require("./routes/trafficofficeroute");
// var bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const httpServer = createServer(app);
require('dotenv').config();
const port = process.env.PORT;

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3001', 'http://localhost:3000', '10.240.72.36:5000'],
        credentials: true
    }
});

let onlineUsers = [];

app.use(require('cookie-parser')());
app.use(express.static('pictures'));
app.use(express.json());

const mongoose = require('mongoose');
const UserOperator = require('./models/Useroperator');
const { info } = require('./controllers/generalController');
const { UseOperatorEvent } = require('./eventhandlers/UserOperator');
const { carEvents } = require('./eventhandlers/car');

/**
 * model configuration
 */
const Systemadmin = require('./models/Systemadmin');
const Operator = require('./models/Oprator');
const Conversation = require('./models/Conversation');
const Speed = require('./models/Speed');
const User = require('./models/User');
const Useroperator = require('./models/Useroperator');
const Record = require('./models/Record');
const Rule = require('./models/Rule');
const Crashlog = require('./models/Crashlog');
const { logger_to_file } = require('./logger');
const { sendServerError } = require('./controllers/helpers/utils');
const { downloadCrash } = require('./controllers/systemadmin/crashreport');

/** end of model configuration */
const systemAdminCorsConfig = {
    origin: ['http://localhost:3001', 'http://localhost:3000', '10.240.72.36:5000'],
    credentials: true
};
app.use('/sa', cors(systemAdminCorsConfig));
app.use('/sa', AdminRouter);
app.use('/user', UserRouter);
app.use('/operator', cors(systemAdminCorsConfig));
app.use('/operator', OperatorRouter);
app.use('/traffic-police', TraffcPoliceRouter);
app.use('/traffic-office', cors(systemAdminCorsConfig));
app.use('/traffic-office', TraffcOfficeRouter);

/**
 * database configuration
 */
databaseConfiguration()
    /** end of database configuration */


app.get('/', async(req, res) => {
    try {
        await Comment.get();
    } catch (error) {
        sendServerError(res, error, "User");
    }
});
app.post('/test-lab', async(req, res) => {
    try {
        console.log("dagi connected !!", req.cookies);
        res.send("successfull dagisho!!!");
    } catch (error) {
        sendServerError(res, error, "User");
    }
});
app.get('/info', info);

const userOperatorSocket = io.of('/userOperator');
userOperatorSocket.on("connection", (socket) => {
    console.log("new conversatoion");
    UseOperatorEvent(socket, userOperatorSocket);
});

const carSocket = io.of('/car');
carSocket.on("connection", (socket) => {
    carEvents(socket, carSocket);
});

io.on("connection", (socket) => {
    console.log('connected!!!');
    // io.emit('status', 'connec');
    socket.on("online", user => {
        onlineUsers.push({...user, sid: socket.id });
        socket.join(user.id);
        io.emit("online_users", onlineUsers);
    });
    socket.on("new_message", async(message, convid) => {
        const conversation = await Conversation.findOne({ _id: convid });
        conversation.messages.push(message);
        const newMessage = await conversation.save();
        io.to(message.receiver.pid).emit("receive_message", message, convid);
    })
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(ou => ou.sid !== socket.id);
        io.emit("online_users", onlineUsers);
    });
});


httpServer.listen(port, () => console.log('> Server is up and running on port : ' + port));