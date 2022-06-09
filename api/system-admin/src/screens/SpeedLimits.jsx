import { Button, ButtonGroup, IconButton, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Mapfitun from '../components/mapcomponents/Mapfitun';
import * as speedActionCreators from '../redux/actions/speedactions';
import SingleInfoLabel from "../components/singleDisplay/SingleInfoLabel";
import {
    Close,
    Delete,
    Edit,
    Save
} from "@mui/icons-material";
import Confirmationdialogue from "../components/singleDisplay/Confirmationdialogue";

const SpeedLimits = () => {
    const [edit, setedit] = useState(false);
    const [delete_road, setdelete_road] = useState({open: false});
    const [roadinfo, setroadinfo] = useState(null);
    const dispatch = useDispatch();
    const { fetch_speed_limits } = bindActionCreators(speedActionCreators, dispatch);
    const speedlimits = useSelector(state => state.speed.speedlimits);
    useEffect(() => {
        fetch_speed_limits();
    }, []);

    useEffect(() => {
        console.log(roadinfo);
    }, [roadinfo]);

    const handleToggleEdit = () => {
        setedit(!edit);
    }

    const handleClick = () => {
        setroadinfo(null);
    }

    return (
        <Stack
            direction={"row"}
            gap={3}
            alignItems={"start"}
        >
            <Confirmationdialogue
                open={delete_road}
                setopen={setdelete_road}
            />
            <Mapfitun speedlimits={speedlimits} full_height={setroadinfo} />
            {/* { */}
            {/* // roadinfo && */}
            <Paper sx={{
                width: roadinfo ? "400px" : 0,
                px: roadinfo ? 2.5 : 0,
                opacity: roadinfo ? 1 : 0,
                py: 2,
                borderRadius: 3,
                transition: ".1s all ease-in-out",
                overflow: "hidden"
            }}>
                <Stack
                    direction={"row"}
                    justifyContent={'space-between'}
                    sx={{
                        mb: 3
                    }}
                >
                    {
                        roadinfo &&
                        <Stack
                        direction={"row"}
                        gap={2}
                        >
                            <Button variant={"contained"} startIcon={edit ? <Edit /> : <Save />} size={"small"} onClick={handleToggleEdit}>
                                {
                                    !edit ? "Edit" : "Save"
                                }
                            </Button>
                            <Button variant={"outlined"} startIcon={<Delete />} color={"error"} size={"small"} onClick={() => setdelete_road({open: true})}>
                                Delete
                            </Button>
                        </Stack>
                    }
                    <IconButton
                        color={"secondary"}
                        onClick={handleClick}
                    >
                        <Close />
                    </IconButton>
                </Stack>
                {
                    roadinfo &&
                    <>
                        <SingleInfoLabel
                            edit={edit}
                            data={{
                                label: "Speed Limit",
                                value: roadinfo.speedLimit + " Km/hr"
                            }} />
                        <SingleInfoLabel
                            edit={edit}
                            data={{
                                label: "Region Info",
                                value: roadinfo.regionInfo
                            }} />
                        <SingleInfoLabel
                            data={{
                                label: "Drafted by",
                                value: roadinfo.assignedBy?.name?.first + " " + roadinfo.assignedBy?.name?.last
                            }} />
                    </>
                }
            </Paper>
            {/* } */}
        </Stack>
    )
}

export default SpeedLimits