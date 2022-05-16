import React from 'react';
import {
    Chip
} from "@mui/material";
import {
    Face, FiberNew, ModelTraining, NewReleases, ThumbUp
} from "@mui/icons-material";

const Status = (props) => {
    const { status } = props;
    const status_type = {
        new: {
            text: "New",
            icon: <NewReleases />,
            type: "warning"
        },
        pending: {
            text: "Processing",
            icon: <ModelTraining />,
            type: "info"
        },
        resolved: {
            text: "Resolved",
            icon: <ThumbUp />,
            type: "success"
        }
    }
  return (
    <Chip icon={status_type[status].icon} label={status_type[status].text} size={"small"} color={status_type[status].type}/>
  )
}

export default Status