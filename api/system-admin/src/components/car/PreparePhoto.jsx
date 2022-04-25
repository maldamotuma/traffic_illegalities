import React from 'react';
import {
    Box
} from "@mui/material";

const PreparePhoto = ({ image }) => {
    return (
        <Box
            sx={{ position: "relative", display: "inline-block", m: "5px" }}>
            <img src={URL.createObjectURL(image)} alt="" width={265}
            />
            {/* <Box sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                bgcolor: "#00000052",
                top: 0

            }}></Box> */}
        </Box>
    )
}

export default PreparePhoto