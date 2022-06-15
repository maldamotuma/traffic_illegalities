import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Mapfitun from '../components/map/Mapfitun'
import { setCarSocket } from '../redux/slices/socket/socket';
import { addTrack, count_assignment } from '../redux/slices/track/trackSlice';
import user_traffic_socket from '../redux/socketfile';

export const carSocket = io(process.env.REACT_APP_SERVER + "/car");
export const assignmentsSocket = io(process.env.REACT_APP_SERVER + "/assignments");


const Activesession = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(setCarSocket(carSocket));
    user_traffic_socket.emit("operator_join", "operator");
    carSocket.emit("join", user._id);
    user_traffic_socket.on("traffic_update", traffic_polices => {
      console.log("traffic polices : ", traffic_polices);
      dispatch(addTrack({
        traffics: traffic_polices
      }));
    });
    carSocket.on("track_car", (car_track) => {
      dispatch(addTrack({
        cars: car_track
      }));
    });
    carSocket.on("ass_cars", (trfc) => {
      // dispatch(count_assignment(trfc));
    });
    // dispatch(addTrack({cars: [1,2,3]}));

    assignmentsSocket.emit("operator_join", "operator");
  }, [user])

  return (
    <Mapfitun />
  )
}

export default Activesession