/* eslint-disable react/prop-types */
import Goal from './components/Goal'
const MonthlyGoalCard = ({ goals }) => {
  return (
    <>
      {
        goals && goals.length > 0 && goals.map((goal, index) => (
          <Goal {...{goal}} key={index}/>
        ))
      }
    </>
  )
}

export default MonthlyGoalCard