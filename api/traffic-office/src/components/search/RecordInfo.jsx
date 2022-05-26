import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoLabel from "./InfoLabel";
import {
  Box,
  Button,
  Grid,
  TextField,
  IconButton,
  Chip,
  Stack
} from "@mui/material";
import {
  Add,
  AddTask,
  Announcement,
  AnnouncementRounded,
  Crop,
  Delete,
  DoNotDisturbOff,
  PlusOne
} from "@mui/icons-material";
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import AccordionInfo from "./AccordionInfo";
import Mapfitun from "../map/Mapfitun";
import { recordArrest } from '../../redux/slices/driver/driverapi';
import LoadingButton from '@mui/lab/LoadingButton';
import { useDispatch } from 'react-redux';



export default function RecordInfo(props) {
  const [loading, setloading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [elemnts, setelemnts] = React.useState([]);
  const { new_records } = props;

  const dispatch = useDispatch();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleRemoveform = () => {
    const tmpforms = [...elemnts];
    setelemnts(tmpforms.slice(0, tmpforms.length));
  }

  const el = (
    <Stack direction={"row"} columnGap={1} sx={{ my: 1 }}>
      <TextField size={"small"} label={"Arrest Type"} sx={{ flex: 5 }} required name={"type[]"}/>
      <TextField size={"small"} label={"Amount"} sx={{ flex: 5 }} required name={"value[]"}/>
      <IconButton sx={{ flex: 1 }} color={"secondary"} onClick={handleRemoveform}>
        <Delete />
      </IconButton>
    </Stack>
  );

  const handleAddForm = () => {
    setelemnts([...elemnts, el]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    // const inputdatas = Object.fromEntries(data.entries());
    dispatch(recordArrest({setloading, form: data}));
  }


  return (
    <>
      {
        new_records?.map(record => (
          // <Accordion onChange={handleChange('panel2')}>
          //   <AccordionSummary
          //     expandIcon={<ExpandMoreIcon />}
          //     aria-controls="panel2bh-content"
          //     id="panel2bh-header"
          //   >
          //     <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          //     <Typography sx={{ color: 'text.secondary' }}>
          //       You are currently not an owner
          //     </Typography>
          //   </AccordionSummary>
          //   <AccordionDetails>
          //     <Typography>
          //       Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
          //       varius pulvinar diam eros in elit. Pellentesque convallis laoreet
          //       laoreet.
          //     </Typography>
          //   </AccordionDetails>
          // </Accordion>
          <AccordionInfo title={record.title ?? "No title mentioned"} summary_caption={"hey there write here"}>
            <Grid container sx={{
              maxWidth: "1000px"
            }}>
              <Grid item xs={6}>
                <InfoLabel label={"Title"} value={record.title} />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Exact Violation"} value={
                  record?.exact_violation?.map(ev => (
                    <>
                      <Typography>{ev}</Typography>
                    </>
                  ))
                } />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Car"} value={record.car?.name} />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Car Plate"} value={record.car?.platenumber} />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Car Type"} value={record.car?.type} />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Driver Fault"} value={record.driver_fault ? <Chip label="Yes" color={"secondary"} icon={<AddTask />} size={"small"} /> : <Chip label="No" color={"success"} icon={<DoNotDisturbOff />} size={"small"} />} />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Traffic Police"} value={record?.traffic_police?.name.first + " " + record?.traffic_police?.name.last} />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel label={"Violated Rule"} value={record?.violated_rule} />
              </Grid>
              <Grid item xs={6} sx={{
                borderRadius: 3,
                overflow: "hidden",
                mt: 2
              }}>
                <Mapfitun region={record.region} />
              </Grid>
              <Grid item xs={6} sx={{
                mt: 3,
                pl: 2
              }}>
                <Box
                  component={"form"}
                  onSubmit={handleSubmit}
                  sx={{
                    p: 2,
                    boxShadow: 3,
                    borderRadius: 2,
                  }}>
                    
                  <Stack direction={"row"} columnGap={1}>
                    <TextField size={"small"} label={"Arrest Type"} sx={{ flex: 5 }} required name={"type[]"}/>
                    <TextField size={"small"} label={"Amount"} sx={{ flex: 5 }} required name={"value[]"}/>
                    <IconButton sx={{ flex: 1 }} color={"primary"} onClick={handleAddForm}>
                      <Add />
                    </IconButton>
                  </Stack>
                  {
                    elemnts
                  }
                  <LoadingButton loading={loading} color={"primary"} fullWidth size={"small"} variant={"contained"} sx={{ mt: 3 }} type={"submit"}>Submit</LoadingButton >
                </Box>
              </Grid>
            </Grid>
          </AccordionInfo>
        ))
      }
    </>
  );
}
