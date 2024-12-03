/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */

import { useDispatch, useSelector } from "react-redux"
import { userGoalCategoryConstant } from "../../../constants/UserGoalCategory"
import { openModal } from "../../../redux/reducers/GlobalModalReducer"
import EditGoal from "../EditGoal"
import { formatDate } from "../../../utils/DateFormatter"

const Goal = ({ goal, setIsUpdated }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <ul className="w-full rounded-md -mb-3" onClick={()=>user.id == goal.userId && dispatch(openModal({component:<EditGoal {...{goal, setIsUpdated}}/>}))}>
            {/* <p className="!text-gray-500 text-sm">20 June, 2023</p> */}
            <li className={`goal-box flex items-center shadow-sm !mb-5 text-base pl-4 !py-6 !border-b-4 shadow-md !rounded-2xl !border-l-8 ${goal.completed ?
                'shadow-green-800  !border-[#107869]' :
                'shadow-red-800  !border-[#ff2511]'}`}><span className={`ml-6 ${goal.completed ?
                'text-[#107869]': 'text-[#ff2511]'} text-xl`}>{userGoalCategoryConstant.find(cat => cat.categoryName == goal?.user_goal_category?.name)?.categoryIcon}</span>
                <div className="ml-5">
                    <span className="">{goal.title}</span>
                    <p className="text-xs">{formatDate(goal.startDate)}</p>
                </div>
            </li>
        </ul>
    )
}

export default Goal