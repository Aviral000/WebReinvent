import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate('/signup');
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <Link to="/dashboard" className="text-white text-lg">Dashboard</Link>
      {user && (
        <button onClick={handleLogout} className="text-white">Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
