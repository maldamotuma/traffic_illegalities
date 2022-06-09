import { FIXEDNOTIFICATION, TRACKCAR } from "../ActionTypes";
import location_search_Socket from "../sckets/location_search";

export const track_car = carInfo => dispatch => {
    dispatch({
        type: TRACKCAR,
        payload: carInfo
    });
}

export const get_actor_on_map = (actor, identifier, setloading) => (dispatch, getState) => {
    setloading(true);
    location_search_Socket.emit(actor, identifier, getState().user._id);
    setTimeout(() => {
        dispatch({
            type: FIXEDNOTIFICATION,
            payload: { type: "warning", message: actor + " Not Found", open: true }
        });
        setloading(false);
    }, 700);
}