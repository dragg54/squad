import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#d84c4c'];


const MonthlyProgressDonut = () => {
    const chartData = [
        { name: 'Total Goals', value: 5 },
        { name: 'Completed Goals', value: 3 },
        { name: 'Uncompleted Goals', value: 2 },
      ];
  return (
    <div className="flex flex-col justify-center items-center  mt-20 px-3">
            <h2 className="text-2xl text-gray-500 font-bold ">{'January Goals Overview'}</h2>
    <PieChart width={600} height={400}>
      <Pie
        data={chartData}
        cx="50%"
        cy="50%"
        innerRadius={75}
        outerRadius={140}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell fontSize={'5px'} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>  )
}

export default MonthlyProgressDonut