import React from 'react';
import Common from "./Common";
import {
  Box,
  Typography,
  Stack
} from "@mui/material";

const Loading = () => {
  return (
    <Common>
      <Stack alignItems={"center"} gap={3}>
        <Box
          component={"img"}
          alt={""}
          src={"loading.gif"}
          sx={{py: 10}}
        />
      </Stack>
    </Common>
  )
}

export default Loading