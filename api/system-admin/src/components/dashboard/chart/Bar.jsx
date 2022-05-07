import { XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import {
  Paper,
  Box,
  Stack,
  Typography
} from "@mui/material";
import ColorIdentifier from './ColorIdentifier';
import RangeFilter from './RangeFilter';
import { useState } from 'react';

const data = [
  { name: 'Page A', uv: 300, pv: 400, amt: 500 },
  { name: 'Page B', uv: 500, pv: 300, amt: 400 },
  { name: 'Page c', uv: 300, pv: 200, amt: 700 },
  { name: 'Page d', uv: 500, pv: 450, amt: 600 },
  { name: 'Page e', uv: 600, pv: 200, amt: 650 },
  { name: 'Page f', uv: 500, pv: 400, amt: 100 },
  { name: 'Page g', uv: 900, pv: 400, amt: 500 },
];

const Linechart = () => {
  const [visible, setvisible] = useState({a: true, b: true, c: true});

  const handleA = () => {
    setvisible({ ...visible, a: !visible.a });
  }
  const handleB = () => {
    setvisible({ ...visible, b: !visible.b });
  }
  const handleC = () => {
    setvisible({ ...visible, c: !visible.c });
  }
  return (
    <>
      <Typography fontSize={20} fontWeight={700} color={"primary.dark"}>
        Car Analytic Report
      </Typography>
      <Stack sx={{ mb: 3 }} direction={"row"} justifyContent={"space-between"}>
        <Box />
        <Stack direction={"row"} gap={3} justifyContent={"center"}>
          <ColorIdentifier color={"#8884d8"} clickHandler={handleA} title={"Accident"}/>
          <ColorIdentifier color={"#0099ff"} clickHandler={handleB} title={"Death"}/>
          <ColorIdentifier color={"#003300"} clickHandler={handleC} title={"Injury"}/>
        </Stack>
        <RangeFilter />
      </Stack>
      <BarChart width={450} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        { visible.a && <Bar type="monotone" dataKey="uv" fill="#8884d8" /> }
        { visible.b && <Bar type="monotone" dataKey="pv" fill="#0099ff" /> }
        { visible.c && <Bar type="monotone" dataKey="amt" fill="#003300" /> }
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </BarChart>
    </>
  )
}

export default Linechart