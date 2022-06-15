const mongoose = require('mongoose');


async function main() {
    try {
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to mongo");
        });
        mongoose.connection.on("error", (err) => {
            console.log(err);
        });
        // await mongoose.connect('mongodb+srv://maldamotuma:miHG7rTb2qlvGvcv@cluster0.lhnt9.mongodb.net/traffic_illegality?retryWrites=true&w=majority');
        await mongoose.connect('mongodb://localhost:27017/traffic_illegality');
    } catch (error) {
        console.log(error)
    }
}

module.exports = main;