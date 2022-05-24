import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';
import {
  Slide
} from "@mui/material";

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={30}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? 'primary.dark' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={30}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function CustomizedProgressBars() {
  const [open, setopen] = React.useState(false);
  const cntnr = React.useRef();
  React.useEffect(() => {
    setopen(true);
  }, [])

  
  return (
    <Box ref={cntnr}>
      <Slide
        in={open}
        container={cntnr.current}
      >
        <Box
          boxShadow={3}
          borderRadius={"50%"}
          pl={1.25}
          pt={1.25}
          width={50}
          height={50}
        >
          <Box>
            <FacebookCircularProgress />
          </Box>
        </Box>
      </Slide>
    </Box>
  );
}
