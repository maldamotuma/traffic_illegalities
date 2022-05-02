import React, { useState } from 'react';
import Mapfitun from '../mapcomponents/Mapfitun';
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as operationActions from "../../redux/actions/Operationactions";

const Index = () => {
    const [assignment, setassignment] = useState({ car: null, traffic: null });
    const dispatch = useDispatch();
    const { notify } = bindActionCreators(operationActions, dispatch);
    const handleClick = id => {
        if (assignment.car === id) {
            setassignment({ car: null, traffic: null });
        } else {
            setassignment({ ...assignment, car: id })
        }
    }
    const handleAssign = id => {
        if (assignment.car) {
            setassignment({ ...assignment, traffic: id });
            notify({
                type: "info",
                msg: "Car Assigned to Traffic Police Sucessfully!!!"
            });
            setTimeout(() => {
                setassignment({ car: null, traffic: null });
            }, 1000);
        }
    }
    const cars = [
        { _id: 1, lat: 8.558635, lng: 39.285559 },
        { _id: 2, lat: 8.558468, lng: 39.285959 },
    ];
    const traffics = [
        { _id: 1, lat: 8.558762, lng: 39.285221 },
        { _id: 2, lat: 8.557807, lng: 39.287571 }
    ];
    return (
        <>
            <Mapfitun filtersView assignment={{
                handleClick,
                handleAssign,
                cars,
                traffics,
                setassignment,
                assignment
            }} />
        </>
    )
}

export default Index