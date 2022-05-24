import React from 'react';
import {
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails
} from "@mui/material";
import {
    ExpandMore
} from "@mui/icons-material";

const AccordionInfo = (props) => {
    const { children, title, summary_caption } = props;
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? true : false);
    };
    return (
        <Accordion expanded={expanded} onChange={handleChange('panel2')}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }} fontWeight={"bold"} color={"primary.dark"}>{title}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {summary_caption}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* <Typography> */}
                    {
                        children
                    }
                {/* </Typography> */}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionInfo