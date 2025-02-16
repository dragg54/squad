/* eslint-disable react/prop-types */
import { format } from "date-fns";
import Goal from "./Goal";

const DailyGoal = ({goal}) => {
  return (
    <div className="w-full mb-10">
       <p className="font-semibold">
        {format(new Date(goal[0]), 'dd MMMM, yyyy')}
       </p>
        <div className="">
        {goal[1].map((gl , index)=>(
            <Goal key={index} goal={gl}/>
        ))}
        </div>
    </div>
  )
}

export default DailyGoal