import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); 

const conn = async () => {
    console.log(process.env.MONGODB_URL);
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

conn();

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const FlashcardSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    box: { type: Number, required: true }, 
    nextReview: { type: Date, default: Date.now },
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const UserModel = mongoose.model("User", UserSchema);
export const FlashcardModel = mongoose.model("Flashcard", FlashcardSchema);
