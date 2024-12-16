/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import useAuthCheck from "../../hooks/useAuthCheck"
import Cookies from 'js-cookie'; 
import {jwtDecode} from 'jwt-decode';
import { clearUser } from "../../redux/reducers/UserReducer";
import { clearToken } from "../../redux/reducers/AuthReducer";



const ProtectedRoute = () => {
    useAuthCheck()
    const user = useSelector(state => state.user)
    const authToken = useSelector(state => state.auth).token
    const dispatch = useDispatch()
    const currentTime = Date.now() / 1000  
    jwtDecode(authToken)?.exp < currentTime && handleLogout(dispatch)
    return !authToken || !user.isLoggedIn  ? <Navigate to="/login" />: <Outlet /> 
}

const handleLogout = (dispatch) => {
    Cookies.remove('token')
    dispatch(clearUser())
    dispatch(clearToken())
    return <Navigate to="/login" />
};
export default ProtectedRoute