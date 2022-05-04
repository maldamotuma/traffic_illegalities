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

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

export default function Options() {
    const [formats, setFormats] = React.useState(() => ['italic']);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };


    return (
        <div style={{
            marginTop: '10%',
            marginLeft: '10%',
            width: '100%',
            display: 'flex',
            gap: '100px'
        }}>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                }}
            >
                {/* <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} /> */}
                <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                >
                    <ToggleButton value="sss" aria-label="right aligned">
                        <BorderAllIcon />
                    </ToggleButton>
                    <ToggleButton value="left" aria-label="left aligned">
                        <TrafficIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <DirectionsCarIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <PersonIcon />
                    </ToggleButton>
                    <ToggleButton value="ss" aria-label="right aligned">
                        <BusinessIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                }}
            >
                {/* <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} /> */}
                <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                >
                    <ToggleButton value="sssss" aria-label="right aligned">
                        <AddRoadIcon />
                    </ToggleButton>
                    <ToggleButton value="lessft" aria-label="left aligned">
                        <SatelliteAltIcon />
                    </ToggleButton>
                    <ToggleButton value="cesnter" aria-label="centered">
                        <TerrainIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                }}
            >
                <ToggleButton value="cesnter" aria-label="centjered">
                    <MyLocationIcon />
                </ToggleButton>
            </Paper>
        </div>
    );
}
