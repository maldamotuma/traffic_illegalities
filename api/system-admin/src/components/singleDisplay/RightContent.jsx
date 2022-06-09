import React, { useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  IconButton
} from "@mui/material";
import Mapfitun from "../mapcomponents/Mapfitun";
import SingleInfoLabel from './SingleInfoLabel';
import AddRegion from '../addOperator/AddRegion';
import { Delete } from '@mui/icons-material';
import CarPhotos from '../car/CarPhotos';
import Confirmationdialogue from './Confirmationdialogue';

const RightContent = (props) => {
  const { idInfo, region, IDPhotos, PIC_PATH, edit, seteditparams, delete_id_photos, user } = props;
  const PICTURE_SERVER = process.env.REACT_APP_SERVER;
  const [info, setinfo] = useState({ region });
  const [open, setOpen] = useState({open: false});

  const handleDeletephoto = (photo) => {
    // delete_id_photos(photo, user._id);
    setOpen({
      open: true,
      delete_id_photos,
      photo,
      user
    });
  }
  return (
    <Box sx={{
      pl: 3,
      flex: 5
    }}>
      <Confirmationdialogue open={open} setOpen={setOpen} />
      <Stack
        gap={1}
        sx={{
          // width: "100%",
          // border: '1px ',
        }}>
        <Box sx={{
          // flex: 1
          borderBottom: '1px solid #ccc',
          pb: 2
        }}>
          {
            edit ?
              <AddRegion edit info={info} setinfo={setinfo} />
              :
              <Mapfitun region={region} />
          }
        </Box>
        <Box>
          <Typography fontWeight={500}>
            ID Crds
          </Typography>
          <Stack direction={"row"} alignItems={"start"} gap={3}>
            <Box sx={{
              width: "350px"
            }}>
              {
                idInfo?.map(ii => <SingleInfoLabel data={ii} edit={edit} seteditparams={seteditparams} />)
              }
            </Box>
            <Box>
              <Stack direction={"row"} alignItems={"start"}>
                {
                  IDPhotos?.map(photo => (
                    <Box sx={{
                      width: 150,
                      height: 100,
                      position: "relative",
                      m: 2,
                      borderRadius: 5,
                      overflow: "hidden"
                    }}>
                      {
                        edit ?
                          <>
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                height: "100%",
                                width: "100%",
                                bgcolor: "rgba(0,0,0,.75)"
                              }}
                            />
                            <IconButton color={"error"} onClick={() => handleDeletephoto(photo)}>
                              <Delete />
                            </IconButton>
                          </>
                          : <></>
                      }
                      <Box
                        component={"img"}
                        src={`https://picsum.photos/100`}
                        // src={`${PICTURE_SERVER}/${PIC_PATH}/${photo}`}
                        sx={{
                          borderRadius: 1,
                          width: "100%",
                        }}
                      />
                    </Box>
                  ))
                }
              </Stack>
              {
                edit ? <Box sx={{ mt: 2 }} component={"form"} id="idphotos"><CarPhotos /></Box> : <></>
              }
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default RightContent