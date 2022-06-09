import React from 'react';
import {
  Container,
  Paper,
  Stack,
  IconButton,
  Box
} from "@mui/material";
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import {
  Edit,
  Save
} from "@mui/icons-material";

const MainDIsplay = (props) => {
  const { children, edit, setedit, persist_change } = props;
  const handleEditOn = () => {
    if (edit) {
      persist_change();
    }
    setedit(!edit)
  }
  return (
    <>
      <Container maxWidth={"xl"} sx={{ position: "relative", mt: 2 }}>
        <Box sx={{
          // textAlign: "center",
          my: 1,
          position: "absolute",
          top: "-25px",
          left: "0"
        }}>
          <IconButton color={edit ? "primary" : "secondary"}
            sx={{
              bgcolor: "#fff",
              boxShadow: 1
            }}
            onClick={handleEditOn}
          >
            {edit ? <Save /> : <Edit />}
          </IconButton>
        </Box>
        <Paper sx={{ p: 3 }}>
          <Stack direction={"row"}>
            {children}
          </Stack>
        </Paper>
      </Container>
    </>
  )
}

export default MainDIsplay