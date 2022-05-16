import React from 'react';
import Summary from './cards/Summary';
import {
  Box, Stack
} from "@mui/material";

const Topsummary = () => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} sx={{ width: "100%" }}>
      <Summary hover={true} data={{
        title: "Total Users",
        measurement: "+300",
        footer: "starting from january 28"
      }}
        color={{
          main: "primary.light",
          sub: "primary.main"
        }}
      />
      <Summary data={{
        title: "Total Cars",
        measurement: "+350",
        footer: "starting from january 28"
      }}
        color={{
          main: "#fff",
          sub: "primary.main"
        }}
      />
      <Summary data={{
        title: "Total Traffics",
        measurement: "+950",
        footer: "starting from january 28"
      }}
        color={{
          main: "#02d11e",
          secondary: "#9afca7"
        }}
      />
      <Summary data={{
        title: "Total Accidents",
        measurement: "+550",
        footer: "starting from january 28"
      }}
        color={{
          main: "secondary.light",
          sub: "secondary.main"
        }}
      />
    </Stack>
  )
}

export default Topsummary