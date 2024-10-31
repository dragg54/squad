/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import useAuthCheck from "../../hooks/useAuthCheck"


const ProtectedRoute = () => {
    useAuthCheck()
    const user = useSelector(state => state.user)
        return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute