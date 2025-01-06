import { GiCheckMark } from "react-icons/gi";
import { useSelector } from "react-redux";
import Button from "../../components/buttons";
import { useNavigate } from "react-router-dom";

const UserEmailVerified = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    return (
        <div className='w-full pt-40 flex flex-col items-center justify-start p-3 h-screen'>
            <div className="w-28 h-28 text-5xl text-green-700 rounded-full border shadow-md flex justify-center items-center">
                <GiCheckMark />
            </div>
                <p className='text-2xl mt-6 font-semibold'>Email is verified</p>
                <p className="mt-3 text-center md:w-1/2">Your email {user.email} has been successfully verified. You can now go back to the login page to access the app.</p>
                <Button onClick={()=> navigate('/login')} style={'!mt-5 !rounded-full !bg-[#b175ff]'} name={'Continue to login'}/>
        </div>
    )
}

export default UserEmailVerified