import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Mapfitun from '../components/map/Mapfitun'
import { setCarSocket } from '../redux/slices/socket/socket';
import { addTrack } from '../redux/slices/track/trackSlice';

const carSocket = io("http://localhost:5000/car");

const Activesession = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(setCarSocket(carSocket));
    carSocket.emit("join", user._id );
    carSocket.on("track_car", (car_track) => {
      dispatch(addTrack({
        cars: car_track
      }));
    })
    // dispatch(addTrack({cars: [1,2,3]}));
  }, [])
  
  return (
    <Mapfitun />
  )
}

export default Activesession