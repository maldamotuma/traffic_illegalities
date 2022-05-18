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
  IconButton
} from "@mui/material";
import {
  Add,
  Delete
} from "@mui/icons-material";
// import { OverlayScrollbarsComponent } from "overlayscrollbars-react"


export default function RecordInfo() {
  const [forms, setforms] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const ref = React.useRef();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const removeform = () => {
    const tmpforms = [...forms];
    tmpforms.pop();
    setforms([...tmpforms]);
  }
  
  const formadd = (
    <Grid item xs={12} container gap={1}  >
      <Grid item xs={5}>
        <TextField id="name" label="name" variant="standard" />
      </Grid>
      <Grid item xs={4}>
        <TextField id="amount" label="amount" variant="standard" />
      </Grid>
      <Grid item xs={1} alignSelf={"normal"}>
        <IconButton color={"secondary"} onClick={removeform}>
          <Delete />
        </IconButton>
      </Grid>
    </Grid>
  );

  const addform = () => {
    setforms([...forms, formadd]);
  }

  

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container rowSpacing={1}
            sx={{
              width: 1000,
            }}
          >
            <Grid container item xs={8}>
              <Grid item xs={6}>
                <InfoLabel />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel />
              </Grid>
              <Grid item xs={6}>
                <InfoLabel />
              </Grid>
            </Grid>
            <Grid item xs={4} container gap={0}>
              <Grid item xs={12} container gap={0}
                sx={{
                  maxHeight: 200,
                  overflow: "auto"
                }}
              >
                {/* <OverlayScrollbarsComponent
                  style={{
                    height: 'calc(100vh - 68px)'
                  }}> */}
                  <Grid container gap={1}  >
                    <Grid item xs={5}>
                      <TextField id="name" label="name" variant="standard" />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField id="amount" label="amount" variant="standard" />
                    </Grid>
                    <Grid item xs={1} alignSelf={"normal"}>
                      <IconButton color={"primary"} onClick={addform}>
                        <Add />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {
                    forms.map(frm => frm)
                  }
                {/* </OverlayScrollbarsComponent> */}
              </Grid>
              <Grid item xs={12}>
                <Button variant={"contained"} fullWidth >Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
