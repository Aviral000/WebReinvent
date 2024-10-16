import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard, {user?.email}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
