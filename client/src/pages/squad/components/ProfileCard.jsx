/* eslint-disable react/prop-types */
import { BACKEND_SERVER_URL } from "../../../Appconfig"
import Image from "../../../components/containers/Image"
import { CgGift } from "react-icons/cg";

const ProfileCard = ({user}) => {
  return (
    <div className='w-full cursor-pointer mb-5 h-32 p-4  rounded-md border shadow-md shadow-gray-500'>
        <div className="flex justify-start items-center gap-4">
                <Image isUser={true}  source={BACKEND_SERVER_URL+"/avatars/"+ user.profileAvatar} style='h-12 w-[52px] md:h-16 md:w-[66px]' />
                <div>
                    <p className='font-semibold'>{user.firstName} {user.lastName}</p>
                    <p className=' text-xs mb-2'>@{user.userName}</p>
                    <p className='text-xs md:text-sm text-gray-500'>{user.bio}</p>
                </div>
                <div className="p-1 md:p-2 bg-[#ffd898] rounded-full border border-gray-400 ml-auto mr-4 md:mr-8 text-2xl text-gray-700">
                <CgGift className=""/>
                </div>
            </div>
    </div>
  )
}

export default ProfileCard