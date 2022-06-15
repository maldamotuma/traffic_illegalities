import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
    Stack,
    Typography,
    Box
} from "@mui/material";
import axios from "../../redux/caxios";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as carActionCreators from "../../redux/actions/carActions";
import OwnerComponent from "./OwnerComponent";

export default function CarOwner(props) {
    const { setvinfo, errors } = props;
    const [users, setusers] = React.useState([]);

    const dispatch = useDispatch();
    const { add_car_info } = bindActionCreators(carActionCreators, dispatch);
    const carInfo = useSelector(state => state.newCar?.newCar?.owner);
    const ref = React.useRef();
    const rules = {
        owner: /^[A-Za-z_/0-9]{3,}$/
    }
    const messages = {
        owner: "Please Provide the car owner"
    }

    React.useEffect(() => {
        setvinfo({rules, messages, ref});
    }, []);


    const findOwner = async e => {
        const owner_id = e.target.value;
        const res = await axios.get(`/user-owner?id=${owner_id}`);
        if (res.data.success) {
            setusers(res.data.users);
        }
    }
    return (
        <>
            {
                carInfo && <OwnerComponent />
            }
            <Box
                component="form"
                ref={ref}
            >
                <Autocomplete
                    // disablePortal
                    id="combo-box-demo"
                    options={users}
                    sx={{ mb: 4, mt: carInfo ? 4 : 0 }}
                    getOptionLabel={option => option.identificationCards.id_number}
                    autoComplete
                    onChange={(e, v) => {
                        v &&
                            add_car_info({
                                owner: {
                                    name: v.name.first + " " + v.name.last,
                                    id_name: v.identificationCards.id_name,
                                    id_number: v.identificationCards.id_number,
                                    _id: v._id
                                }
                            });
                    }}
                    renderOption={(props, user) => <>
                        <Stack direction={"row"} alignItems={"center"} gap={2} {...props}>
                            <img src="https://picsum.photos/80/90" alt="" style={{ borderRadius: '5px' }} />
                            <Stack>
                                <Typography fontWeight={900}>{`${user.name.first} ${user.name.last}`}</Typography>
                                <Typography variant={"subtitle1"}>{user.identificationCards.id_name}</Typography>
                                <Typography variant={"caption"}>{user.identificationCards.id_number}</Typography>
                            </Stack>
                        </Stack>
                    </>}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Car Owner ID Number"
                        variant="standard"
                        onChange={findOwner}
                        name={"owner"}
                        error={errors?.owner}
                        helperText={errors?.owner ? messages.owner : ""}
                    />}
                />
            </Box>
        </>
    );
}

