/* eslint-disable react/prop-types */
import { BACKEND_SERVER_URL } from '../../../Appconfig'
import Image from '../../../components/containers/Image'

const DonorBox = ({donationPayment}) => {
  return (
    <div className='w-full min-h-20 border p-4 rounded-md flex gap-2 items-center'>
        <Image style='rounded-full h-10 w-10' source={BACKEND_SERVER_URL+"/avatar/"+donationPayment?.user?.profileAvatar}/>
        <div>
        <p className='font-bold text-xl'>{donationPayment?.user?.firstName} {donationPayment?.user?.lastName}</p>
        <p className='text-xs text-gray-500 '>{donationPayment?.user?.userName}</p>
        </div>
        <p className='ml-auto text-xl bg-[#e9eae0] p-2 px-4 font-semibold rounded-full'>#{donationPayment?.amount}</p>
    </div>
  )
}

export default DonorBox