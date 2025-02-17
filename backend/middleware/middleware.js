import jwt, { decode } from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js';
import dotenv from 'dotenv';
dotenv.config(); 


export const UserMiddleware=(req,res,next)=>{
    const header=req.headers["authorization"];
    const decoded =jwt.verify(header ,process.env.JWT_SECRET);

    try {
        if(decoded){
            req.userId=decoded.id
            next()
        }else{
            res.status(403).json({message:"You are not logged in"})
        }
        
    } catch (error) {
        res.json({message:"Middlware problem"})
        
    }
 
} 