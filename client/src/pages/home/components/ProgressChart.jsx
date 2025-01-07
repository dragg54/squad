import { useQuery } from 'react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
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
        uncompletedGoals: parseInt(goal.uncompletedGoals, 5) || 0.2,
      };
    });
  }


  return (
    <div className='mt-10 border border-gray-200 flex mx-auto justify-center text-xs p h-[400px]' style={{ width: '100%', height: 300 }}>
      {
        monthlyGoalsLoading ?
          <Skeleton />
          :
          <ResponsiveContainer>
            <BarChart
              data={processedData}
              margin={{ top: 15, bottom: 0, right: 6, left: -12 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completedGoals" stackId="a" fill="#7e1e80" name="Completed Goals" />
              <Bar dataKey="uncompletedGoals" stackId="a" fill="#b175ff" name="Uncompleted Goals" />
              <text x={200} y={18} fill="gray" textAnchor="middle" dominantBaseline="central">
                <tspan fontSize="12">Achievement Progress</tspan>
              </text>
            </BarChart>
          </ResponsiveContainer>
      }
    </div>
  );
};

export default ProgressChart;
