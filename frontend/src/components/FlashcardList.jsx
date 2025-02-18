import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FlashcardList = ({ flashcards, onUpdateFlashcard, onDeleteFlashcard, isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const answer=localStorage.getItem('answer')

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1 ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (flashcards.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-4"
      >
        No flashcards available
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Flashcard
          isDarkMode={isDarkMode}
            flashcard={flashcards[currentIndex]}
            onUpdate={(id, username) => {
              onUpdateFlashcard(id, username);
              handleNext();
            }}
            onDelete={onDeleteFlashcard}
          />
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className="flex justify-between items-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-gray-600">
          Question {currentIndex + 1} of {flashcards.length}
        </span>
      </motion.div>
    </motion.div>
  );
};

const Flashcard = ({ flashcard, onUpdate, onDelete, isDarkMode }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [username, setUsername] = useState("");

  const handleShowAnswer = () => setShowAnswer(true);
  
  const handleGotItRight = () => {
    onUpdate(flashcard._id, username);
    setShowAnswer(false);
    setUsername("");
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className={` shadow-md rounded-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
    >
      <motion.h2 
        className="text-xl font-semibold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {flashcard.question}
      </motion.h2>
      
      <AnimatePresence mode="wait">
        {showAnswer ? (
          <motion.div
            key="answer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mb-4">{flashcard.answer}</p>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowAnswer(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Write answer
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`p-2 rounded pr-20 border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-400'}`}
              type="text"
              placeholder="write answer"
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            />
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="bg-blue-500 ml-2 text-white px-4 py-2 rounded mr-4"
              onClick={handleGotItRight}
            >
              Submit
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={handleShowAnswer}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Show Answer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => onDelete(flashcard._id)}
        className="mt-4 text-red-500"
      >
        Delete
      </motion.button>
    </motion.div>
  );
};

export default FlashcardList;