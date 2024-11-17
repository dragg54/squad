/* eslint-disable react/prop-types */
import { CiUser } from "react-icons/ci";
import { FaRegHourglass } from "react-icons/fa6";
import { PiTarget } from "react-icons/pi";
import {  } from "../../../utils/ReduceStringLength";
import useReduceStringLength from "../../../hooks/useReduceStringLength";
import { useNavigate } from "react-router-dom";
import DonationStatusBar from "./DonationStatusBar";

const DonationBox = ({donation}) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const daysRemaining = (new Date(donation.targetDate) -  new Date())/(1000 * 60 * 60 * 24)
  const navigate = useNavigate()

  return (
    <div onClick={()=>{
      navigate("/donation/"+donation.id, {state: {donation}})
    }} className="h-44 md:h-52 md:p-8 mb-2 md:mb-4 cursor-pointer border border-gray-300 p-4 shadow-md shadow-gray-300 rounded-md">
      <div className='w-full flex justify-between items-center'>
        <div>
          <h3 className="font-semibold w-[2/5]  whitespace-nowrap">{useReduceStringLength(donation.reason)}</h3>
          <p className="mt-1 text-gray-700 text-xs bg-orange-300 p-1 px-3 w-fit rounded-xl flex items-center gap-1">{Math.floor(daysRemaining)} Days left <FaRegHourglass className="text-[10px] font-bold"/> </p>
          <p className="mt-1 text-gray-700 text-sm inline-flex gap-1 items-center"><PiTarget /> Target: <span className="font-semibold">#{donation.targetAmount}</span></p>
          <p className="mt-4 bg-[#e9eae0] p-1 text-xs">Opened By <span className="font-semibold">James Morrison</span></p>

        </div>
        <div className='flex flex-col'>
          <p className="text-4xl bg-[#e9eae0] text-gray-800 font-bold rounded-md p-2">#{donation.totalAmount}</p>
          <p className="inline-flex  items-center text-gray-500 mt-1"><CiUser className=""/>{donation.totalPayment}</p>
        </div>
      </div>
     <DonationStatusBar donation={donation}/>
    </div>
  )
}

export default DonationBox