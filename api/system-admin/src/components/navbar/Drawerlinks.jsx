import React from 'react';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import Dropdownist from '../lists/Dropdownlist';
import Singlelist from '../lists/Singlelist';
import { Dashboard } from '@mui/icons-material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GavelIcon from '@mui/icons-material/Gavel';
import {
    Traffic,
    Speed
} from "@mui/icons-material";

const Drawerlinks = () => {
    return (
        <>
            <Singlelist Icon={Dashboard} name={"Dashboard"} address="/" />
            <Singlelist Icon={SatelliteAltIcon} name={"Active Session"} address="/active-session" />
            <Dropdownist
                title={"Operators"}
                Icon={SupportAgentIcon}
                submenus={[
                    { title: 'Add Operator', address: '/add-operator' },
                    { title: 'Operators List', address: '/operator-list' },
                ]}
            />
            <Dropdownist
                title={"Cars"}
                Icon={DirectionsCarFilledRoundedIcon}
                submenus={[
                    { title: 'Add Car', address: '/add-car' },
                    { title: 'Cars List', address: '/car-list' },
                ]}
            />
            <Dropdownist
                title={"System Admins"}
                Icon={AdminPanelSettingsIcon}
                submenus={[
                    { title: 'Add system admin', address: '/add-system-admin' },
                ]}
            />
            <Dropdownist
                title={"Traffic Polices"}
                Icon={Traffic}
                submenus={[
                    { title: 'Add Traffic Police', address: '/add-traffic-police' },
                    { title: "Traffic Police List", address: "/traffic-polices"}
                ]}
            />
            <Dropdownist
                title={"Speed"}
                Icon={Speed}
                submenus={[
                    { title: 'Add Speed Region', address: '/add-speed-region' },
                    { title: 'Speed limits list', address: '/speed-limits' },
                ]}
            />
            <Dropdownist
                title={"Traffic Office"}
                Icon={GavelIcon}
                submenus={[
                    { title: 'Add traffic office', address: '/add-traffic-office' },
                ]}
            />
        </>
    );
}

export default Drawerlinks