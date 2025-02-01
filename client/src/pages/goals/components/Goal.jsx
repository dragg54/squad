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
import { reduceStringLength } from "../../../utils/ReduceStringLength"
import { ImBell } from "react-icons/im";
import { IoNotificationsOffSharp } from "react-icons/io5"
import { openPopup } from "../../../redux/reducers/PopUpReducer"
import { createGoalReminder } from "../../../services/goalReminder"

const Goal = ({ goal, setIsUpdated }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [completed, setCompleted] = useState(goal.completed)
    const [hasSentNotification, setHasSentNotification] = useState(goal?.reminder?.length)
    const updateGoalStatusMutation = useMutation(updateUserGoalStatus, {
        onSuccess: (res) => console.log(res),
        onError: (err) => console.log(err)
    })

    const createReminderMutation = useMutation(createGoalReminder, {
        onSuccess:()=>{
            setHasSentNotification(true)
            dispatch(openPopup({message: "Reminder sent"}))
        },
        onError: (err) =>{
            console.log(err.message)
        }
    })
    const handleUpdateUserGoalStatus = () => {
        setCompleted(!completed)
        updateGoalStatusMutation.mutate({
            completed: !completed,
            id: goal.id
        })
    }

    useEffect(() => {
        setCompleted(goal.completed)
    }, [goal])
    return (
        <ul className="w-full rounded-md -mb-3" onClick={() => user.id == goal.userId && dispatch(openModal({ component: <EditGoal {...{ goal, setIsUpdated }} /> }))}>
            {/* <p className="!text-gray-500 text-sm">20 June, 2023</p> */}
            <li className={`goal-box flex items-center shadow-sm !mb-5 text-base md:pl-4 !py-6 !border-b-4 shadow-md !rounded-2xl !border-l-8 ${(goal.groupGoalId && !goal.complete) ? '!border-gray-200' :
                goal.groupGoalId && completed ? 'border-gray-900' :
                    completed ?
                        'shadow-green-800 !border-[#107869]' :
                        goal.isExpired ? '!border-[#41729F]' :
                            'shadow-red-800  !border-[#ff2511]'}`}><span className={`ml-6 ${completed ?
                                goal.groupGoalId ? '!border-gray-800' : 'text-[#107869]' : goal.isExpired ? 'text-[#41729F]' : 'text-[#ff2511]'} text-xl mr-1`}>{userGoalCategoryConstant.find(cat => cat.categoryName == goal?.user_goal_category?.name)?.categoryIcon}</span>
                <div className="ml-2 md:ml-5 flex-col flex">
                    <span className="">{reduceStringLength(goal?.title, 24, 60)}</span>
                    {/* <small className="bg-gray-400 p-1 !w-12 rounded-md flex justify-center text-xs">{capitalizeHeader(goal.frequency)}</small> */}
                    <p className="text-xs">{goal.frequency == goalFrequency.custom ? `${formatDate(goal.startDate)} - ${formatDate(subHours((goal.endDate), 1))}`
                        : goal.frequency == goalFrequency.daily ? formatDate(goal.startDate) : goal.frequency == goalFrequency.monthly ? getMonthName2(goal.startDate) :
                            goal.frequency == goalFrequency.yearly ? getYear(goal.startDate) : ''
                    }</p>
                </div>
                {goal.userId == user.id ? <div className={`ml-auto flex flex-col -mt-6 `} onClick={(e) => e.stopPropagation()}>
                    <Input onChange={() => {
                        handleUpdateUserGoalStatus()
                    }} checked={completed} type="checkbox" style="text-gray-700 checked:bg-[#088280]" color='transparent' />
                    <small className={`px-1 rounded-md ${goal.completed ? 'bg-[#088280]' : goal.isExpired ? 'bg-[#41729F]' : 'bg-red-500'} text-[0.5rem] -mt-3 text-white`}>
                    </small>
                </div> : !goal.isExpired && goal.userId != user.id && !goal.completed ?
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                            setHasSentNotification(true)
                            !hasSentNotification && createReminderMutation.mutate({goalId: goal.id})
                        }}
                        className="ml-auto hover:bg-orange-700  flex items-center justify-center bg-[#ff2511] text-white shadow-sm shadow-gray-400 p-2 rounded-full">
                        {!hasSentNotification ? <ImBell className="" /> : <IoNotificationsOffSharp />
                        }</div> : <p className="ml-auto text-[#41729F]">Exp</p>}
            </li>
        </ul>
    )
}

export default Goal