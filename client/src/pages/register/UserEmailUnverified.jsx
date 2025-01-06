import { MdOutlineErrorOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom"
import Button from "../../components/buttons";

const UserEmailUnverified = () => {
    const navigate = useNavigate()
    const email = useLocation().state?.email
    return (
        <div className='w-full pt-40 flex flex-col items-center justify-start p-3 h-screen'>
            <div className="w-28 h-28 text-5xl text-red-700 rounded-full border shadow-md flex justify-center items-center">
                <MdOutlineErrorOutline />
            </div>
                <p className='text-2xl mt-6 font-semibold'>Email verification failed</p>
                <p className="mt-3 text-center">We are unable to verify your email at this moment. Please try again later</p>
                <Button onClick={()=> navigate('/checkMail', {state: {email}})} style={'!mt-5 !rounded-full !bg-[#b175ff]'} name={'Back'}/>
        </div>
    )
}

export default UserEmailUnverified