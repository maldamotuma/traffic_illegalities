// const UserOperator = require("../models/Usertraffic");

module.exports.UseTrafficEvent = (socket, userTrafficSocket) => {
    socket.on("traffic_join", (id) => {
        console.log("traffic joined !!!", id);
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
        // const tmpconversation = await UserOperator.findOne({ _id: conversation._id });
        // tmpconversation.messages.push(message);
        // const newMessage = await tmpconversation.save();
        console.log(conversation, receiver);
        userTrafficSocket.to(receiver).emit('receive_message', { _id: conversation._id, message });
    });
    // socket.on("send_message", (conv_id, receiver) => {
    //     userTrafficSocket.to(receiver).emit('receive_message', conversation);
    // });

    socket.on("user_traffic_assignment", ass_info => {
        console.log(ass_info);
        userTrafficSocket.to("us_" + ass_info.user).emit("traffic_police", ass_info.traffic);
    });
}