import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const FlashcardForm = ({ onAddFlashcard, setAnswer, answer, isDarkMode }) => {
  const [question, setQuestion] = useState("");
  const [no, setNumber] = useState(Number);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question && answer && no) {
      onAddFlashcard(question, answer, no);
      setQuestion("");
      setAnswer("");
      setNumber(parseInt(no) + 1);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className={`mb-6 p-6 rounded-lg shadow-lg ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-5">
        <div className="mb-4">
          <label htmlFor="number" className={`block mb-2 font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            No:
          </label>
          <motion.input
            type="text"
            id="number"
            value={no}
            onChange={(e) => setNumber(e.target.value)}
            className={`w-16 px-3 py-2 rounded border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            }`}
            whileFocus={{ scale: 1.02 }}
            required
          />
        </div>

        <div className="mb-4 flex-1">
          <label htmlFor="question" className={`block mb-2 font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Question:
          </label>
          <motion.input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={`w-full px-4 py-2 rounded border ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            }`}
            whileFocus={{ scale: 1.02 }}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="answer" className={`block mb-2 font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Answer:
        </label>
        <motion.input
          type="text"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={`w-full px-4 py-2 rounded border ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
              : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
          }`}
          whileFocus={{ scale: 1.02 }}
          required
        />
      </div>

      <motion.button
        type="submit"
        className={`px-6 py-2 rounded font-medium ${
          isDarkMode 
            ? 'bg-blue-600 hover:bg-blue-700' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Add Flashcard
      </motion.button>
    </motion.form>
  );
};

export default FlashcardForm;