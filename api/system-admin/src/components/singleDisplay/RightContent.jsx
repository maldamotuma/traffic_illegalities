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
  const { idInfo, region, IDPhotos, PIC_PATH } = props;
  const PICTURE_SERVER = process.env.REACT_APP_SERVER;
  return (
    <Box sx={{
      pl: 5,
      width: "100%",
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
                idInfo?.map(ii => <SingleInfoLabel data={ii} />)
              }
            </Box>
            <Box>
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
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default RightContent