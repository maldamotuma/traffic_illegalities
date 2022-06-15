const TrafficHolding = require("../models/TrafficHolding");
const UserTraffic = require("../models/UserTraffic");

var traffic_polices = [];

module.exports.UseTrafficEvent = (socket, userTrafficSocket) => {
    socket.on("operator_join", (opera) => {
        socket.join("operator");
        userTrafficSocket.to("operator").emit("traffic_update", traffic_polices);
    });
    socket.on("traffic_join", async(id, lat, lang) => {
        console.log("traffic police joined right now : "+id +" : "+ lat, lang);
        socket.join("tr_" + id);
        const trfc = await TrafficHolding.findOne({
            traffic: id
        });
        traffic_polices.push({
            sid: socket.id,
            _id: id,
            lat: parseFloat(lat),
            lng: parseFloat(lang),
            cars: trfc?.cars?.length ?? 0,
            customers: trfc?.customers?.length ?? 0,

        });
        userTrafficSocket.to("operator").emit("traffic_update", traffic_polices);
    });
    socket.on("user_join", (id) => {
        // console.log("User joined channel with traffic police !!", id);
        socket.join("us_" + id);
    });
    socket.on("send_message", async(conversation, receiver) => {
        const message = {
            sender: conversation.sender,
            receiver: conversation.receiver,
            text: conversation.text
        };
        const tmpconversation = await UserTraffic.findOne({ _id: conversation._id });
        if (tmpconversation) {
            tmpconversation.messages.push(message);
            const newMessage = await tmpconversation.save();
        }
        // console.log("Halooo   !!  : ", tmpconversation);
        userTrafficSocket.to(receiver).emit('receive_message', { _id: conversation._id, message });
    });
    // socket.on("send_message", (conv_id, receiver) => {
    //     userTrafficSocket.to(receiver).emit('receive_message', conversation);
    // });

    socket.on("user_traffic_assignment", async(ass_info) => {

        // console.log("user_traffic_assignment : ", ass_info);
        const conversation = await UserTraffic.findOne({ closed: false, user: ass_info.user, traffic: ass_info.traffic }).exec();
        if (conversation) {
            // console.log(conversation);
            userTrafficSocket.to("us_" + ass_info.user).emit('conversation', { conversation });
        } else {
            const tmp_conversation = new UserTraffic({
                user: ass_info.user,
                traffic: ass_info.traffic,
                closed: false
            });
            const new_conv = await tmp_conversation.save();
            // console.log(new_conv);
            userTrafficSocket.to("us_" + ass_info.user).emit("conversation", { conversation: new_conv });
        }
    });

    socket.on("disconnect", reason => {
        // console.log("disconnected traffic police !!!");
        let tr_tmp = traffic_polices.filter(trf => trf.sid !== socket.id);
        traffic_polices = [...tr_tmp];
        userTrafficSocket.emit("traffic_update", traffic_polices);
    })
}