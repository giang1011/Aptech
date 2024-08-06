import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import axios from 'axios';
import loginimg from '../../assets/Web/loginimg.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username,
        password
      });
      setMessage(response.data.message);
      setError('');
    } catch (error) {
      setMessage('');
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div 
      className='flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat'  
      style={{ backgroundImage: `url(${loginimg})` }}
    >
      <form 
        className='bg-white bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full space-y-6'  
        data-aos="fade-up" 
        data-aos-once="true" 
        data-aos-delay="300"
        onSubmit={handleSubmit}
      >
        <h1 className='text-4xl text-center font-bold text-primary'>Login</h1>
        
        <div className='relative'>
          <input 
            type='text' 
            placeholder='Username' 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-gray-100'
          />
          <FaUser className='absolute top-2 right-3 text-gray-400' />
        </div>

        <div className='relative'>
          <input 
            type='password' 
            placeholder='Password' 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:bg-gray-100'
          />
          <FaLock className='absolute top-2 right-3 text-gray-400' />
        </div>

        <button 
          type='submit' 
          className='w-full bg-primary text-white py-2 rounded-full hover:bg-primary-dark transition duration-300'>
          Login
        </button>

        {error && <p className='text-red-500 text-center'>{error}</p>}
        {message && <p className='text-green-500 text-center'>{message}</p>}

        <div className='text-center'>
          <p>Don't have an account? <a href="/register" className='text-primary hover:underline'>Register</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;
