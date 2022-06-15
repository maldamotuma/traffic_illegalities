import React, { useCallback, useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Circle, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import Options from './Options';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../../redux/slices/track/trackSlice';
import { handleCarClick, handleTrafficClick } from './assignmentactions';

function Mapfitun({ region }) {
    const [animation, setanimation] = useState("");


    const containerStyle = {
        width: '100%',
        height: `400px`,
        position: 'relative',
    };

    const options = {
        strokeColor: '#0099ff',
        strokeOpacity: 1,
        strokeWeight: 5,
        fillColor: '#0099ff',
        fillOpacity: 1,
        zIndex: 1
    };

    const divStyle = {
        background: `white`,
        border: `1px solid #ccc`,
        padding: 5
    }


    return (
        <>
            <LoadScript
                libraries={["drawing"]}
                googleMapsApiKey="AIzaSyBDuRouCPdddT5wPiPeXQ2W58uzpJm7yFg"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={region[0]}
                    zoom={15}
                    // onZoomChanged={() => console.log(mapref.getZoom())}
                    options={{ mapTypeId: 'hybrid' }}
                    tilt={45}
                >
                    {
                        region?.map(rgn => (
                            <>
                            <Marker
                                position={rgn}
                                animation={animation}
                                label={{
                                    text: "Hello Malda Motuma Hirpassa",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                }}
                            />
                            <InfoWindow
                                onLoad={() => setanimation(window.google.maps.Animation.BOUNCE)}
                                position={rgn}
                                animation={animation}
                            >
                                <div style={divStyle}>
                                    <h1>InfoWindow</h1>
                                </div>
                            </InfoWindow>
                            </>
                        ))
                    }
                    <Polyline
                        path={region}
                        options={options}
                    />
                </GoogleMap>
            </LoadScript>

        </>
    )
}

export default React.memo(Mapfitun)