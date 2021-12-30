import React from 'react';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import Dropdownist from '../lists/Dropdownlist';
import Singlelist from '../lists/Singlelist';
import { Dashboard } from '@mui/icons-material';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const Drawerlinks = () => {
    return (
        <>
            <Singlelist Icon={Dashboard} name={"Dashboard"} address="/"/>
            <Singlelist Icon={SatelliteAltIcon} name={"Active Session"} address="/active-session"/>
            <Dropdownist />
            <Dropdownist />
        </>
    );
}

export default Drawerlinks