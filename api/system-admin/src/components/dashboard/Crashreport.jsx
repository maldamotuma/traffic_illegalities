import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Status from './Status';
import { bindActionCreators } from 'redux';
import * as crashActions from "../../redux/actions/crashactions";
import {
    useDispatch,
    useSelector
} from "react-redux";
import axios from 'axios';
import url from "../../redux/baseUrl";
import fileDownload from 'js-file-download';


function Row(props) {
    const { row, download_crashlog } = props;
    const [open, setOpen] = React.useState(false);
    const [hover, sethover] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" onClick={() => download_crashlog(row._id)}>
                    <Typography textOverflow={"ellipsis"} sx={{
                        maxWidth: "200px",
                        overflow: "hidden",
                        cursor: "pointer",
                        transition: ".2s all ease"
                    }}
                        onMouseEnter={() => sethover(true)}
                        onMouseLeave={() => sethover(false)}
                        color={hover ? "#fff" : ""}
                        bgcolor={hover ? "primary.light" : ""}
                        borderRadius={1}
                        px={1}
                    >
                        {row.log_file}
                    </Typography>
                </TableCell>
                <TableCell align="right" sx={{
                    maxWidth: "50px",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }}>{row.from}</TableCell>
                <TableCell align="right">
                    <Status status={row.seen_at ? "pending" : "new"} />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Happened_at</TableCell>
                                        <TableCell>adddressed_at</TableCell>
                                        <TableCell align="right">seen_at</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={"sub" + row._id}>
                                        <TableCell component="th" scope="row" sx={{
                                            maxWidth: "100px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        }}>
                                            {row.createdAt}
                                        </TableCell>
                                        <TableCell>{row.addressed_at ?? "NA"}</TableCell>
                                        <TableCell align="right">{row.seen_at ?? "NS"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const Crashreport = () => {
    const dispatch = useDispatch();
    const { fetch_crashes, download_crashlog } = bindActionCreators(crashActions, dispatch);
    const { crashes } = useSelector(state => state);
    React.useEffect(() => {
        fetch_crashes();
    }, []);

    const handleDownload = async crash_id => {
        try {
            const res = await axios({
                url: url + "/download-crash?crash=" + crash_id,
                method: "GET",
                // responseType: "blob",
                withCredentials: true
            });
            fileDownload(res.data);
        } catch (error) {
            alert("something gone wrong!!");
        }
    }
    return (
        <Box>
            <Typography fontSize={20} fontWeight={700} color={"primary.dark"} sx={{ mt: 5 }}>
                Crash Report
            </Typography>
            <TableContainer component={"div"}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Crash</TableCell>
                            <TableCell align="right">from</TableCell>
                            <TableCell align="right">status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {crashes.reverse().map((crash) => (
                            <Row key={crash._id} row={crash} download_crashlog={handleDownload} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Crashreport