import React from 'react';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import Dropdownist from '../lists/Dropdownlist';
import Singlelist from '../lists/Singlelist';
import { Dashboard } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Drawerlinks = () => {
    return (
        <>
            <Singlelist Icon={Dashboard} name={"Dashboard"} address="/" />
            <Singlelist Icon={SatelliteAltIcon} name={"Active Session"} address="/active-session" />
            <Dropdownist
                title={"Operators"}
                Icon={AssignmentIndIcon}
                submenus={[
                    { title: 'Add Operator', address: '/add-operator' },
                    { title: 'Edit Operator', address: '/edit-operator' }
                ]}
            />
            <Dropdownist
                title={"System Admins"}
                Icon={AssignmentIndIcon}
                submenus={[
                    { title: 'Add system admin', address: '/add-system-admin' },
                    { title: 'Edit system admin', address: '/edit-system-admin' }
                ]}
            />
        </>
    );
}

export default Drawerlinks