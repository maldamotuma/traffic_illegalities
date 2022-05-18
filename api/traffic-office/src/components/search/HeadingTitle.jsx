import { Typography } from '@mui/material'
import React from 'react'

const HeadingTitle = () => {
    return (
        <Typography
            fontSize={"60PX"}
            fontFamily={"'Abril Fatface', cursive"} variant={"h1"} textAlign={"center"} color={"primary.dark"} sx={{ mb: 2 }}>
            Search The Driver Here
        </Typography>
    )
}

export default HeadingTitle