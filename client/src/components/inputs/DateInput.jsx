/* eslint-disable react/prop-types */
import { LuCalendarDays } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import {  openModal } from '../../redux/reducers/GlobalModalReducer';
import CalendarCont from '../containers/CalendarCont';
import { formatDate2 } from "../../utils/DateFormatter";


const DateInput = ({ style, date, data, name, onDateChange, done, readOnly}) => {
    const formattedDate = (formatDate2(date))
    const dispatch = useDispatch()
    return (
        <div className={`rounded-md border p-2 flex justify-start gap-3 items-center text-gray-400` + style} onClick={()=>{
            !readOnly && dispatch(openModal({component: <CalendarCont />, props: {name, currentDate: data[name], setDate: {onDateChange}, done, date }}))
        }}>
           <LuCalendarDays className="text-inherit"/>
           <p className='!text-gray-400'>{formattedDate}</p>
        </div>
    )
}

export default DateInput