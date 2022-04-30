import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Stack
} from "@mui/material";
import SingleInfoLabel from './SingleInfoLabel';
import { useState } from 'react';
import {
  Camera, Photo
} from "@mui/icons-material";

const LeftContent = (props) => {
  const { labelData, pp } = props;
  const [hover, sethover] = useState(false);
  const ppPath = process.env.REACT_APP_SERVER;
  return (
    <Box sx={{
      borderRight: "1px solid #ccc",
      pr: 5
    }}>
      <Box sx={{ position: "relative" }}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        <Box
          component={"img"}
          src={ppPath+pp}
          alt={""}
          sx={{
            boxShadow: 2,
            borderRadius: 2,
            width: '100%'
          }}
        />
        <Stack
        alignItems={"center"}
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: hover ? "70px" : 0,
          bgcolor: hover ? "#000000aa" : "#00000000",
          borderRadius: 2,
          transition: ".2s all ease",
          overflow: "hidden"
        }}>
          <IconButton sx={{m: 0}}>
            <Camera sx={{color: "#fff"}}/>
          </IconButton>
          <Typography color={"#fff"} align={"center"} sx={{m: 0}}>
            Change Profile Picture
          </Typography>
        </Stack>
      </Box>
      <Typography sx={{ my: 1 }} fontSize={20} fontWeight={600}>Malda Motuma</Typography>
      <Divider />
      <Box sx={{ my: 2 }}>
        {
          labelData.map(ld => <SingleInfoLabel data={ld}/>)
        }
        {/* <SingleInfoLabel />
        <SingleInfoLabel />
        <SingleInfoLabel />
        <SingleInfoLabel />
        <SingleInfoLabel />
        <SingleInfoLabel />
        <SingleInfoLabel /> */}
      </Box>
    </Box>
  )
}

export default LeftContent