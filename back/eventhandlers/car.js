const Record = require("../models/Record");
const TrafficHolding = require("../models/TrafficHolding");
const traffic_car = {}; // get traffic id using car id to pull the data to traffic police --- car identifies to whom it will send
const tra_car_num = {}; // number of cars traffic holding
var traffic_polices = []; // available online traffic polices

function count_ass_car(tr_id) {
    let count_car = 0;
    for (const key in traffic_car) {
        if (traffic_car[key] === tr_id) {
            count_car++;
        }
    }

    return count_car;
}
module.exports.carEvents = (socket, carSocket) => {
    socket.on("join", (id) => {
        // console.log("operator joined overspeed detection !!!!!", id);
        socket.join("op_" + id);
        socket.join("operator");
    });

    socket.on("traffic_join", (id) => {
        console.log("traffic joined !!!! ");
        socket.join("tr_" + id);
    });

    socket.on("os_inform", async(car_obj, receiver) => {
        const records = await Record.findOne({
            driver: car_obj.driver,
            car: car_obj._id,
            closed: false,
            exact_violation: ["automatic_overspeed_detected"]
        });
        if (records) {
            console.log(records);
            records.region.push({
                lat: car_obj.lat,
                lng: car_obj.lng,
                speed: car_obj.speed,
                time: car_obj.time
            });
            await records.save();
        } else {
            console.log(records);
            await Record.create({
                driver: car_obj.driver,
                car: car_obj._id,
                closed: false,
                region: [{
                    lat: car_obj.lat,
                    lng: car_obj.lng,
                    speed: car_obj.speed,
                    time: car_obj.time
                }],
                exact_violation: ["automatic_overspeed_detected"]
            });
        }
        // typeof receiver === "string" ? carSocket.to(receiver).emit('track_car', car_obj) : carSocket.to([receiver.traffic, receiver.operator]).emit('track_car', car_obj);
        // typeof receiver === "string" ? carSocket.to("op_62a5d2dd3a2de4a3245d5e6b").emit('track_car', car_obj) : carSocket.to(["tr_62a5dec91e8466e4ce4cd871", "op_62a5d2dd3a2de4a3245d5e6b"]).emit('track_car', car_obj);
        if (traffic_car["ca_" + car_obj._id]) {
            carSocket.to([receiver, traffic_car["ca_" + car_obj._id]]).emit('track_car', car_obj);
        } else {
            carSocket.to([receiver]).emit('track_car', car_obj);
        }
    });

    socket.on("car_assignment", async(traffic, car) => {
        const trfc = await TrafficHolding.findOne({
            traffic: traffic.substring(3)
        });
        if (trfc) {
            trfc.cars.push(car.substring(3));
            await trfc.save()
            carSocket.to("operator").emit('ass_cars', { _id: traffic.substring(3), no: trfc.cars.length });
        } else {
            const trfc_new = await TrafficHolding.create({
                traffic: traffic.substring(3),
                cars: [car.substring(3)]
            });
            carSocket.to("operator").emit('ass_cars', { _id: traffic.substring(3), no: trfc_new.cars.length });
        }
        if (traffic_car[car]) {
            traffic_car[car] = traffic;
        } else {
            traffic_car[car] = traffic;
        }
    });
}