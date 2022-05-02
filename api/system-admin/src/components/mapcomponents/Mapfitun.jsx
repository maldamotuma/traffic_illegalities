import React, { useState, useEffect, useRef } from 'react'
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import { GoogleMap, LoadScript, Marker, DrawingManager, Polygon, Circle, InfoBox } from '@react-google-maps/api';
import OnmapOptions from './OnmapOptions';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as operatorActionBinders from '../../redux/actions/operatoractions';
import * as speedActionCreators from "../../redux/actions/speedactions";

const center = { lat: 8.564339, lng: 39.289629 };

function Mapfitun({ filtersView, track, setregion, region, polygon, speedlimits, assignment }) {
  const [bounds, setBounds] = useState(null);

  const mapref = useRef();
  const dispatch = useDispatch();
  const { add_operator } = bindActionCreators(operatorActionBinders, dispatch);
  const operatorRegion = useSelector(state => state.newOperator.region);
  const carLocation = useSelector(state => state.track.car);

  const { add_new_speed_coordinates } = bindActionCreators(speedActionCreators, dispatch);
  const speedCoordinates = useSelector(state => state.speed.newSpeed.coordinates);

  const boundsTest = [
    {
      lat: 8.564393,
      lng: 39.289199
    },
    {
      lat: 8.564441,
      lng: 39.289666
    },
    {
      lat: 8.564181,
      lng: 39.289685
    },
    {
      lat: 8.564136,
      lng: 39.289245
    }
  ]
  const containerStyle = {
    width: '100%',
    height: filtersView ? `calc(100vh - ${64}px)` : '500px',
    position: 'relative',
  };

  const onLoad = drawingManager => {
    console.log(drawingManager)
  }

  const onPolygonComplete = polygon => {
    console.log('here is the polygon information : ', toJSON(polygon))
    // localStorage.setItem("rec", JSON.stringify(polygon));
  }

  const onRectangleComplete = rectangle => {
    add_operator({ region: rectangle });
  }

  const handleMapClick = e => {
    polygon ?
      add_new_speed_coordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() })
      :
      setregion(prev => {
        return { ...prev, coordinates: { lat: e.latLng.lat(), lng: e.latLng.lng() } };
      });
  }


  return (
    <>
      <LoadScript
        libraries={["drawing"]}
        googleMapsApiKey="AIzaSyBSzJu3Sc0vMvpjUe83sBEqpG7PzdLh1sI"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          ref={mapref}
          center={center}
          zoom={15}
          // onZoomChanged={() => console.log(mapref.getZoom())}
          options={{ mapTypeId: 'hybrid' }}
          tilt={45}
          clickableIcons={true}
          onClick={handleMapClick}
        >
          { /* Child components, such as markers, info windows, etc. */}
          {/* <Marker position={{lat: 8.564339, lng: 39.289629}}/> */}
          {
            track ? <Marker position={{ lat: parseFloat(carLocation.lat), lng: parseFloat(carLocation.long) }} icon={"/smallcar.png"} /> : <></>
          }
          <div style={{
            position: 'absolute',
          }}>
            {filtersView && <OnmapOptions />}
          </div>
          <DrawingManager
            onLoad={onLoad}
            onPolygonComplete={onPolygonComplete}
            onRectangleComplete={onRectangleComplete}
          />
          {
            region &&
            <Circle
              center={{
                ...region.coordinates
              }}
              radius={region.radius * 50}
              options={{
                fillColor: "#007fff",
                fillOpacity: .5,
                visible: region.show,
                strokeColor: "#007fff",
                strokeWeight: 1
              }}
            />
          }
          {
            polygon &&
            <Polygon
              paths={speedCoordinates}
              options={{
                fillColor: "#007fff",
                fillOpacity: .5,
                visible: polygon.show,
                strokeColor: "#007fff",
                strokeWeight: 1
              }}
            />
          }
          {
            speedlimits &&
            speedlimits.map(limit => (
              <Polygon
                paths={limit.region}
                options={{
                  fillColor: "#007fff",
                  fillOpacity: .5,
                  visible: true,
                  strokeColor: "#007fff",
                  strokeWeight: 1
                }}
              />
            ))
          }
          {
            assignment &&
            <>
              {
                assignment.cars.map(car => <Marker
                  position={{ lat: car.lat, lng: car.lng }}
                  icon={assignment.assignment.car === car._id ? "/smallcarbordered.png" : "/smallcar.png"}
                  onClick={() => assignment.handleClick(car._id)} />)
              }
              {
                assignment.traffics.map(traffic => <Marker
                  position={{ lat: traffic.lat, lng: traffic.lng }} icon={assignment.assignment.traffic === traffic._id ? "/trafficpolicebordered.png" : "/trafficpolice.png"}
                  onClick={() => assignment.handleAssign(traffic._id)}>
                  <InfoBox
                    // onLoad={onLoad}
                    // options={options}
                    position={traffic}
                  >
                    <div style={{ backgroundColor: '#0099ff', color: "#fff",  padding: 5 }}>
                      <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                        waiting: 5 <br />
                        holding: 2
                      </div>
                    </div>
                  </InfoBox>
                </Marker>)
              }
            </>
          }
        </GoogleMap>
      </LoadScript>

    </>
  )
}

export default React.memo(Mapfitun)