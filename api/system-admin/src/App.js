import React from 'react';
import RoutingComponent from './components/Routes';
import Generalnotification from './components/Generalnotification';
import { connect } from 'react-redux';

function App() {
  return (
    <div className="">
    <Generalnotification />
      <RoutingComponent />
    </div>
  );
}

const mapStateToProps = (state) => ({
    notification: state.helper.fixedNotification
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)
