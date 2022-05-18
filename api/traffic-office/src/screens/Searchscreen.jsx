import React, { useEffect, useState } from 'react';
import HeadingTitle from '../components/search/HeadingTitle';
import Search from '../components/search/Search';
import DetailInfo from '../components/search/DetailInfo';
import {
    Box,
    Container,
    Typography
} from "@mui/material";
import Driver404 from '../components/search/Driver404';
import Loader from '../components/search/Loader';
import { useSelector } from 'react-redux';

const Searchscreen = () => {
    const [loader, setloader] = useState(false);
    const { driver, not_found } = useSelector(state => state.driver);

    return (
        <Box sx={{
            mt: 2,
            pb: 0
        }}>
            <HeadingTitle />
            <Search setloader={setloader}/>
            {
                loader ?
                    <Box bgcolor={"#fff"} pt={3}>
                        <Container maxWidth={"xs"} sx={{ display: "flex", justifyContent: "center" }}>
                            <Loader />
                        </Container>
                    </Box>
                    :
                    driver ?
                        <DetailInfo setloader={setloader}/>
                        :
                        not_found ?
                            <Box bgcolor={"#fff"} pt={3}>
                                <Container maxWidth={"sm"}>
                                    <Driver404 />
                                </Container>
                                <Typography
                                    textAlign={"center"} color={"#0A62CD"} fontWeight={"bold"} variant={"h1"} fontSize={30}>
                                    Please use alternative searches or check your query
                                </Typography>
                            </Box>
                            :
                            <></>
            }
        </Box>
    )
}

export default Searchscreen