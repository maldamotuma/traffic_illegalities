import React, { useState } from 'react';
import NewPasswordComponent from '../components/authComponents/NewPasswordComponent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { logout } from '../redux/actions/authactions';
import { connect } from 'react-redux';


const CardTop = ({logoutUser, user}) => {
    const [loading, setloading] = useState(false);


    const handleLogout = () => {
        setloading(true);
        logoutUser(setloading);
    }
    return (
        <Grid container>
        <Grid item xs={12} container justifyContent={'center'} sx={{ mb: 2 }}>
            <Paper sx={{ border: '2px solid #888', p: .3, borderRadius: '50%' }} elevation={0}>
                <Avatar
                alt="Remy Sharp"
            src="https://picsum.photos/100/100"
            sx={{ width: 80, height: 80 }}
            />
            </Paper>
        </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom component="p" sx={{ color: '#444' }}>
                Hello {user?.name.first+" "+user?.name.last}, You should have to create new password to proceed
                </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent={'end'}>
                <LoadingButton
                onClick={handleLogout}
                loading={loading}
                variant="outlined"
                size={'small'}>
                Logout
                </LoadingButton>
            </Grid>
        </Grid>
        )
}
const CreateNewPassword = ({logout, user}) => {
    return (
        <div className="mt-5">
            <NewPasswordComponent type="create" TopCard={<CardTop logoutUser={logout} user={user}/>}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    logout
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewPassword)