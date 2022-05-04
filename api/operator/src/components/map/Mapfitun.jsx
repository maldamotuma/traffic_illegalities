import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api';
import Options from './Options';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../../redux/slices/track/trackSlice';
import { handleCarClick, handleTrafficClick } from './assignmentactions';

function Mapfitun() {
    const [assignment, setassignment] = useState({ car: null, traffic: null });
    const region = useSelector(state => state.user?.region);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addTrack({cars: [1,2,3]}));
    }, [])
    const containerStyle = {
        width: '100%',
        height: `calc(100vh - ${64}px)`,
        position: 'relative',
    };

    const handleOnLoad = () => {
        
    }

    const cars = [
        { _id: 1, lat: 8.558635, lng: 39.285559 },
        { _id: 2, lat: 8.558468, lng: 39.285959 },
    ];
    const traffics = [
        { _id: 1, lat: 8.558762, lng: 39.285221 },
        { _id: 2, lat: 8.557807, lng: 39.287571 }
    ];
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
                        cars.map(car => <Marker position={car} icon={assignment.car === car._id ? "/smallcarbordered.png" : "/smallcar.png"} onClick={() => handleCarClick(assignment, setassignment, car._id) }/>)
                    }
                    {
                        traffics.map(traffic => <Marker position={traffic} icon={assignment.traffic === traffic._id ? "/trafficpolicebordered.png" : "/trafficpolice.png"} onClick={() => handleTrafficClick(assignment, setassignment, traffic._id)}/>)
                    }
                </GoogleMap>
            </LoadScript>

        </>
    )
}

export default React.memo(Mapfitun)