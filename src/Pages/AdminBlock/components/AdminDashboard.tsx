import React, { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import axios from "axios"

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Last Week Summary',
      },
    },
  };
  
  const labels = ['Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat', 'Sun'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Orders Placed',
        data:[20, 5, 40, 50, 30, 10],
        
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Users registerd',
        data:[10, 5, 50, 40, 50, 20],
        
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  

const AdminDashboard = () => {

const getorders =async ()=>{
  try{
    const resp = await axios.get(`http://192.168.0.149:4000/orders`)
    console.log(resp.status)
    console.log(resp.data)
  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getorders()
},[])



  return (
    <div className='chart-container'>
        <Line options={options} data={data} />;
    </div>
  )
}

export default AdminDashboard