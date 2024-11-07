// hooks/useAuthCheck.js
import { getCookie, isTokenExpired } from '../utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useAuthCheck = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth).token
    // useEffect(() => {
    //     console.log(token)
    //     if ( (!token || isTokenExpired(token))) {
    //         navigate('/login'); 
    //     }
    // }, [navigate]);
};

export default useAuthCheck;
