import React from 'react';
import { AdminHeader } from './components/AdminHeder';
import LineChart from './components/Linechart';
import AdminDashboard from './components/adminDashboard';

const Adminpage = () => {
  

  return (
    <div>
      <AdminHeader />
      <AdminDashboard/>
      
    </div>
  );
};

export default Adminpage;
