import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import OnmapOptions from './OnmapOptions';

const center = {lat: 8.564339, lng: 39.289629};

function Mapfitun({filtersView}) {
  const containerStyle = {
    width: '100%',
    height: filtersView ? `calc(100vh - ${64}px)` : '500px',
    position: 'relative',
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBSzJu3Sc0vMvpjUe83sBEqpG7PzdLh1sI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{mapTypeId: 'hybrid'}}
        tilt={45}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{lat: 8.564339, lng: 39.289629}}/>
        <div style={{
          position: 'absolute',
        }}>
          {filtersView && <OnmapOptions />}
        </div>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Mapfitun)