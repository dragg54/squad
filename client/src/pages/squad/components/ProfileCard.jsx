/* eslint-disable react/prop-types */
import Image from "../../../components/containers/Image"

const ProfileCard = ({user}) => {
  return (
    <div className='w-full cursor-pointer mb-5 h-32 p-4  rounded-md border shadow-md shadow-gray-500'>
        <div className="flex justify-start items-center gap-4">
                <Image source='' style='h-16 w-[66px]' />
                <div>
                    <p className='font-semibold'>{user.firstName} {user.lastName}</p>
                    <p className=' text-xs mb-2'>{user.userName}</p>
                    <p className='text-sm text-gray-500'>An enterpreneur. Hilarious and hardworking</p>
                </div>
            </div>
    </div>
  )
}

export default ProfileCard