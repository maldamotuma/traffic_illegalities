import React from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider
} from "@mui/material";
import Mapfitun from "../mapcomponents/Mapfitun";
import SingleInfoLabel from './SingleInfoLabel';

const RightContent = (props) => {
  const { idInfo, region, IDPhotos, PIC_PATH, edit } = props;
  const PICTURE_SERVER = process.env.REACT_APP_SERVER;
  return (
    <Box sx={{
      pl: 5,
      flex: 5
    }}>
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
          <Mapfitun region={region} />
        </Box>
        <Box>
          <Typography fontWeight={500}>
            ID Crds
          </Typography>
          <Stack direction={"row"} alignItems={"start"} gap={3}>
            <Box>
              {
                idInfo?.map(ii => <SingleInfoLabel data={ii} edit={edit} />)
              }
            </Box>
            <Stack direction={"row"} alignItems={"start"}>
              {
                IDPhotos?.map(photo => (
                  <Box
                    component={"img"}
                    src={`${PICTURE_SERVER}/${PIC_PATH}/${photo}`}
                    sx={{
                      borderRadius: 1
                    }}
                  />
                ))
              }
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default RightContent