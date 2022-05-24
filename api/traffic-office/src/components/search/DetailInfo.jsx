import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import RecordInfo from "./RecordInfo";
import AccordionInfo from './AccordionInfo';
import InfoLabel from "./InfoLabel";
import {
    Grid,
    Container,
    Chip
} from "@mui/material";
import {
    useSelector
} from "react-redux";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const { driver } = useSelector(state => state.driver);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
        >
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="New Record" {...a11yProps(0)} />
                <Tab label="Old Record" {...a11yProps(1)} />
                <Tab label="Accidents" {...a11yProps(2)} />
                <Tab label="Driver Detail" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <RecordInfo />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <RecordInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <RecordInfo />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AccordionInfo title="Basic Information" summary_caption={"hey there write here"}>
                    {/* <Container sx={{
                        width: "150px",
                        my: 2,
                    }}> */}
                        <Box
                            component={"img"}
                            src={"https://picsum.photos/200"}
                            sx={{
                                borderRadius: "50%",
                                mb: 2,
                                width: "150px",
                                boxShadow: 3,
                                border: "3px solid",
                                borderColor: "primary.dark",
                            }}
                        ></Box>
                    {/* </Container> */}
                    <Grid container rowSpacing={2}>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Name"}
                                value={`${driver.name.first} ${driver.name.last}`}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Email"}
                                value={driver.email}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Phone Number"}
                                value={driver.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Username"}
                                value={driver.username}
                            />
                        </Grid>
                    </Grid>
                </AccordionInfo>
                <AccordionInfo title="License Information" summary_caption={"hey there write here"}>
                    <Grid container rowSpacing={2} border={"1px dashed #ccc"} p={2}>
                        <Grid item xs={6} minWidth={150} >
                            <Chip
                                label={"Auto"}
                                color={"primary"}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issuer School"}
                                value={`${driver.name.first} ${driver.name.last}`}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Type"}
                                value={driver.email}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issued Date"}
                                value={driver.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Expiry Date"}
                                value={driver.username}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"License Number"}
                                value={driver.username}
                            />
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={2} border={"1px dashed #ccc"} p={2}>
                        <Grid item xs={6} minWidth={150} >
                            <Chip
                                label={"Hisb 1"}
                                color={"primary"}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issuer School"}
                                value={`${driver.name.first} ${driver.name.last}`}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Type"}
                                value={driver.email}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issued Date"}
                                value={driver.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Expiry Date"}
                                value={driver.username}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"License Number"}
                                value={driver.username}
                            />
                        </Grid>
                    </Grid>
                </AccordionInfo>
                <AccordionInfo title="Identification Card" summary_caption={"hey there write here"}>
                <Grid container rowSpacing={2} border={"1px dashed #ccc"} p={2}>
                        <Grid item xs={6} minWidth={150} >
                            <Chip
                                label={"Adama Sceince and Technology University --teacher"}
                                color={"primary"}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issuer School"}
                                value={`${driver.name.first} ${driver.name.last}`}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Type"}
                                value={driver.email}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issued Date"}
                                value={driver.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Expiry Date"}
                                value={driver.username}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Identification Number"}
                                value={driver.username}
                            />
                        </Grid>
                    </Grid>
                </AccordionInfo>
                <AccordionInfo title="Owened Cars" summary_caption={"hey there write here"}>
                <Grid container rowSpacing={2} border={"1px dashed #ccc"} p={2}>
                        <Grid item xs={6} minWidth={150} >
                            <Chip
                                label={"Adama Sceince and Technology University --teacher"}
                                color={"primary"}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issuer School"}
                                value={`${driver.name.first} ${driver.name.last}`}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Type"}
                                value={driver.email}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Issued Date"}
                                value={driver.phoneNumber}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Expiry Date"}
                                value={driver.username}
                            />
                        </Grid>
                        <Grid item xs={6} minWidth={150} >
                            <InfoLabel
                                label={"Identification Number"}
                                value={driver.username}
                            />
                        </Grid>
                    </Grid>
                </AccordionInfo>
                
            </TabPanel>
        </Box>
    );
}
