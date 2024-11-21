/* eslint-disable react/prop-types */
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa6";


const MonthCard = ({ month, openMonthGoalsContainer, setOpenMonthGoalsContainer }) => {
  const toggleCardContainerModal = () => {
    const newContainerState = openMonthGoalsContainer.map(st => (Object.keys(st)[0] == month ? { [month]: !Object.values(st)[0] } : st))
    setOpenMonthGoalsContainer(newContainerState)
  }
  return (
    <div className='w-full  justify-between items-center font-bold text-xl border-2 h-28 p-6 flex rounded-md shadow-md shadow-gray-500'>
      {month}
      {openMonthGoalsContainer.find(st => st[month]) ? <FaChevronUp
        onClick={() => toggleCardContainerModal()}
        style={{ cursor: "pointer" }} /> : <FaChevronDown
        onClick={() => toggleCardContainerModal()}
        style={{ cursor: "pointer" }} />}
    </div>
  )
}

export default MonthCard