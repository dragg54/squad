import { useQuery } from 'react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUserMonthlyGoals } from '../../../services/goal';
import { format, parse } from 'date-fns';
import Skeleton from './Skeleton';

const ProgressChart = () => {
  const { data: monthlyGoals, isLoading: monthlyGoalsLoading } = useQuery('monthlyGoals', {
    queryFn: getUserMonthlyGoals
  })


  let processedData = []

  if (!monthlyGoalsLoading) {
    processedData = monthlyGoals.map((goal) => {
      const monthName = format(parse(goal.month, "MM", new Date()), "MMM");
      return {
        ...goal,
        month: monthName,
        completedGoals: parseInt(goal.completedGoals, 5),
        uncompletedGoals: parseInt(goal.uncompletedGoals, 5) || (!goal.completedGoals && 0.2),
      };
    });
  }


  return (
    <div className='mt-10 border border-gray-300 rounded-md shadow-sm flex mx-auto justify-center text-xs pt-2 h-[450px]' style={{ width: '100%', height: 320 }}>
      {
        monthlyGoalsLoading ?
          <Skeleton />
          :
          <ResponsiveContainer>
            <BarChart
              data={processedData}
              margin={{ top: 15, bottom: 0, right: 12, left: -18}}
              padding={{top:3}}
            >
              <XAxis dataKey="month" />
              <YAxis domain={[0, 6]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completedGoals" stackId="a" fill="#7e1e80" name="Completed" />
              <Bar dataKey="uncompletedGoals" stackId="a" fill="#b175ff" name="Uncompleted " />
              <text x={200} y={12} fill="gray" textAnchor="middle" dominantBaseline="central">
                <tspan fontSize="12" fontWeight={600}>Achievement Progress</tspan>
              </text>
            </BarChart>
          </ResponsiveContainer>
      }
    </div>
  );
};

export default ProgressChart;
