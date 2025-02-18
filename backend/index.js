import express, { response } from "express";
import { UserModel,FlashcardModel } from "./db/db.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import { JWT_SECRET } from "./config.js";
import { UserMiddleware } from "./middleware/middleware.js";
import dotenv from 'dotenv';
dotenv.config(); 
const app=express();
app.use(express.json())
app.use(cors())



app.post('/api/v1/signup', async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    
    try {
        await UserModel.create({
            username: username,
            email:email,
            password: password
        }) 

        res.json({
            message: "User signed up"
        })
    } catch(e) {
        res.status(409).json({
            message: "User already exists"
        })
    }
   
})

app.post('/api/v1/signin',async(req,res)=>{
    const email = req.body.email;
    const password=req.body.password;

    const existing_user= await UserModel.findOne({
        email,
        password
    })

    if(existing_user){
        const token=jwt.sign({
            id:existing_user._id
        },process.env.JWT_SECRET)

        res.json({
            token
        })
    } else{
        res.status(401).json({
            msg:"Invalid credentials"
        })
    }
})

app.post('/api/v1/flashcards',UserMiddleware, async(req,res)=>{
    const { no, question, answer } = req.body;
    const parsedBox = parseInt(no); 
    if (isNaN(parsedBox)) {
      return res.status(400).json({ message: 'Invalid box value' });
    }
    try{

    const flashcard = await FlashcardModel.create({
      box: parsedBox,
      question,
      answer,
      userId: req.userId
    });
        await flashcard.save();
        res.status(201).json(flashcard);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

app.get('/api/v1/user',UserMiddleware,async(req,res)=>{
  const userId = req.userId
    
    try {
        const user = await UserModel.find({
            _id:userId
        });
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

app.get('/api/v1/flashcards',UserMiddleware, async(req,res)=>{
    const userId = req.userId
    
    try {
        const flashcards = await FlashcardModel.find({
            userId:userId
        });
        res.status(200).json(flashcards);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    
})

app.put('/api/v1/flashcards/:id',UserMiddleware, async(req,res)=>{
    try {
        const { id } = req.params;
       
        const { userAnswer } = req.body;
        const flashcard = await FlashcardModel.findById(id);
       
     
    
        if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
    
        
        const isCorrect = flashcard.answer.trim().toLowerCase() === userAnswer.trim().toLowerCase();
        
        
        if (isCorrect) {
          flashcard.box = flashcard.box + 1
        } else {
          flashcard.box = 1; 
          return res.status(200).json({
            msg:"Incorrect answer"
          })
        }
    
        await flashcard.save();
        res.status(200).json({ flashcard, isCorrect });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})

app.delete('/api/v1/flashcards/:id', UserMiddleware, async(req,res)=>{
    try {
        const { id } = req.params;
        const flashcard = await FlashcardModel.findByIdAndDelete(id);
    
        if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
    
        res.status(200).json({ message: 'Flashcard deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
})



app.listen(process.env.PORT)