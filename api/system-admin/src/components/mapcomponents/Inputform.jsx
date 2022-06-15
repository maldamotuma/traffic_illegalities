import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Searchmenu from './Searchmenu';
import { get_actor_on_map } from '../../redux/actions/trackActions';
import {
    useDispatch
} from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';

export default function Inputform() {
    const [search_input, setsearch_input] = React.useState("");
    const [loading, setloading] = React.useState(false);
    const [choice, setchoice] = React.useState("car");
    const diapatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        diapatch(get_actor_on_map(choice, search_input, setloading));
    }
    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <Searchmenu choice={choice} setchoice={setchoice} />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="username ( or plate number )"
                value={search_input}
                onChange={e => setsearch_input(e.target.value)}
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            {
                loading ?
                    <IconButton sx={{ p: '10px' }} aria-label="loading" disabled>
                        <CircularProgress size={23.5} />
                    </IconButton>
                    :
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
            }
        </Paper>
    );
}
