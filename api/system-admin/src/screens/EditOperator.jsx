import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    useParams
} from "react-router-dom";
import { bindActionCreators } from 'redux';
import LeftContent from '../components/singleDisplay/LeftContent';
import MainDIsplay from '../components/singleDisplay/MainDIsplay';
import RightContent from '../components/singleDisplay/RightContent';
import * as operatorActionCreators from "../redux/actions/operatoractions";

const EditOperator = () => {
    const [edit, setedit] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const { get_operator } = bindActionCreators(operatorActionCreators, dispatch);
    const { operator } = useSelector(state => state.newOperator);

    const toObject = () => {
        const tmpoperator = [
            { label: "First Name", value: operator?.name.first },
            { label: "Last Name", value: operator?.name.last },
            { label: "Email", value: operator?.email },
            { label: "Phone Number", value: operator?.phoneNumber },
            { label: "Username", value: operator?.username },
        ]
        return tmpoperator;
    }

    const toObjectID = () => {
        const identificationCard = operator?.identificationCard;
        const tmpoperator = [
            { label: "Issued By", value: identificationCard?.id_name },
            { label: "ID Number", value: identificationCard?.id_number },
            { label: "Issued Date", value: identificationCard?.issuedDate },
            { label: "Expiry Date", value: identificationCard?.expiryDate },
        ]
        return tmpoperator;
    }

    useEffect(() => {
        get_operator(params.id);
    }, []);

    const region = operator?.region;
    const pp = "/profile/operator/" + operator?.profilePicture;

    return (
        <div>
            <MainDIsplay edit={edit} setedit={setedit}>
                <LeftContent labelData={toObject()} pp={pp} edit={edit} headerText={operator?.name?.first+" "+operator?.name?.last}/>
                <RightContent
                    idInfo={toObjectID()}
                    region={region}
                    IDPhotos={operator?.identificationCard?.photos}
                    PIC_PATH={"IDs/operator"}
                    edit={edit}
                />
            </MainDIsplay>
        </div>
    )
}

export default EditOperator