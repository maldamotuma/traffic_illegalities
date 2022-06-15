import React, { useEffect } from 'react';
import RoutingComponent from './components/Routes';
import Generalnotification from './components/Generalnotification';
import { connect, useSelector, useDispatch } from 'react-redux';
import "./custom.css"
import location_search_Socket from './redux/sckets/location_search';
import { setLocation } from './redux/actions/searched_locations_actions';

function App() {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user !== -1) {
      location_search_Socket.emit("sa_join", user._id);
      location_search_Socket.on("location_response", async (location_res) => {
        console.log(location_res);
        dispatch(setLocation(location_res));
      });
    }
  }, [user]);

  return (
    <div className="">
      <Generalnotification />
      <RoutingComponent />
    </div>
  );
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
