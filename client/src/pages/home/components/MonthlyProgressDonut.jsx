import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUserMonthlyGoals } from '../../../services/goal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {  useSearchParams } from 'react-router-dom';
import { getMonthName } from '../../../utils/DateFormatter';
import { addToLocalStorage, removeFromLocalStorage } from '../../../utils/LocalStorage';
import { useEffect } from 'react';

const COLORS = ['#8884d8', '#82ca9d', '#d84c4c'];


const MonthlyProgressDonut = () => {
  const user = useSelector(state => state.user)
  const [searchParams] = useSearchParams();
  const pageHasBeenView = searchParams.get('seen')
  const month = searchParams.get('month');
  const { data: goalData, isLoading: dataIsLoading } = useQuery(
    ['monthGoalsProgress', {
      squadId: 3, userId: user.id, month: '01'
    }],
    getUserMonthlyGoals,
    // {
    //   keepPreviousData: true, 
    // }
  );

  useEffect(()=>{
    console.log(pageHasBeenView)
    if(pageHasBeenView){
      removeFromLocalStorage('monthlyProgress')
    }
    else{
      addToLocalStorage('monthlyProgress', window.location.href)
    }
  },[])

  if (dataIsLoading) {
    return <LoadingSpinner isLoading={dataIsLoading} />
  }
  const chartData = [
    { name: 'Completed', value: goalData && goalData.length && +goalData[0].completedGoals },
    { name: 'Uncompleted', value: goalData && goalData.length  && +goalData[0].uncompletedGoals },
  ];
  const renderCustomLabel = ({ percent, value }) => {
    return `${value} ${value > 1 ? 'goals': 'goal'}: ${(percent * 100).toFixed(0)}%`;
  };
  return (
    <div className="flex flex-col w-full h-screen justify-start items-center  mt-20 px-3">
      <h2 className="text-2xl text-gray-500 font-bold ">{getMonthName(month - 1)} Progress Overview</h2>
      <ResponsiveContainer width="80%" height="60%">
      <PieChart width={800} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          label = {renderCustomLabel}
          innerRadius={70}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell fontSize={'12px'} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </ResponsiveContainer>
    </div>)
}

export default MonthlyProgressDonut