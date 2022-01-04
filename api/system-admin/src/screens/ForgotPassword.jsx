import React, { useEffect } from 'react';
import FullscreenBackDrop from '../components/FullscreenBackDrop';
import { useSearchParams } from 'react-router-dom';
import { checkToken } from '../redux/actions/authactions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({checkToken}) => {
	const [searchParams, setSearchParams] = useSearchParams({});
	const token = searchParams.get('_t');
	let navigate = useNavigate();
	useEffect(()=>{
		checkToken({token}, navigate);
	},[]);

	return (<FullscreenBackDrop />)
}


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    checkToken
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
