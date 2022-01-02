import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { UseraccountReducers } from './reducers/UseraccountReducers';
import { helperReducer } from './reducers/helperReducer'

const initialState = {
    user: -1,
};
const composeEnhancer =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        user: UseraccountReducers,
        helper: helperReducer
    }),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;