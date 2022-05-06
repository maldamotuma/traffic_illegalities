const UserOperator = require("../models/Useroperator");

module.exports.UseOperatorEvent = (socket, userOperatorSocket) => {
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

        userOperatorSocket.to(receiver).emit('receive_message', { _id: conversation._id, message });
    });
    // socket.on("send_message", (conv_id, receiver) => {
    //     userOperatorSocket.to(receiver).emit('receive_message', conversation);
    // });
}