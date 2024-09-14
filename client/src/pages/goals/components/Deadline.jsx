/* eslint-disable react/prop-types */
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '../../../components/buttons';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../redux/reducers/GlobalModalReducer';
import EditGoal from '../EditGoal';
import { useState } from 'react';
import { format } from 'date-fns';


const Deadline = ({ goal, setDate, date, setIsUpdated }) => {
    const dispatch = useDispatch()
    const [localDate, setLocalDate] = useState(new Date())
    const handleDateChange = (newDate) => {
        const formattedDate = format(newDate, 'yyyy-MM-dd');
        setDate(formattedDate);
        setLocalDate(formattedDate);
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='w-[400px] shadow-md shadow-gray-400 rounded-md mx-auto bg-white flex-col p-6'>
            <div className='flex justify-between items-center'><h1 className='text-xl font-extrabold'>Deadline</h1><span>
                <Button
                    name='Done'
                    onClick={() => {
                        dispatch(closeModal())
                        dispatch(openModal(<EditGoal {...{ goal, localDate, setIsUpdated }} />))
                    }}
                    style='!bg-white !text-purple-500 border !border-purple-500' /></span></div>
            <div className='w-full mt-6 flex justify-center'>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                />
            </div>
        </div>
    )
}

export default Deadline