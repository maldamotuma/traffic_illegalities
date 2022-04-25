import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { connect } from 'react-redux';
import { changePassword } from '../../redux/actions/authactions';

const NewPasswordComponent = ({ type, changePassword, TopCard }) => {
    const [password, setPassword] = useState({password: '', new_password: '', confirm_password: ''});
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = () => {
        setLoading(true);
        changePassword(password, setLoading, type);
    }
    return (
        <div>
            <Container maxWidth="xs" className="p-0">
                <Card sx={{ py: 2, px: 3 }}>
                    <CardHeader
                        title={TopCard ? TopCard : ""}
                        sx={{ pb: 0 }}
                    />
                    <CardContent>
                        <Grid container rowSpacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label={(type === 'create' ? '' : 'Old ') + 'Password'}
                                        // placeholder={'Enter old password'}
                                        variant={'standard'}
                                        fullWidth
                                        onChange={e => setPassword({...password, password: e.target.value})}
                                    />
                                </Grid>
                            {
                                type !== "create" &&
                                <Grid item xs={12}>
                                <TextField
                                    label={'New Password'}
                                    // placeholder={'Enter old password'}
                                    variant={'standard'}
                                    fullWidth
                                    onChange={e => setPassword({...password, new_password: e.target.value})}
                                />
                            </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    label={'Confirm Password'}
                                    // placeholder={'Enter old password'}
                                    variant={'standard'}
                                    fullWidth
                                    onChange={e => setPassword({...password, confirm_password: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12} container justifyContent={'center'}>
                                <LoadingButton
                                    type="submit"
                                    className="w-100"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    // onClick={handleFormSubmit}
                                    loading={loading}
                                    onClick={handlePasswordChange}
                                >
                                    {type === 'change' ? "Change Password" : "Create Password"}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    changePassword: changePassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPasswordComponent);