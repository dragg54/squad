/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */

import { useDispatch } from "react-redux"
import { userGoalCategoryConstant } from "../../../constants/UserGoalCategory"
import { openModal } from "../../../redux/reducers/GlobalModalReducer"
import EditGoal from "../EditGoal"
import { formatDate } from "../../../utils/DateFormatter"

const Goal = ({ goal, setIsUpdated }) => {
    const dispatch = useDispatch()
    return (
        <ul className="w-full rounded-md -mb-3" onClick={()=>dispatch(openModal({component:<EditGoal {...{goal, setIsUpdated}}/>}))}>
            {/* <p className="!text-gray-500 text-sm">20 June, 2023</p> */}
            <li className={`goal-box flex items-center shadow-sm rounded-md text-base pl-4 !py-6 !border-l-8 ${goal.completed ?
                'shadow-green-700  !border-[#107869]' :
                'shadow-red-400  !border-[#ff2511]'}`}><span className={`ml-6 ${goal.completed ?
                'text-[#107869]': 'text-[#ff2511]'} text-xl`}>{userGoalCategoryConstant.find(cat => cat.categoryName == goal?.userGoalCategory?.name)?.categoryIcon}</span>
                <div className="ml-5">
                    <span className="">{goal.title}</span>
                    <p className="text-xs">{formatDate(goal.createdAt)}</p>
                </div>
            </li>
        </ul>
    )
}

export default Goal