import user_traffic_socket from "../../redux/socketfile";

export const handleCarClick = (assignment, setassignment, id) => {
    if (assignment.car === id) {
        setassignment({ car: null, traffic: null });
    } else {
        setassignment({...assignment, car: id })
    }
}

export const handleTrafficClick = (assignment, setassignment, id, handleAssignment, assign_customer, customer) => {
    if (assignment.car) {
        setassignment({...assignment, traffic: id });
        handleAssignment(id);
        setTimeout(() => {
            setassignment({ car: null, traffic: null });
        }, 1000);
    }

    if (customer) {
        setassignment({...assignment, traffic: id });
        user_traffic_socket.emit("user_traffic_assignment", { user: customer, traffic: id });
        setTimeout(() => {
            setassignment({ car: null, traffic: null });
            assign_customer({ user: null });
        }, 1000);
    }
}