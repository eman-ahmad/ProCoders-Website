import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home.jsx";
import Login from "../src/components/Login.js";
import Signup from "../src/components/Signup.js";
import Admin from "./components/Admin.jsx";
import AddPost from "./components/AddPost";
import PostPage from "./components/PostPage.jsx";
// import './server.js';
// import './mongo.js';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Admin/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/home' element={<Home/>}/>
            <Route path='/signup' element={<Signup/>}/> 
            <Route path='/AddPost' element={<AddPost/>}/>
            <Route path='/Post' element={<PostPage/>}/>
          </Routes>
        </Router>
        
      
    </div>
  );
}

export default App;

