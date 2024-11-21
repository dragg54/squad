/* eslint-disable react/prop-types */
import { BACKEND_SERVER_URL } from "../../../Appconfig"
import Image from "../../../components/containers/Image"

const UserBox = ({ isCurrentUser, userPointData, position}) => {
  return (
    <div className={`w-full shadow-md shadow-gray-300 md:w-1/2 h-20 ${isCurrentUser ? 'bg-orange-400 !text-white ': 'border border-gray-400 !text-gray-600 '} mb-3  flex justify-between items-center p-4 rounded-md `}>
    <div className="flex justify-start gap-3 items-center">
        <p className="text-xl !text-inherit font-semibold">
            #{position}
        </p>
        <Image source={ BACKEND_SERVER_URL+"/avatars/"+ userPointData?.user?.profileAvatar} style=" h-16 w-16 rounded-full bg-yellow-500" />
        <div >
            <p className=" !text-inherit font-semibold">
                {userPointData?.user?.userName}</p>
            <p className="!text-inherit text-sm">{userPointData?.points} Points</p>
        </div>
    </div>
    {isCurrentUser && <p className="text-xl !text-inherit font-semibold">
        You
    </p>}
</div>  )
}

export default UserBox