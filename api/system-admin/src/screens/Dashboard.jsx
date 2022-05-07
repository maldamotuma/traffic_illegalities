import React from 'react'
import Linechart from '../components/dashboard/chart/Linechart'
import Topsummary from '../components/dashboard/Topsummary'
import Donut from '../components/dashboard/chart/Donut';
import {
    Box,
    Stack
} from "@mui/material"
import Rightside from '../components/dashboard/Rightside';

const Dashboard = () => {
    return (
        <Box>
            <Stack direction={"row"} alignItems={"start"} sx={{ width: "100%" }} gap={1.5}>
                <Box sx={{
                    width: "1250px",
                    position: "fixed",
                    right: 20,
                    overflow: "auto !important"
                }}>
                    <Topsummary />
                    <Linechart />
                </Box>
                <Box sx={{
                    
                }}>
                    <Rightside />
                </Box>
            </Stack>
            <Donut />
        </Box>
    )
}

export default Dashboard
