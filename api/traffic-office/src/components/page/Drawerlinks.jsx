import React from 'react';
import {
    TravelExploreRounded
} from '@mui/icons-material';
// import Dropdownlist from '../lists/Dropdownlist';
// import Singlelist from '../lists/Singlelist';
import { Dashboard } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
    Traffic,
    Speed
} from "@mui/icons-material";
import Singlelist from './Singlelist';
import Dropdownlist from './Dropdownlist';

const Drawerlinks = () => {
    return (
        <>
            <Singlelist Icon={TravelExploreRounded} name={"Search Driver"} address="/search" />
            <Dropdownlist
                title={"Operators"}
                Icon={SupportAgentIcon}
                submenus={[
                    { title: 'Add Operator', address: '/add-operator' },
                    { title: 'Operators List', address: '/operator-list' },
                ]}
            />
        </>
    );
}

export default Drawerlinks;