import './App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Home';
import SignInPage from './pages/Signin';
import SignUpPage from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
 
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/signin' element={<SignInPage/>} />
      <Route path='/signup' element={<SignUpPage/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  </BrowserRouter>
}

export default App
