import { BarChart, Bar, XAxis, YAxis, LabelList,Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProgressChart = () => {
  const data = [
    { name: 'Jan', progress: 65 },
    { name: 'Feb', progress: 59 },
    { name: 'Mar', progress: 80 },
    { name: 'Apr', progress: 81 },
    { name: 'May', progress: 56 },
  ];

  const colors = ['#3182ce', '#9f7aea', '#4fd1c5', '#f6ad55', '#63b3ed'];

  return (
    <div className='mt-10 border border-gray-200 flex mx-auto justify-center text-xs p h-[400px]' style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 15,  bottom: 0, right: 6, left:-12}}
        >
          {/* <CartesianGrid strokeDasharray="" /> */}
          <XAxis  dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="progress" fill='white'>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        <LabelList dataKey="sales" position="bottom" fill='blue' margin={1}/>
          </Bar>  
          <text x={200} y={18} fill="gray" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="12">Achievement Progress</tspan>
          </text>     
          </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
