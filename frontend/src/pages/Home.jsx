import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightCircle, Brain, BookOpen, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-indigo-900' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    } flex flex-col items-center justify-center p-4`}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-indigo-100 text-indigo-600'
        }`}
      >
        {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </motion.button>

      <div className="max-w-4xl w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Brain className={`w-20 h-20 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
        </motion.div>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-4xl md:text-6xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}
        >
          Master Your Memory
        </motion.h1>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-xl md:text-2xl ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          } max-w-2xl mx-auto`}
        >
          Boost your learning with our smart flashcard system powered by the Leitner method
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col md:flex-row justify-center gap-8 mt-8"
        >
          <div className={`flex items-center gap-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <BookOpen className={`w-6 h-6 ${
              isDarkMode ? 'text-indigo-400' : 'text-indigo-500'
            }`} />
            <span>Smart Spacing</span>
          </div>
          <div className={`flex items-center gap-2 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <ArrowRightCircle className={`w-6 h-6 ${
              isDarkMode ? 'text-indigo-400' : 'text-indigo-500'
            }`} />
            <span>Track Progress</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signup')}
            className={`px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl
              ${isDarkMode 
                ? 'bg-indigo-500 text-white hover:bg-indigo-400' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
          >
            Sign Up
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/signin')}
            className={`px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl
              ${isDarkMode 
                ? 'bg-gray-800 text-indigo-400 border-2 border-indigo-400 hover:bg-gray-700' 
                : 'bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50'
              }`}
          >
            Sign In
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-20 rounded-lg shadow-lg ${
              isDarkMode 
                ? 'bg-gray-800 opacity-30' 
                : 'bg-white opacity-20'
            }`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;