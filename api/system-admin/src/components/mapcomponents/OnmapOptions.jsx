import * as React from 'react';
import { styled } from '@mui/material/styles';
import TrafficIcon from '@mui/icons-material/Traffic';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import TerrainIcon from '@mui/icons-material/Terrain';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Inputform from './Inputform';


export default function CustomizedDividers() {

    return (
        <div style={{
            marginTop: '10%',
            marginLeft: '10%',
            width: '100%',
            display: 'flex',
            gap: '100px'
        }}>
            <Inputform />
        </div>
    );
}
