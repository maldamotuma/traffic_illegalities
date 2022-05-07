import {
    Paper} from "@mui/material";
import Donut from "./chart/Donut";
import Bar from "./chart/Bar";
import Crashreport from "./Crashreport";


const Rightside = () => {
    return (
        <Paper elevation={2} sx={{
            // width: "1260px",
            p: 5,
            pr: 5,
            display: "inline-block",
            ml: 1,
            mt: 1,
        }}>
            <Bar />
            <Crashreport />
        </Paper>
    )
}

export default Rightside