import * as React from 'react';
import { Typography, Box, Stack, IconButton, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Addidscomponent from '../AddIdscomponent';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { bindActionCreators } from 'redux';
import * as operationActionBinders from "../../redux/actions/Operationactions";

export default function Idcards(props) {
  const {sbmtBtn, setpass} = props;
  const personId = useSelector(state => state.newOperator.newOperator.identificationCard);
  const IDphotos = useSelector(state => state.newOperator.newOperator);
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const { notify } = bindActionCreators(operationActionBinders, dispatch);

  React.useEffect(() => {
    sbmtBtn(btnRef);
  }, []);
  const handleClick = () => {
    if(personId?.id_name && personId?.id_number && personId?.issuedDate && personId?.expiryDate && IDphotos){
      setpass(true);
    }else {
      dispatch(notify({
        type: "warning",
        msg: "Please fill all ID Informations"
      }));
    }
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Identification cards
      </Typography>
      {
        personId &&
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{my: 1}}>
          <Box>
            <Typography fontWeight={"bold"} color={"#353535"}>
              {personId?.id_number}
            </Typography>
            <Typography variant={"subtitle2"} color={"#505050"}>
              {personId?.id_name}
            </Typography>
          </Box>
          <IconButton color={"secondary"}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      }
      
      <Grid container spacing={3}>
        <Grid item>
          <Addidscomponent />
        </Grid>
      </Grid>
      <Button hidden ref={btnRef} onClick={handleClick}></Button>
    </React.Fragment>
  );
}