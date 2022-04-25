import React, { useState, useCallback } from 'react';
import {
    Box,
    Typography,
    Stack,
    Button,
    Input,
} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dropzone from 'react-dropzone'
import PreparePhoto from './PreparePhoto';

const DropDOwn = () => {
    const [images, setimages] = useState([]);

    return (
        <Box sx={{
            width: '80%',
            m: "auto",
            display: "flex",
            gap: 3
        }}>
            <Box sx={{ flex: 1, transition: ".2s all ease-out" }}>
                <Dropzone onDrop={acceptedFiles => setimages(acceptedFiles)} >
                    {({ getRootProps, getInputProps, isDragActive }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Box
                                    sx={{
                                        bgcolor: isDragActive ? "#000000cc" : "#edf6ff",
                                        border: `2px dashed ${isDragActive ? "#000" : "#1976D2"}`,
                                        position: "relative",
                                        borderRadius: 3,
                                        pb: 2.5,
                                        transition: ".2s all ease-out",
                                        position: "relative"
                                    }}>
                                    {/* <Box sx={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: 0,
                                        zIndex: 1
                                    }}>
                                        {
                                            images.map(image => <PreparePhoto image={image} />)
                                        }
                                    </Box> */}
                                    <Stack justifyContent={"center"} alignItems={"center"}>
                                        <Box
                                            component={"img"}
                                            alt={""}
                                            src="dragdrop.png"
                                            sx={{ maxHeight: "300px", opacity: .5 }}
                                        />
                                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                                            <Typography sx={{
                                                // position: "absolute",
                                                // bottom: "50px",
                                                // width: "80%"
                                            }} color={"primary"} fontWeight={"bold"} fontSize={"20px"}>Drop Images or</Typography>

                                            <label htmlFor="contained-button-file">
                                                <Input accept="image/*" id="contained-button-file" multiple type="file" hidden />
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    size={"small"}
                                                    startIcon={<AddPhotoAlternateIcon />}
                                                >
                                                    Upload
                                                </Button>
                                            </label>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </div >
                        </section >
                    )}
                </Dropzone >
            </Box>
            {
                images.length !== 0 &&
                <Box sx={{ flex: 3, transition: ".2s all ease-out" }}>
                    {
                        images.map(image => <PreparePhoto image={image} />)
                    }
                </Box>
            }
        </Box>
    )
}
const CarPhotos = () => {
    return (
        <Box>
            <DropDOwn />
        </Box>
    )
}

export default CarPhotos