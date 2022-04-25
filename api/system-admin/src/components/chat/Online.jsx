import {
	Box,
	Typography,
} from '@mui/material';
const Online = ({ children, color }) => {
	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'center',
			gap: 1,
		}}>
			<Box sx={{
				width: '13px', height: '13px',
				borderRadius: '50%', bgcolor: color ?? '#00ff22',
			}} />
			<Typography color={color ?? "#00ff22"} fontWeight={450}>
				online
			</Typography>
			{children}
		</Box>
	)
}

export default Online;