const TrafficHolding = require("../models/TrafficHolding");
const traffic_car = {}; // get traffic id using car id to pull the data to traffic police --- car identifies to whom it will send

module.exports.assignmentEvents = (socket, assignmentEventsSocket) => {
    socket.on("operator_join", id => {
        console.log("opera");
        socket.join("operator");
    })
    socket.on("car_assignment", async(traffic, car) => {
        const trfc = await TrafficHolding.findOne({
            traffic: traffic.substring(3)
        });
        if (trfc) {
            trfc.cars.push(car.substring(3));
            await trfc.save()
            assignmentEventsSocket.to("operator").emit('ass_cars', { _id: traffic.substring(3), no: trfc.cars.length });
        } else {
            const trfc_new = await TrafficHolding.create({
                traffic: traffic.substring(3),
                cars: [car.substring(3)]
            });
            assignmentEventsSocket.to("operator").emit('ass_cars', { _id: traffic.substring(3), no: trfc_new.cars.length });
        }
        if (traffic_car[car]) {
            traffic_car[car] = traffic;
        } else {
            traffic_car[car] = traffic;
        }
    });
}