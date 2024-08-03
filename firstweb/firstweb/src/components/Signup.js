import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./signUp.css";
import image from "../components/images/1.webp";
import google from "../components/images/google.png";
import apple from "../components/images/apple.jpg";
import fb from "../components/images/fb.png";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
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
    const DatatoSend={
      "username":name,
       "email":email,
       "password":password
    }
    //console.log(DatatoSend);
    const jsonString =  JSON.stringify(DatatoSend);
    //console.log(jsonString);

    try {
      const response = await fetch('http://localhost:3030/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: jsonString
      });

      if (response.ok) {
          const result = await response.json();
          alert('Account Has Been Created');
      } else {
          alert('Account Already exit');
      }
  } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
  }
  }
  return (
    <div>
      <div className="section2-signup">
        <div className="content-container">
        <p className="heading-signup">Welcome ProCoders!</p>
        <p className="content-signup">
        &nbsp;&nbsp;Let's do hands-on coding across multiple
          <br></br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; languages. Get started for free.
        </p>
        <div className="image-container-signup">
          <img src={image} alt="Image description" />
        </div>
        <p className="pic-text-overlay-signup">
          Enhance your coding abilities at <strong>ProCode website.</strong>
        </p>
      </div>
      </div>
      <div className="section1-signup">
        <div className="signup">
          <div className="signup-form">
            <form action="POST">
              <h1 className="form-heading">Sign up</h1>
              <input
                type="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              ></input>
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
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              ></input>

              <button className="submit-button">
                <input type="submit" onClick={submit}></input>
              </button>
            </form>
            <div className="line-container">
              <div className="horizontal-line"></div>
              <div className="or-sec">or continue with</div>
              <div className="horizontal-line"></div>
            </div>

            <p className="link-para-signup">
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
    </div>
  );
}

export default Signup;
