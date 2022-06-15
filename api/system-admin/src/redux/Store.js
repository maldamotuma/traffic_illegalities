import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { UseraccountReducers } from './reducers/UseraccountReducers';
import { helperReducer } from './reducers/helperReducer'
import { OperatorReducers } from './reducers/operatorReducers';
import { SocketReducer } from './reducers/socketReducer';
import { message_reducer } from './reducers/messageReducers';
import { track_reducer } from './reducers/trackreducer';
import { trafficpolice_reducer } from './reducers/trafficpolicereducer';
import { speed_reducer } from './reducers/speedreducer';
import { carReducer } from "./reducers/carReducer";
import { crash_reducer } from './reducers/crashreducer';
import { systemadmin_reducer } from './reducers/systemadminreducer';
import { traffic_office_reducer } from './reducers/trafficofficereducer';
import { rules_reducer } from './reducers/rulesreducer';
import { search_location_reducer } from './reducers/searchlocation_reducer';

const initialState = {
    user: -1,
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        user: UseraccountReducers,
        helper: helperReducer,
        newOperator: OperatorReducers,
        socket: SocketReducer,
        conversations: message_reducer,
        track: track_reducer,
        newTrafficPolice: trafficpolice_reducer,
        speed: speed_reducer,
        newCar: carReducer,
        crashes: crash_reducer,
        system_admin: systemadmin_reducer,
        traffic_office: traffic_office_reducer,
        rules: rules_reducer,
        search_location: search_location_reducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;