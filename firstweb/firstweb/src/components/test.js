import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import loginCSS from "./login.css";
import image from "./1.jpg";
import google from "./google.png";
import apple from "./apple.jpg";
import fb from "./fb.png";

function Signup() {
  const navigate = useNavigate();

  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function submit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios
        .post("http://localhost:8000/signup", {name, email, password })
        .then((res) => {
          if (res.data === "exist") {
            navigate("/home", { state: { id: email } });
          } else if (res.data === "notexist") {
            setError("User has not signed up");
          } else {
            setSuccess("Signup successful! Please log in.");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div className="section1">
        <div className="signup">
          <div className="signup-form">
            <p className="heading-signup">Welcome ProCoders!</p>
            <p className="content">
            Let's do hands-on coding across multiple 
              <br></br>
              &nbsp;&nbsp;&nbsp; languages. Get started for free.
            </p>
            <form action="POST">
              <input type="name" onChange={(e)=>setName(e.target.value)} placeholder="Name"></input>
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
              <input type="password" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password"></input>

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
              Already a member?<Link to="/">Login now</Link>
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


export default Signup;