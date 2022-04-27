import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableDisplay from '../components/display/TableDisplay';
import * as reafficPolicesActionCreators from "../redux/actions/trafficpoliceactions";

function TrafficPoliceList() {
    const dispatch = useDispatch();
    const { fetch_trafficpolices } = bindActionCreators(reafficPolicesActionCreators, dispatch);
    const { trafficPolices } = useSelector(state => state.newTrafficPolice);

    useEffect(() => {
        fetch_trafficpolices();
    }, [])
    const columns = [
        { id: 'full_name', label: 'Name', minWidth: 170 },
        { id: 'username', label: 'Type', minWidth: 100 },
        {
            id: 'email',
            label: 'plate',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'phoneNumber',
            label: 'Community',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
    ];
    return (
        <TableDisplay
            title={"Traffic Polices List"}
            columns={columns}
            rows={trafficPolices ?? []}
        />
    )
}

export default TrafficPoliceList