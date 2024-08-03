import React, { useState, useRef} from "react";
import { useLocation ,useNavigate } from "react-router-dom";
import profilePic from "./images/man.jpg";
import noFile from "./images/nofile.png";
import "./AddPost.css";

const AddPost = (props) => {

 
  const location = useLocation();
  const navigate = useNavigate();
  
  const { state } = location;
  const username = state && state.username;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    youtubeLink: "",
    status:"show"
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Select an option');

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    //e.preventDefault();
    setSelectedOption(option);
    setIsOpen(false);
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const buttonStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    borderRadius:"10px"
  };

  const menuStyle = {
    position: 'absolute',
    top: '100%',
    left: '0',
    display: 'block',
    background: 'white',
    border: '1px solid #ccc',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    zIndex: '1000',
  };

  const menuItemStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
  };

  const menuItemHoverStyle = {
    background: '#f0f0f0',
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    
    console.log("Form data:", formData );
    console.log("Uploaded file:", file.location);
    var DatatoSend=new FormData();
    DatatoSend.append("title", formData.title);
    DatatoSend.append("description",formData.description);
    DatatoSend.append("category",selectedOption);
    DatatoSend.append("youtubeLink",formData.youtubeLink);
    DatatoSend.append("status","show");
    DatatoSend.append("code",formData.code);
    DatatoSend.append("thumbnail",file);
    try {
      const response = await fetch('http://localhost:3030/posts/', {
          method: 'POST',
          body: DatatoSend
      });

      if (response.ok) {
          const result = await response.json();
          alert('POST HAS BEEN UPLOADED');
      } else {
          alert('POST UPLOAD FAILED');
      }
  } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
  }
    navigate('/');
    
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1>Procoders</h1>
        </div>
        <div className="header-center">
          <h2>New Post</h2>
        </div>
        <div className="header-right">
          <div className="profile">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="profile-name">{username}</div>
          </div>
        </div>
      </header>

      <div className="PostForm">
        <form onSubmit={handleSubmit}>
          <div className="topSection">
            <div>
              <div>
                <label className="formLabel">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="formInput"
                />
              </div>
              <div>
                <label className="formLabel">Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="12"
                  cols="70"
                  style={{ resize: "none", borderRadius: "10px" }}
                ></textarea>
              </div>
            </div>
            <div style={{ paddingRight: "20px" }}>
              <div>
                <label className="formLabel">Upload Thumbnail Image:</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg"
                  onChange={handleFileChange}
                  required
                  style={{ display: "none" }}
                  id="fileinput"
                />
                <div
                  id="filebutton"
                  onClick={handleButtonClick}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "yellowgreen",
                    borderRadius: "8px",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Choose a file
                </div>
              </div>
              {imagePreview ? (
                <div style={{ paddingTop: "20px" }}>
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    style={{
                      width: "350px",
                      height: "200px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ) : (
                <>
                  <div style={{ paddingTop: "20px" }}>
                    <img
                      src={noFile}
                      alt="Uploaded"
                      style={{
                        width: "350px",
                        height: "200px",
                        borderRadius: "10px",
                        border: "1px solid purple",
                      }}
                    />
                  </div>
                  
                  
                  </>

                
              )
              }
              <label className="formLabel">Choose Category :</label>
              <div style={dropdownStyle}>
      <button style={buttonStyle} onClick={toggleDropdown}>
        {selectedOption}
      </button>
      {isOpen && (
        <ul style={menuStyle}>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('Java')}
          >
            Java
          </li>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('C++')}
          >
            C++
          </li>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('JavaScript')}
          >
            JavaScript
          </li>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('Python')}
          >
            Python
          </li>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('React')}
          >
            React
          </li>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('Node')}
          >
            Node
          </li>
          <li
            style={menuItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = menuItemHoverStyle.background}
            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            onClick={() => handleOptionClick('SQL')}
          >
            SQL
          </li>
        </ul>
      )}
    </div>
            </div>
          </div>
          <div>
            <label className="formLabel">YouTube Link:</label>
            <input
              type="url"
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleChange}
              className="formInput"
            />
          </div>
          <div>
            <label className="formLabel">Code:</label>
            <textarea
              name="code"
              value={formData.code}
              onChange={handleChange}
              rows="12"
              cols="70"
              style={{ resize: "none", borderRadius: "10px" }}
            ></textarea>
          </div>
          <button className="formSubmit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPost;
