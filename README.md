## BACKEND
🚀 Features
1.User Authentication

Signup: Register a new user.
 Signin: Authenticate user and receive a JWT token.


2. Flashcard Management

Create Flashcard: Create a new flashcard.
Retrieve Flashcards: Get all flashcards for the authenticated user.
Update Flashcard: Update flashcard status based on user answer.
Delete Flashcard: Remove a flashcard.

🛠️ Tech Stack
Node.js: Runtime environment
Express.js: Web framework for building APIs
MongoDB: NoSQL database for storing users and flashcards
JWT (jsonwebtoken): For authentication and authorization
dotenv: For environment variable management
CORS: For Cross-Origin Resource Sharing

⚙️ Installation
Clone the repository
git clone <repository-url>
cd flashcard-app-backend
Install dependencies

npm install
Environment Setup
Create a .env file at the root of the project and configure the following variables:
PORT=3000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret>


🚀 Getting Started
Start the development server:
node index.js
The server will run at http://localhost:3000.

📌 API Endpoints
1. User Authentication
POST /api/v1/signup

Register a new user
Request Body:
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "examplePassword"
}
Response:

{
  "message": "User signed up"
}
Error:

{
  "message": "User already exists"
}
POST /api/v1/signin

Sign in user and get a JWT token
Request Body:

{
  "email": "user@example.com",
  "password": "examplePassword"
}
Response:

{
  "token": "<JWT Token>"
}
Error:

{
  "msg": "Invalid credentials"
}
2. Flashcard Management
All flashcard routes require Authorization using the JWT token received during signin. Include the token in the request header as:

makefile

Authorization: <JWT Token>
POST /api/v1/flashcards

Create a new flashcard
Request Body:

{
  "no": 1,
  "question": "What is Node.js?",
  "answer": "JavaScript runtime built on Chrome's V8 engine"
}
Response:

{
  "box": 1,
  "question": "What is Node.js?",
  "answer": "JavaScript runtime built on Chrome's V8 engine",
  "userId": "<User ID>"
}
GET /api/v1/flashcards

Retrieve all flashcards for the authenticated user
Response:

[
  {
    "_id": "<Flashcard ID>",
    "box": 1,
    "question": "What is Node.js?",
    "answer": "JavaScript runtime built on Chrome's V8 engine",
    "userId": "<User ID>"
  }
]
PUT /api/v1/flashcards/:id

Update a flashcard's box status based on user answer
Request Body:

{
  "userAnswer": "JavaScript runtime built on Chrome's V8 engine"
}
Response (Correct Answer):

{
  "flashcard": {
    "_id": "<Flashcard ID>",
    "box": 2,
    "question": "What is Node.js?",
    "answer": "JavaScript runtime built on Chrome's V8 engine",
    "userId": "<User ID>"
  },
  "isCorrect": true
}
Response (Incorrect Answer):

{
  "msg": "Incorrect answer"
}
DELETE /api/v1/flashcards/:id

Delete a flashcard by its ID
Response:

{
  "message": "Flashcard deleted"
}
🔒 Middlewares
UserMiddleware: Validates the JWT token for protected routes.
Located in ./middleware/middleware.js
🔄 Error Handling
Proper status codes and messages are returned for different scenarios, including:

User already exists (409 Conflict)
Invalid credentials (401 Unauthorized)
Flashcard not found (404 Not Found)
Internal server errors (500 Internal Server Error)
📁 Project Structure
arduino

flashcard-app-backend
│   index.js         // Entry point of the application
│   config.js        // Configuration file for environment variables
│   .env             // Environment variables
│   package.json     // Dependencies and scripts
└───db
│   └── db.js        // MongoDB connection and schema models
└───middleware
│   └── middleware.js // Authentication middleware for JWT validation

🔒 Security Considerations
Passwords are stored in plaintext, which is not secure. It is recommended to use bcrypt for hashing passwords before saving them to the database.
JWT secret is stored in .env, which should be kept confidential and not committed to version control.

🚀 Future Enhancements
Add password hashing and validation using bcrypt.
Implement token expiration and refresh tokens.
Add user profile management.
Improve error handling and input validation.
Implement rate limiting and request sanitization for better security.


## FRONTEND


🚀 Features

Dark/Light Mode Toggle: Allows users to switch between a dark or light theme for the app interface.
Interactive Animations: Smooth animations powered by Framer Motion for a better user experience.
Responsive Design: Optimized for both mobile and desktop screen sizes.
User Authentication: Routes to sign up and sign in pages for user registration and login.
Flashcard System: The app uses the Leitner method for flashcard-based learning and progress tracking.

🛠️ Tech Stack

React.js: A JavaScript library for building user interfaces.
Framer Motion: Animation library for React to provide smooth animations.
React Router: For client-side routing to navigate between pages (Sign Up, Sign In, etc.).
Lucide-React: A set of customizable icons.
Tailwind CSS: Utility-first CSS framework for styling.
React State: React's built-in state management for theme toggling.

📌 Getting Started
To get this project up and running on your local machine:

1. Clone the repository

git clone <repository-url>
cd flashcard-app-frontend
2. Install dependencies
Make sure you have Node.js and npm installed. Then, run:


npm install
3. Start the development server

npm run dev
The app will be available at http://localhost:5173.

🔑 API Integration
The frontend is designed to interact with the backend of the Flashcard App. The following endpoints are used for authentication:

POST /signup: User sign-up.
POST /signin: User sign-in.
Once authenticated, the frontend interacts with flashcards (creating, updating, and deleting) through API calls to the backend.

🧑‍💻 Project Structure
scss
Copy
Edit
flashcard-app-frontend
│   index.js          // Entry point of the React app
│   App.js            // Main component managing routing
│   .env              // Environment variables for React
└───src
│   └───components
│       └── Home.js   // Main page with UI/animations, dark/light mode toggle
│       └── SignUp.js // Sign-up form component
│       └── SignIn.js // Sign-in form component
│   └───assets
│       └── images    // Any static images (e.g., logos, icons)
│   └───styles
│       └── tailwind.css // Custom Tailwind CSS file
🌙 Dark/Light Mode
The theme toggle is controlled by the isDarkMode state. By default, the app uses a light theme, but it switches to dark mode when the user clicks the Sun/Moon button in the top right corner. The theme is applied to the background gradients, button styles, and text colors.

🎨 Animations
The app uses Framer Motion for smooth animations, including:

Scaling buttons on hover and tap
Fade-in and slide-in effects for text and icons
Animated background elements that move and rotate randomly for an aesthetic feel.
📱 Responsive Design
The app is fully responsive, meaning it adapts to different screen sizes. It uses Tailwind's utility classes to adjust the layout for mobile, tablet, and desktop views.

🤝 Contributing
If you would like to contribute to this project:

Fork the repository
Create a new branch (git checkout -b feature-name)
Commit your changes (git commit -m 'Add new feature')
Push to your branch (git push origin feature-name)
Open a pull request

📜 License
This project is licensed under the MIT License.


## WORKING VIDEO

   ## AUTHENTICATION
https://github.com/user-attachments/assets/80df071e-ec90-44dd-9b95-1c61ddeeafeb

  ## FLASHCARD SECTION


https://github.com/user-attachments/assets/2bc4dc65-8d58-49ce-a2d0-e193415e9e7d




