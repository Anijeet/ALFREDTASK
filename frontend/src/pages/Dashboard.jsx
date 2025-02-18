import React from "react"
import { useState, useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { BACKEND_URL } from "../config"
import FlashcardList from "../components/FlashcardList"
import FlashcardForm from "../components/FlashcardForm"
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([])
    const [dueFlashcards, setDueFlashcards] = useState([])
    const [correct, setCorrect] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [username,setUsername]=useState('')

    useEffect(() => {
        loadFlashcards()
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, [])

   
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        document.body.className = isDarkMode ? 'bg-gray-900' : 'bg-white';
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const user = async() =>{
      const response = await axios.get(`${BACKEND_URL}/api/v1/user`, {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    });
    setUsername(response.data[0].username)
    }

    user()

    const loadFlashcards = async () => {
        const cards = await axios.get(`${BACKEND_URL}/api/v1/flashcards`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })

        setFlashcards(cards.data)
        updateDueFlashcards(cards.data)
    }

    const updateDueFlashcards = (cards) => {
        const now = new Date()
        const due = cards.filter((card) => new Date(card.nextReview) <= now)
        setDueFlashcards(due)
    }

    const handleAddFlashcard = async (question, answer, no) => {
        const newCard = await axios.post(`${BACKEND_URL}/api/v1/flashcards`,
            {
                question,
                answer,
                no
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
        loadFlashcards()
        setFlashcards([...flashcards, newCard])
        updateDueFlashcards([...flashcards, newCard])
    }

    const handleUpdateFlashcard = async (id, username) => {
        const updatedCard = await axios.put(`${BACKEND_URL}/api/v1/flashcards/${id}`,
            {
                userAnswer: username
            },
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        )

        if (updatedCard.data.msg === "Incorrect answer") {
            setCorrect("Incorrect answer")
            toast.error("Wrong Answer", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: isDarkMode ? "dark" : "light"
            });
        }else{
          toast.success("Right Answer", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? "dark" : "light"
        });
        }
        const updatedFlashcards = flashcards.map((card) => (card._id === updatedCard._id ? updatedCard : card))
        setFlashcards(updatedFlashcards)
        updateDueFlashcards(updatedFlashcards)
    }

    const handleDeleteFlashcard = async (id) => {
        const deleteCard = await axios.delete(`${BACKEND_URL}/api/v1/flashcards/${id}`,
            {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
        )
        loadFlashcards()
        toast.success("Deleted Card", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: isDarkMode ? "dark" : "light"
        })
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
        }`}>
          <div className="p-5 text-2xl capitalize font-serif">Hello, {username} </div>
            <div className="container mx-auto p-4">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleTheme}
                    className={`fixed top-4 right-4 p-2 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                    {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </motion.button>

                <p className={`mb-4 fixed right-20 text-lg font-mono top-5 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                    {dueFlashcards.length} flashcards due today.
                </p>

                <FlashcardForm
                   
                    onAddFlashcard={handleAddFlashcard}
                    isDarkMode={isDarkMode}
                />

                <FlashcardList
                    
                    flashcards={dueFlashcards}
                    onUpdateFlashcard={handleUpdateFlashcard}
                    onDeleteFlashcard={handleDeleteFlashcard}
                    isDarkMode={isDarkMode}
                />

                <ToastContainer />
            </div>
        </div>
    )
}

export default Dashboard