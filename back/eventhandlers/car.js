module.exports.carEvents = (socket, carSocket) => {
    socket.on("join", (id) => {
        socket.join("op_" + id);
    });

    socket.on("os_inform", (car_obj, receiver) => {
        console.log(car_obj, receiver);
        carSocket.to(receiver).emit('track_car', car_obj);
    });

    socket.on("car_assignment", (traffic, car) => {
        console.log(traffic, car);
    });
}