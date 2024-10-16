import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import { useNavigate, Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await signin(email, password);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl mb-6">Sign In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <InputField 
          label="Email" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />
        <InputField 
          label="Password" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4">
          Sign In
        </button>
        <p className="text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;