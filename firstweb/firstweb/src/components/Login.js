import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import image from "../components/images/1.jpg";
import google from "../components/images/google.png";
import apple from "../components/images/apple.jpg";
import fb from "../components/images/fb.png";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    // if (!/\S+@\S+\.\S+/.test(email)) {
    //   alert("Please enter a valid email address.");
    //   return;
    // }
  
    // if (password.length < 8) {
    //   alert("Password must be at least 8 characters long.");
    //   return;
    // }
    try {
      await axios
        .post("http://localhost:3030/login", { email, password })
        .then((res) => {
          if (res.status === 200) {
            navigate("/home", { state: { id: email } });
          }
        })
        .catch((e) => {
          if (e.response && e.response.status === 404) {
            alert("User has not signed up");
          } else if (e.response && e.response.status === 401) {
            alert("Invalid credentials");
          } else {
            alert("An error occurred");
          }
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
    

    
  }
  return (
    <div>
      <div className="section1">
        <div className="Login">
          <div className="login-form">
            <p className="heading">Welcome back!</p>
            <p className="content">
            Let's do hands-on coding across multiple 
              <br></br>
              &nbsp;&nbsp;&nbsp; languages. Get started for free.
            </p>
            <form action="POST">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Email"
              ></input>

              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              ></input>
              <p className="forgot-pass">Forgot Password?</p>

              <button className="submit-button">
                <input type="submit" onClick={submit}></input>
              </button>
            </form>
            <div className="line-container">
              <div className="horizontal-line"></div>
              <div className="or-sec">or continue with</div>
              <div className="horizontal-line"></div>
            </div>

            <p className="link-para">
              Not a member?<Link to="/signup">Signup now</Link>
            </p>
            <div class="row">
              <div className="column">
                <img className="logo-img" src={google}></img>
              </div>
              <div className="column">
                <img className="logo-img" src={apple}></img>
              </div>
              <div className="column">
                <img className="logo-img" src={fb}></img>
              </div>
             </div>
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="image-container">
          <img src={image} alt="Image description" />
        </div>
        <p className="pic-text-overlay">
          Enhance your coding abilities at <strong>ProCode website.</strong>
        </p>
      </div>
    </div>
  );
}


export default Login;
