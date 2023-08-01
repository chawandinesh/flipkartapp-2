// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { startOfWeek, addDays, format } from 'date-fns';

// const LineChart = ({ data}) => {
//   const currentWeekDates = [...Array(7)].map((_, index) => {
//     const date = addDays(startOfWeek(new Date()), index);
//     return format(date, 'EEE'); // Get the day abbreviation (e.g., Mon, Tue, etc.)
//   });

//   const chartData = {
//     labels: currentWeekDates,
//     datasets: [
//       {
//         label: 'Orders',
//         data: data,
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return <Line data={chartData} options={options} />;
// };

// export default LineChart;
