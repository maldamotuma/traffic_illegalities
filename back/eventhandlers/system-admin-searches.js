// const UserOperator = require("../models/Usertraffic");

const User = require("../models/User");

module.exports.locationSearch = (socket, locationSearchSocket) => {
    socket.on("sa_join", (id) => {
        // console.log("System Admin Joining the search room !!!", id);
        socket.join("sa_" + id);
    });
    socket.on("user_join", (id) => {
        // console.log("User Joining the search room !!!", id);
        socket.join("us_" + id);
    });
    socket.on("traffic_join", (id) => {
        socket.join("tr_" + id);
    });
    socket.on("traffic_police", async(traffic_police, system_admin) => {
        // console.log("traffic_police", traffic_police);
        locationSearchSocket.to("tr_" + traffic_police).emit('my_location', system_admin);
    });
    socket.on("user", async(username, system_admin) => {
        try {
            const user = await User.findOne({ username }, "_id");
            locationSearchSocket.to("us_" + user._id).emit("current_location", system_admin);
        } catch (error) {

        }
    });
    socket.on("car", async(traffic_police, system_admin) => {
        // console.log("car", traffic_police);
        locationSearchSocket.to("tr_" + traffic_police).emit('my_location', system_admin);
    });

    socket.on("search_response", async(current_location, system_admin) => {
        locationSearchSocket.to("sa_" + system_admin).emit('location_response', current_location);
    });

    socket.on("user_traffic_assignment", ass_info => {
        // console.log(ass_info);
        locationSearchSocket.to("us_" + ass_info.user).emit("traffic_police", ass_info.traffic);
    });
}