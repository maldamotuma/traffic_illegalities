import axios from "../caxios";

export const register_car = car => dispatch => {
    axios.post("/add-car", car).then(res => {
        if (res.data.success === 1) {
            alert("successfull!!");
        }else {
            alert("something went wrong!!");
        }
    });
}