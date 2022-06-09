import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';
import Options from './Options';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../../redux/slices/track/trackSlice';
import { handleCarClick, handleTrafficClick } from './assignmentactions';
import { bindActionCreators } from 'redux';
import * as userttrafficactionbinders from '../../redux/slices/assignment/usertrafficslicer';

function Mapfitun() {
    const [assignment, setassignment] = useState({ car: null, traffic: null });
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
        carSocket.emit("car_assignment", `tr_${traffic}`, `ca_${assignment.car}`)
    }

    return (
        <>
            <LoadScript
                libraries={["drawing"]}
                googleMapsApiKey="AIzaSyBSzJu3Sc0vMvpjUe83sBEqpG7PzdLh1sI"
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
                        <Options />
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
                        traffics.map(traffic => <Marker position={traffic} icon={assignment.traffic === traffic._id ? "/trafficpolicebordered.png" : "/trafficpolice.png"} onClick={() => handleTrafficClick(assignment, setassignment, traffic._id, handleAssignment, join_user_traffic, user_customer)} />)
                    }
                </GoogleMap>
            </LoadScript>

        </>
    )
}

export default React.memo(Mapfitun)