import React, { useEffect, useRef } from 'react';
import {
    Box,
    TextField,
    FormControlLabel,
    Switch,
    Stack,
    Slider,
    Chip
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as speedActionCreators from "../../redux/actions/speedactions";
import { Polygon } from '@react-google-maps/api';

const DetailForm = ({show, setshow}) => {
    const dispatch = useDispatch();
    const { add_new_speed, reduceCoordinate } = bindActionCreators(speedActionCreators, dispatch);
    const { newSpeed } = useSelector(state => state.speed);

    const coorRef = useRef();
    useEffect(() => {
        coorRef.current.scrollTop = coorRef.current.scrollHeight;
    }, [newSpeed.coordinates]);

    const handleCoordinateDelete = coordinate => {
        reduceCoordinate(coordinate);
    }
    const generateString = coordinates => {
        let chipCoordinates = [];
        for (const key in coordinates) {
            chipCoordinates.push(<Chip sx={{ my: .5 }} label={coordinates[key].lat + " , " + coordinates[key].lng} onDelete={() => handleCoordinateDelete(coordinates[key])}/>);
        }

        return chipCoordinates;
    }
    return (
        <Box sx={{ boxShadow: 3, width: "400px", p: 2, borderRadius: 2 }}>
            <TextField
                label={"Region Specific Information"}
                variant={"outlined"}
                size={"small"}
                sx={{ my: 1 }}
                fullWidth
                multiline
                rows={3}
                onChange={e => add_new_speed({ regionInfo: e.target.value })}
            />
            <Slider defaultValue={30} valueLabelDisplay={"auto"} min={30} max={120} onChange={e => add_new_speed({ speedLimit: e.target.value })} />
            <Stack direction={"row"} alignItems={"center"} gap={1} sx={{ mt: 1 }}>
                <Box sx={{ bgcolor: "#A8CBEE", p: 1, borderRadius: 1 }}>{newSpeed?.speedLimit ?? 30}Km/Hr</Box>
                <FormControlLabel
                    control={<Switch checked={show} onChange={e => setshow(e.target.checked)}/>}
                    label={"show on Map"} />
            </Stack>

            <Box
                ref={coorRef}
                sx={{
                    bgcolor: "#dbedff",
                    p: 1,
                    borderRadius: 1,
                    mt: 3,
                    maxHeight: "250px",
                    overflow: "auto",
                    scrollBehavior: "smooth"
                }}>
                {
                    generateString(newSpeed.coordinates)
                }
            </Box>
        </Box>
    )
}

export default DetailForm