/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
// import useAuthCheck from "../../hooks/useAuthCheck"
import {jwtDecode} from 'jwt-decode';
import { clearUser } from "../../redux/reducers/UserReducer";
import { clearToken } from "../../redux/reducers/AuthReducer";
import { addToLocalStorage } from "../../utils/LocalStorage";



const ProtectedRoute = () => {
    // useAuthCheck()
    const url = window.location.href
    const matches = url.includes('/monthlyProgress?')
    const user = useSelector(state => state.user)
    const authToken = useSelector(state => state.auth).token
    const dispatch = useDispatch()
    const currentTime = Date.now() / 1000  
    if(!authToken || !user.isLoggedIn ){
        if(matches){
            addToLocalStorage("monthlyProgress", url)
        }
       return  <Navigate to="/login" /> 
    }
    else if(jwtDecode(authToken)?.exp < currentTime){
        handleLogout(dispatch)
    }
    else{
        return <Outlet />
    }
}

const handleLogout = (dispatch) => {
    dispatch(clearUser())
    dispatch(clearToken())
    return <Navigate to="/login" />
};
export default ProtectedRoute