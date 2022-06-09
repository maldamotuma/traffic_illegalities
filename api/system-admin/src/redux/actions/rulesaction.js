import { FETCHRULES } from "../ActionTypes";
import axios from "../caxios";
import { login_form } from "../helpers";

export const add_new_rule = rule_info => async dispatch => {
    rule_info.loading(true);
    const res = await axios.post("/add-rule", rule_info.form);
    setTimeout(() => {
        rule_info.alert(true);
        rule_info.loading(false);
        rule_info.ref.current.reset();
        rule_info.elmnts([]);
    }, 2000);
}


export const fetch_rules = () => async dispatch => {
    try {
        const res = await axios.get("/fetch-rules");
        if (res.data.success === 1) {
            dispatch({
                type: FETCHRULES,
                payload: res.data.rules
            });
        } else if (res.data.success === -1) {
            login_form(dispatch);
        }
    } catch (error) {
        console.log(error);
    }
}

export const delete_rule = rids => async dispatch => {
    const res = await axios.post("/delete-rules", rids);
}