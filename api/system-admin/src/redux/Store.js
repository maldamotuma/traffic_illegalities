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

const initialState = {
    user: -1,
};
const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        user: UseraccountReducers,
        helper: helperReducer,
        newOperator: OperatorReducers,
        socket: SocketReducer,
        conversations: message_reducer,
        track: track_reducer,
        newTrafficPolice: trafficpolice_reducer,
        speed: speed_reducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;