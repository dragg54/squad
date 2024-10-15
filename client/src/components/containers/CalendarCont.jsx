/* eslint-disable react/prop-types */
import Calendar from 'react-calendar'
import { FiCalendar } from "react-icons/fi";
import Button from '../buttons';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CalendarCont = () => {
    const globalModal = useSelector(state => state.globalModal)
    console.log(globalModal.content.props)
    const {currentDate, done, data, name, setDate, date } = globalModal.content.props
    const [newDate, setNewDate ] = useState()
    const handleChange = (dt) =>{
        setNewDate(dt)
    }
    console.log(newDate)
    return (
        <div onClick={(e)=> e.stopPropagation()} className='w-[95%] rounded-sm md:w-[400px] p-8 gap-4 flex-col h-[500px] flex items-center justify-center bg-white'>
            <h1 className='self-start font-bold text-xl inline-flex items-center gap-3'>Select Date <FiCalendar /></h1>
            <Calendar value={date} onChange={handleChange}/>
            <Button style="!self-start !bg-purple-500" name="Done" onClick={()=>{
                done(newDate)
            }}/>
        </div>
    )
}

export default CalendarCont