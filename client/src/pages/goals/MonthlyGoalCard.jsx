/* eslint-disable react/prop-types */
import { MdOutlineEnergySavingsLeaf } from 'react-icons/md'
const MonthlyGoalCard = ({ goals }) => {
  return (
    <>
      {
        goals && goals.length > 0 && goals.map((goal, index) => (
          <div key={index} className='ml-4 w-["200px"] border-l-2  border-l-red-500 h-16 p-4 border-2 mt-1 text-gray-600 flex items-center'>
              <MdOutlineEnergySavingsLeaf style={{ marginLeft: "5px", marginRight: "7px", fontSize: "1.6rem" }} />{goal.title}
          </div>
        ))
      }
    </>
  )
}

export default MonthlyGoalCard