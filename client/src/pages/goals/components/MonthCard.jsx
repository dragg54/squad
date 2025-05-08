/* eslint-disable react/prop-types */
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";
import { RiCoinFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { GrTrophy } from "react-icons/gr";
import { PiMaskSadLight } from "react-icons/pi";
import { RiProgress2Fill } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";




const MonthCard = ({ month, openMonthGoalsContainer, setOpenMonthGoalsContainer, monthlyGoal }) => {
  const thisMonth = (new Date()).getMonth()
  const toggleCardContainerModal = () => {
    const newContainerState = openMonthGoalsContainer.map(st => (Object.keys(st)[0] == month ? { [month]: !Object.values(st)[0] } : st))
    setOpenMonthGoalsContainer(newContainerState)
  }
  return (
    <div className='w-full cursor-pointer hover:shadow-sm justify-between items-center font-bold text-xl border-2 h-28 p-6 flex rounded-md shadow-md shadow-gray-500'>
      <div className="flex flex-col">
      <span className=" f">
      {month}
      </span>
      <span className="text-sm font-normal mt-4">
        <ul className="flex gap-4 ">
        <li className="flex items-center  gap-1 text-green-700"><span className="rounded-full bg-green-700 text-white p-1 text-[7px]"><FaCheck /> </span>{monthlyGoal.completedGoals || 0}</li>
        <li className="flex items-center gap-1 text-orange-800"><span className="rounded-full bg-orange-800 text-white p-1 text-[7px]"><GrInProgress /> </span>{(Number(monthlyGoal.uncompletedGoals) +
         (Number(monthlyGoal.expiredgoals) || 0)) || 0}</li>
          <li className="flex items-center gap-1 text-sm text-black"><RiCoinFill /> 7 Pts</li>
        </ul>
      </span>
      </div>
    <div className="flex gap-4 items-center">
      {monthlyGoal.expiredgoals > 0 || monthlyGoal.uncompletedGoals > 0 ? <PiMaskSadLight /> : monthlyGoal.completedGoals > 0 && monthlyGoal.completedGoals < 1 ?
      <GrTrophy />: thisMonth == Number(monthlyGoal.month) - 1?
      <RiProgress2Fill className="text-[1.6rem]"/>: ""}
    {openMonthGoalsContainer.find(st => st[month]) ? <FaChevronUp
        onClick={() => toggleCardContainerModal()}
        style={{ cursor: "pointer" }} /> : <FaChevronDown
        onClick={() => toggleCardContainerModal()}
        style={{ cursor: "pointer" }} />}
    </div>
    </div>
  )
}

export default MonthCard