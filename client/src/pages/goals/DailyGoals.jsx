/* eslint-disable react/prop-types */
import DailyGoal from './components/DailyGoal'

const DailyGoals = ({goals}) => {
  return (
    <div className='w-full'>
      {
        goals && Object.entries(goals).map((goal, index) =>(
          <DailyGoal goal={goal} key={index}/>
        ))
      }
    </div>
  )
}

export default DailyGoals