/* eslint-disable react/prop-types */
import { getMonthIndex } from "../../utils/Months"
import MonthCard from "./components/MonthCard"
import MonthlyGoalCard from "./MonthlyGoalCard"

const MonthlyGoals = ({allMonths, openMonthGoalsContainer, setOpenMonthGoalsContainer, data, presentTab}) => {
  return (
    <div className='w-full h-auto flex flex-col gap-3 mb-16 overflow-visible'>
        { 
            presentTab == "monthlyGoals" && allMonths?.map((month, index)=>(
              <div className="w-full" key={index}>
                <MonthCard {...{openMonthGoalsContainer, setOpenMonthGoalsContainer}}  {...{month}}/>
                {Object.values(openMonthGoalsContainer.find(mnth => Object.keys(mnth)[0] == month))[0] 
                && < MonthlyGoalCard key={index} {...{goals: data && data[getMonthIndex(month)]}}/>} 
              </div>
            ))
        }
    </div>
  )
}

export default MonthlyGoals