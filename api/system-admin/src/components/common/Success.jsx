import React from 'react';
import Common from "./Common";
import { Link } from "react-router-dom";
import {
  Box,
  Stack
} from "@mui/material";

const Success = () => {
  return (
    <Common>
      <Stack alignItems={"center"} gap={3}>
        <Link to="/active-session">
          <Box
            component={"img"}
            alt={""}
            src={"success.png"}
            sx={{ py: 10 }}
          />
        </Link>
      </Stack>
    </Common>
  )
}

export default Success