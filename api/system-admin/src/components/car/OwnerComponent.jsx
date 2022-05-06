import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Grid
} from "@mui/material";
import {
    useSelector
} from "react-redux";

const OwnerComponent = () => {
    const owner = useSelector(state => state.newCar?.newCar?.owner);
    return (
        <Stack direction={"row"} alignItems={"center"} gap={5}>
            <Box
                component={"img"}
                src={"https://picsum.photos/100"}
                sx={{
                    borderRadius: "50%",
                    boxShadow: 3,
                    border: '2px solid #fff'
                }}
            />
            <Grid sx={{ flex: 1 }} container rowSpacing={1}>
                <Grid xs={6} item>
                    <Typography fontWeight={700} color={"primary.dark"}>Name</Typography>
                    <Typography color={"primary.light"}>{owner.name}</Typography>
                </Grid>
                <Grid xs={6} item>
                    <Typography fontWeight={700} color={"primary.dark"}>Belongs to</Typography>
                    <Typography color={"primary.light"}>{owner.id_name}</Typography>
                </Grid>
                <Grid xs={6} item>
                    <Typography fontWeight={700} color={"primary.dark"}>Id no</Typography>
                    <Typography color={"primary.light"}>{owner.id_number}</Typography>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default OwnerComponent