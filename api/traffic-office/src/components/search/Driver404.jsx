import { Box } from '@mui/system'
import React from 'react'

const Driver404 = () => {
  return (
    <Box
      component={"img"}
      src={`${process.env.REACT_APP_SERVER}/404.webp`}
      width={"100%"}
    />
  )
}

export default Driver404