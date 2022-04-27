import React, { useEffect } from 'react';
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import * as operatorActionCreators from "../redux/actions/operatoractions";
import TableDisplay from '../components/display/TableDisplay';

const OperatorList = () => {

    const dispatch = useDispatch();
    const { fetch_operators } = bindActionCreators(operatorActionCreators, dispatch);
    const { operators } = useSelector(state => state.newOperator);

    useEffect(() => {
        fetch_operators();
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
            title={"Operators List"}
            columns={columns}
            rows={operators ?? []}
        />
    )
}

export default OperatorList