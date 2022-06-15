import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Circle, Marker, InfoWindow } from '@react-google-maps/api';
import Options from './Options';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../../redux/slices/track/trackSlice';
import { handleCarClick, handleTrafficClick } from './assignmentactions';
import { bindActionCreators } from 'redux';
import * as userttrafficactionbinders from '../../redux/slices/assignment/usertrafficslicer';
import { Paper, Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { assignmentsSocket } from '../../screens/Activesession';

function Mapfitun() {
    const [assignment, setassignment] = useState({ car: null, traffic: null });
    const [map_option, setmap_option] = useState({
        traffic_police: false
    });
    const region = useSelector(state => state.user?.region);
    const { cars, traffics } = useSelector(state => state.track);
    const carSocket = useSelector(state => state.socket?.car);
    const user_customer = useSelector(state => state.assignment?.user);
    const dispatch = useDispatch();
    const { join_user_traffic } = bindActionCreators(userttrafficactionbinders, dispatch);

    // useEffect(() => {
    //     dispatch(addTrack({cars: [1,2,3]}));
    // }, [])
    const containerStyle = {
        width: '100%',
        height: `calc(100vh - ${64}px)`,
        position: 'relative',
    };

    const handleOnLoad = () => {

    }

    const handleAssignment = (traffic) => {
        carSocket.emit("car_assignment", `tr_${traffic}`, `ca_${assignment.car}`);
        assignmentsSocket.emit("car_assignment", `tr_${traffic}`, `ca_${assignment.car}`);
    }

    return (
        <>
            <LoadScript
                libraries={["drawing"]}
                googleMapsApiKey="AIzaSyBDuRouCPdddT5wPiPeXQ2W58uzpJm7yFg"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={region.coordinates}
                    zoom={15}
                    // onZoomChanged={() => console.log(mapref.getZoom())}
                    options={{ mapTypeId: 'hybrid' }}
                    tilt={45}
                    onLoad={handleOnLoad}
                >
                    <div style={{
                        position: 'absolute',
                    }}>
                        <Options setmap_option={setmap_option}/>
                    </div>
                    {
                        region &&
                        <Circle
                            center={region.coordinates}
                            radius={parseInt(region.radius) * 50}
                            options={{
                                fillColor: "#007fff",
                                strokeOpacity: 0
                            }}
                        />
                    }
                    {
                        cars.map(car => <Marker
                            key={"car" + car._id}
                            position={car}
                            icon={{
                                url: assignment.car === car._id ? "/smallcarbordered.png" : "/smallcar.png",
                                anchor: { x: 10, y: 10 },
                                // scaledSize: new window.google?.maps?.Size(20, 20),
                            }}
                            onClick={() => handleCarClick(assignment, setassignment, car._id)}
                        />)
                    }
                    {
                        // traffics.map(traffic => <Marker key={"traffic" + traffic.sid} position={traffic} icon={assignment.traffic === traffic._id ? "/trafficpolicebordered.png" : "/trafficpolice.png"} onClick={() => handleTrafficClick(assignment, setassignment, traffic._id, handleAssignment, join_user_traffic, user_customer)} />)
                        map_option.traffic_police === true && traffics.map(traffic =>
                            <InfoWindow
                                // onCloseClick={e => {return false}}
                                key={"traffic" + traffic.sid} position={traffic} icon={assignment.traffic === traffic._id ? "/trafficpolicebordered.png" : "/trafficpolice.png"} onClick={() => handleTrafficClick(assignment, setassignment, traffic._id, handleAssignment, join_user_traffic, user_customer)} >
                                <Paper
                                    sx={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => handleTrafficClick(assignment, setassignment, traffic._id, handleAssignment, join_user_traffic, user_customer)}
                                >
                                    <Stack
                                        direction={"row"}
                                        alignItems={"center"}
                                        sx={{
                                            transition: "0.3s all ease",
                                            mb: .5
                                        }}
                                    >
                                        <Box
                                            component={"img"}
                                            src={"/trafficpolice.png"}
                                            m={"auto"}
                                            width={"40px"}
                                        ></Box>
                                        <CheckCircle
                                            sx={{
                                                color: "primary.light",
                                                width: 30,
                                                height: 30,
                                                width: assignment.traffic === traffic._id ? 30 : 0,
                                                transition: "0.2s all ease"
                                            }}
                                        />
                                    </Stack>
                                    <Typography color={"primary.dark"} fontSize={12}><span style={{ fontWeight: "bold" }}>Cars :</span> {traffic.cars}</Typography>
                                    <Typography color={"primary.dark"} fontSize={12}><span style={{ fontWeight: "bold" }}>Customers :</span> {traffic.customers}</Typography>
                                </Paper>
                            </InfoWindow>
                        )
                    }
                </GoogleMap>
            </LoadScript>

        </>
    )
}

export default React.memo(Mapfitun)