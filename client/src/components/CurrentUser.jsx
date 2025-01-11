/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import Image from "./containers/Image"
import { clearUser } from "../redux/reducers/UserReducer"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../services/user"

const CurrentUser = ({openUserContainer}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async() =>{
      logoutUser()
    }
  return (
    <div className={`w-[200px] h-[150px] ${!openUserContainer && 'hidden'} flex flex-col items-center p-2 md:w-[300px] gap-1
            md:h-[160px] bg-white border border-gray-300 shadow-md shadow-gray-500 rounded-md absolute right-2 top-20 z-40`}>
        <Image style='h-10 w-10' isUser={true} source={user.profileAvatar}/>
        <p className="font-semibold text-sm">{user.firstName} {user.lastName}</p>
        <p className="text-gray-400 text-xs">{user.email}</p>
        <div className="w-full h-[0.5px] bg-gray-300 m-1 md:my-2"></div>
        <p className="text-red-400 font-semibold cursor-pointer" onClick={()=>{
            handleLogout()
            dispatch(clearUser())
            navigate("/login")
        }}>Logout</p>
    </div>
  )
}

export default CurrentUser