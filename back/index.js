const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const databaseConfiguration = require('./config/database');
const AdminRouter = require('./routes/systemadmin/authroute');
const UserRouter = require('./routes/userroute');
const OperatorRouter = require('./routes/operatorroute');
const cors = require('cors');
const app = express();
const httpServer = createServer(app);
require('dotenv').config();
const port = process.env.PORT;

const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:3000', 'http://192.168.32.26:5000'],
        credentials: true
    }
});

let onlineUsers = [];

const mongoose = require('mongoose');
const UserOperator = require('./models/Useroperator');

/**
 * model configuration
 */
//  const Systemadmin = require('./models/Systemadmin');
// const Operator = require('./models/Oprator');
// const Conversation = require('./models/Conversation');
// const Speed = require('./models/Speed');
// const User = require('./models/User');
// const Useroperator = require('./models/Useroperator');
// const { id } = require('date-fns/locale');
/** end of model configuration */

app.use(require('cookie-parser')());
app.use(express.static('pictures'));
app.use(express.json());
const systemAdminCorsConfig = {
    origin: ['http://localhost:3000', 'http://192.168.32.26:5000'],
    credentials: true
};
app.use('/sa', cors(systemAdminCorsConfig));
app.use('/sa', AdminRouter);
app.use('/user', UserRouter);
app.use('/operator', cors(systemAdminCorsConfig));
app.use('/operator', OperatorRouter);

/**
 * database configuration
 */
databaseConfiguration()
    /** end of database configuration */


app.get('/', (req, res) => {
    res.send('hello from simple server ');
});
const userOperatorSocket = io.of('/userOperator');
userOperatorSocket.on("connection", (socket) => {
    socket.on("join", (id) => {
        socket.join("op_" + id);
    });
    socket.on("user_join", (id) => {
        socket.join("us_" + id);
    });
    socket.on("send_message", async(conversation, receiver) => {
        const message = {
            sender: conversation.sender,
            receiver: conversation.receiver,
            text: conversation.text
        };
        const tmpconversation = await UserOperator.findOne({ _id: conversation._id });
        tmpconversation.messages.push(message);
        const newMessage = await tmpconversation.save();

        console.log(message);
        userOperatorSocket.to(receiver).emit('receive_message', { _id: conversation._id, message });
    });
    // socket.on("send_message", (conv_id, receiver) => {
    //     userOperatorSocket.to(receiver).emit('receive_message', conversation);
    // });
});

const carSocket = io.of('/car');
carSocket.on("connection", (socket) => {
    console.log('Car connected!!!');
    socket.on("info", (id, speed, lat, long) => {
        console.log("ID: " + id);
        console.log("speed: " + speed);
        console.log("long: " + long);
        console.log("lat: " + lat);
        carSocket.emit('track_car', {
            id,
            speed,
            lat,
            long
        });
    });
});
io.on("connection", (socket) => {
    console.log('connected!!!');
    // io.emit('status', 'connected');
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