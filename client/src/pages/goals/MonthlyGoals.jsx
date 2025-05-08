/* eslint-disable react/prop-types */
import { useQuery } from "react-query";
import { getMonthIndex, getMonthName } from "../../utils/DateFormatter"
import MonthCard from "./components/MonthCard"
import MonthlyGoalCard from "./MonthlyGoalCard"
import { getUserMonthlyGoals } from "../../services/goal";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";

const MonthlyGoals = ({allMonths, openMonthGoalsContainer, setOpenMonthGoalsContainer, data, presentTab}) => {
  const user = useSelector(state => state.user)
   const { data: goalData, isLoading: dataIsLoading } = useQuery(
      ['monthGoalsProgress', {
        squadId: 3, userId: user.id, 
      }],
      getUserMonthlyGoals,
      // {
      //   keepPreviousData: true, 
      // }
    );
  return (
    <div className='w-full h-auto flex flex-col gap-3 mb-16 overflow-visible'>
        { 
            presentTab == "monthlyGoals" && dataIsLoading ? 
            
            <LoadingSpinner style={'!-mt-40'} isLoading={dataIsLoading}/>:
           
            goalData?.map((monthlyGoal, index)=>(
              <div className="w-full" key={index}>
                <MonthCard {...{openMonthGoalsContainer, setOpenMonthGoalsContainer}}  {...{monthlyGoal, month: monthlyGoal.monthName}}/>
                {Object.values(openMonthGoalsContainer.find(mnth => Object.keys(mnth)[0] ==  monthlyGoal.monthName))[0] 
                && < MonthlyGoalCard key={index} {...{goals: data && data[getMonthIndex(monthlyGoal.monthName)]}}/>} 
              </div>
            ))
        }
    </div>
  )
}

export default MonthlyGoals