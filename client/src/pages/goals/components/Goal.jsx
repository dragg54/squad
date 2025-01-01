/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */

import { useDispatch, useSelector } from "react-redux"
import { userGoalCategoryConstant } from "../../../constants/UserGoalCategory"
import { openModal } from "../../../redux/reducers/GlobalModalReducer"
import EditGoal from "../EditGoal"
import { formatDate, getMonthName2 } from "../../../utils/DateFormatter"
import Input from "../../../components/inputs"
import { useEffect, useState } from "react"
import { goalFrequency } from "../../../constants/GoalFrequency"
import { getYear } from "date-fns"
import { useMutation } from "react-query"
import { updateUserGoalStatus } from "../../../services/goal"
import { subHours } from 'date-fns'

const Goal = ({ goal, setIsUpdated }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [completed, setCompleted] = useState(goal.completed)

    const updateGoalStatusMutation = useMutation(updateUserGoalStatus,{
        onSuccess:(res)=> console.log(res),
        onError:(err) => console.log(err)
    })

    const handleUpdateUserGoalStatus = () =>{
        setCompleted(!completed)
        updateGoalStatusMutation.mutate({
            completed: !completed,
            id: goal.id
        })
    }

    useEffect(()=>{
        setCompleted(goal.completed)
    }, [goal])
    return (
        <ul className="w-full rounded-md -mb-3" onClick={()=>user.id == goal.userId && dispatch(openModal({component:<EditGoal {...{goal, setIsUpdated}}/>}))}>
            {/* <p className="!text-gray-500 text-sm">20 June, 2023</p> */}
            <li className={`goal-box flex items-center shadow-sm !mb-5 text-base pl-4 !py-6 !border-b-4 shadow-md !rounded-2xl !border-l-8 ${(goal.groupGoalId && !goal.complete) ? '!border-gray-200':
            goal.groupGoalId && completed ? 'border-gray-900':
              completed ?
            goal.groupGoalId && completed ? 'border-[#ba0f30]':
                'shadow-green-800 !border-[#107869]' :
                'shadow-red-800  !border-[#ff2511]'}`}><span className={`ml-6 ${completed ?
                goal.groupGoalId? '!border-gray-800':'text-[#107869]': 'text-[#ff2511]'} text-xl`}>{userGoalCategoryConstant.find(cat => cat.categoryName == goal?.user_goal_category?.name)?.categoryIcon}</span>
                <div className="ml-5 flex-col flex">
                    <span className="">{goal.title}</span>
                    {/* <small className="bg-gray-400 p-1 !w-12 rounded-md flex justify-center text-xs">{capitalizeHeader(goal.frequency)}</small> */}
                    <p className="text-xs">{goal.frequency == goalFrequency.custom ? `${formatDate(goal.startDate)} - ${formatDate(subHours((goal.endDate), 1))}`
                   :goal.frequency == goalFrequency.daily ? formatDate(goal.startDate) : goal.frequency == goalFrequency.monthly ? getMonthName2(goal.startDate):
                   goal.frequency == goalFrequency.yearly ? getYear(goal.startDate): ''
                }</p>
                </div>
                <div className="ml-auto flex flex-col -mt-6" onClick={(e)=> e.stopPropagation()}>
                   <Input onChange={()=> {
                    handleUpdateUserGoalStatus()
                   }} checked={completed} type="checkbox" style="text-gray-700 checked:bg-[#088280]" color='transparent'/>
                   <small className={`px-1 rounded-md ${goal.completed ? 'bg-[#088280]': goal.isExpired ? 'bg-blue-700': 'bg-red-500'} text-[0.5rem] -mt-3 text-white`}>
                   </small>
                </div>
            </li>
        </ul>
    )
}

export default Goal