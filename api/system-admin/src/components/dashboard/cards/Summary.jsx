import React from 'react';
import {
    Box,
    Divider,
    Typography
} from "@mui/material";
import {
    Visibility
} from "@mui/icons-material";

const Summary = (props) => {
    const { hover } = props;
    return (
        <Box sx={{
            width: "300px",
            bgcolor: hover ? "primary.main" : "#fff",
            p: 2,
            borderRadius: 2,
            position: "relative",
            m: 1
        }}>
            <Box sx={{
                p: 1,
                bgcolor: "primary.light",
                display: "inline-block",
                borderRadius: 2
            }}>
                <Visibility sx={{ color: "#fff", width: "50px", height: "50px" }} />
            </Box>
            <Typography color={hover ? "#fff" : "primary.light"} sx={{ mt: 2, px: 1 }} fontWeight={200}>Total Users</Typography>
            <Typography color={hover ? "#fff" : "primary.main"} sx={{ mb: 2, mt: 0, px: 1 }} fontWeight={600} fontSize={25}>+300</Typography>
            <Divider sx={{ color: hover ? "#fff" : "primary.light" }} />
            <Typography color={hover ? "#fff" : "primary.light"} sx={{ mb: 2, mt: 1, px: 1 }} fontWeight={100}>starting from January 28</Typography>
            <Box
                component={"img"}
                alt={""}
                src={hover ? "increase_graph.svg" : "increase_graph_filled.svg"}
                sx={{
                    width: "80px",
                    position: "absolute",
                    top: 20,
                    right: 20,
                }}
            />
        </Box>
    )
}

export default Summary