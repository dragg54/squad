/* eslint-disable react/prop-types */

import { IoNotificationsSharp } from "react-icons/io5";
import Button from "../../components/buttons";
import Slider from "../../components/slider";
import { useEffect, useRef, useState } from "react";
import { MdOutlineAccessTime } from "react-icons/md";
import { determineScreenSize } from "../../utils/DetermineScreenSize";
import { reduceStringLength } from "../../utils/ReduceStringLength";
import { useMutation } from "react-query";
import { updateGoalReminderStatus } from "../../services/goalReminder";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/reducers/GlobalModalReducer";


const GoalReminderNotificationSlider = ({reminders}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const goalReminderStatusMutation = useMutation(updateGoalReminderStatus, {
        onSuccess: (res) => console.log(res.data),
        onError: (res) => console.log(res.data)
    })
    
    useEffect(()=>{
        goalReminderStatusMutation.mutate({id: reminders[0]?.id})
    },[])
    const dispatch = useDispatch()
    const sliderRef = useRef(null)
    return (
        <div className="px-4 py-6 bg-white rounded-md shadow-md shadow-gray-400" onClick={(e) => e.stopPropagation()} >
            <Slider
                imgs={reminders.map(reminder => (<GoalReminderNotification key={reminder.id} reminder={reminder}/>))}
                autoplay={false}
                width={determineScreenSize().isDesktop ? 360 : 300}
                height={determineScreenSize().isDesktop ? 400: 420}
                isImage={false}
                sliderRef={sliderRef}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                styles={{ background: '#fff' }}
            />
             <div className="flex  w-full justify-between items-center">
                <Button onClick={()=> dispatch(closeModal)} style={'!rounded-full !bg-white !text-gray-500 !border !border-gray-400'} name={'Dismiss'} />
                <div className="flex gap-2">
                <Button buttonDisabled={activeIndex == 0} onClick={()=> sliderRef.current?.slidePrev()} style={'!rounded-full'} name={'Prev'} />
                <Button onClick={()=> {
                    sliderRef.current?.slideNext()
                    goalReminderStatusMutation.mutate({id: reminders[activeIndex + 1]?.id})
                }} style={'!rounded-full'} name={'Next'} />
                </div>
            </div>
       
        </div>
    )
}

const GoalReminderNotification = ({reminder}) => {
   
    return (
        <div className="flex flex-col items-center  ">
            <div>
                <IoNotificationsSharp className="text-[7rem] text-yellow-600" />
            </div>
            <div className="mt-4">
                <p><span className="font-semibold">@{reminder?.partner?.userName}</span> sent you a reminder on one of your pending goals.</p>
            </div>
            <div className="w-full h-28  bg-gray-100 mt-4 text-xl p-2 text-gray-600 font-bold">
                {reduceStringLength(reminder.userGoal?.title, 50, 70)}
            </div>
            <div className="mt-2 self-start">
                <p className="text-gray-500 text-sm flex gap-1 items-center"><MdOutlineAccessTime /> Deadline: 20th January, 2025</p>
                <p className="text-red-600 font-semibold text-xs">(20 days left)</p>
            </div>
            </div>
    )
}


export default GoalReminderNotificationSlider