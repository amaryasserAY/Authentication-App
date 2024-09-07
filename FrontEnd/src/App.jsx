import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import  Profile  from "./pages/Profile";
import Header from "./components/Header";

function App() {
 

  return (
    <BrowserRouter>
    {/****** Header ****/}
    <Header  />
 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
 </Routes>


    </BrowserRouter>
  )
}

export default App
