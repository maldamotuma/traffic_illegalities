export const handleCarClick = (assignment, setassignment, id) => {
    if (assignment.car === id) {
        setassignment({ car: null, traffic: null });
    } else {
        setassignment({...assignment, car: id })
    }
}

export const handleTrafficClick = (assignment, setassignment, id, handleAssignment) => {
    if (assignment.car) {
        setassignment({...assignment, traffic: id });
        console.log({
            type: "info",
            msg: "Car Assigned to Traffic Police Sucessfully!!!"
        });
        handleAssignment(id);
        setTimeout(() => {
            setassignment({ car: null, traffic: null });
        }, 1000);
    }
}