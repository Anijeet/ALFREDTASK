import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response= await axios.post(BACKEND_URL + "/api/v1/signin",{
        email: email,
        password: password
    })
    const jwt=response.data.token
    localStorage.setItem("token",jwt)
    navigate('/dashboard')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative"
      >
        
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span onClick={()=>{navigate('/')}}>Back</span>
        </motion.button>

        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
        </motion.div>

       
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              required
            />
          </motion.div>

          
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors"
              required
            />
          </motion.div>

          {/* Forgot Password Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-right"
          >
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
              Forgot your password?
            </a>
          </motion.div>

          
          <motion.button
            type="submit"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                     hover:bg-indigo-700 transform hover:scale-105 transition-all
                     shadow-lg hover:shadow-xl"
          >
            Sign In
          </motion.button>

         
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-600 mt-4"
          >
            Don't have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Sign up
            </a>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInPage;