import { Backdrop } from '@mui/material';
import { Box } from '@mui/system';
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
import {
    CircularProgress
} from "@mui/material";

const EditOperator = () => {
    const [edit, setedit] = useState(false);
    const [loading, setloading] = useState(false);
    const [editparams, seteditparams] = useState({});
    const params = useParams();
    const dispatch = useDispatch();
    const { get_operator, edit_operator, delete_id_photos, upload_id_photos } = bindActionCreators(operatorActionCreators, dispatch);
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

    const persist_change = () => {
        const phts = document.getElementById("idphotos");
        console.log(phts);
        // setloading(true);
        // edit_operator(editparams, operator._id, setloading);
    }

    const region = operator?.region;
    const pp = "/profile/operator/" + operator?.profilePicture;

    return (
        <div>
            {
                loading ?
                    <Backdrop in={true} sx={{
                        zIndex: 1,
                        color: "#fff"
                    }}>
                        <Box
                            component={"img"}
                            src={`${process.env.REACT_APP_SERVER}/loading.gif`}
                            alt={"Loading..."}
                            maxWidth={"100px"}
                        />
                        {/* <CircularProgress color={"inherit"} /> */}
                    </Backdrop>
                    :
                    <></>
            }
            <MainDIsplay edit={edit} setedit={setedit} persist_change={persist_change}>
                <LeftContent labelData={toObject()} pp={pp} edit={edit} headerText={operator?.name?.first + " " + operator?.name?.last} seteditparams={seteditparams} />
                <RightContent
                    idInfo={toObjectID()}
                    region={region}
                    IDPhotos={operator?.identificationCard?.photos}
                    PIC_PATH={"IDs/operator"}
                    edit={edit}
                    seteditparams={seteditparams}
                    delete_id_photos={delete_id_photos}
                    user={operator}
                    upload_id_photos={upload_id_photos}
                />
            </MainDIsplay>
        </div>
    )
}

export default EditOperator