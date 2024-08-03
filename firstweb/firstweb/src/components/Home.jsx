import React from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import profilePic from "./images/man.jpg";
import imagePreview from "./images/thumbnail.jpg";
import {useState, useEffect}from "react";

let Storeddata ;
function Home() {
  const location = useLocation();
  
  const [data, setData] = useState([]);
const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3030/posts');
      const jsonData = await response.json();
      Storeddata=jsonData;
      setData(jsonData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);


 
  
  
 const [searchTerm, setSearchTerm] = useState('');
 const handleInputChange = (event) => {
  setSearchTerm(event.target.value);
};

const handleSearchClick = () => {
  console.log('Search term:', searchTerm);

  setData(Storeddata.filter((e)=>{
    return e.title.toLowerCase().includes(searchTerm.toLowerCase());
}));
  
};

const handleCategorySearch=(category)=>{
   console.log(Storeddata);

  if(category.toLowerCase()=="all")
    {
      
      setData(Storeddata);
    }
    else{
      setData(Storeddata.filter((e)=>{
        return e.category.toLowerCase().includes(category.toLowerCase());
    }));
    }
  

};
  

  const HomePosts = data.map((post, index) => {
    if(post.status.toLowerCase()=="show")
    return (
      <div
        style={{ flex: "1 0 32%", boxSizing: "border-box", margin: "5px",maxWidth:"300px" }}
        key={index}
      >
        <div
          style={{
            paddingTop: "20px",
            paddingBottom: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/Post" state={{postid:post._id}}>
          <img
            src={"http://localhost:3030"+post.thumbnail}
            alt="Uploaded"
            style={{ width: "300px", height: "170px", borderRadius: "10px" }}
          />
          </Link>
        </div>
        <h6 style={{}}>{post.title}</h6>
        <p style={{}}>
          {post.description.length > 100
            ? post.description.slice(0, 100) + "...."
            : post.description}
        </p>
      </div>
    );
  });

  return (
    <div className="Home">
      <header className="header">
        <div className="header-left">
          <h1>Procoders</h1>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>

        <div className="header-right">
          <div className="profile">
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <div className="profile-name">John</div>
          </div>
        </div>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "15px",
        }}
      >
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("All")}}
        >
          All
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("JAVA")}}
        >
          JAVA
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("C++")}}
        >
          C++
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("JavaScript")}}
        >
          JavaScript
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("PYTHON")}}
        >
          PYTHON
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("REACT")}}
        >
          REACT
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("NODE")}}
        >
          NODE
        </button>
        <button
          className="btn btn-info"
          style={{
            backgroundColor: "rgba(0,0,0,0.1)",
            border: "none",
            fontWeight: "500",
          }}
          onClick={()=>{handleCategorySearch("SQL")}}
        >
          SQL
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          paddingTop: "30px",
        }}
      >
        {HomePosts}
      </div>
    </div>
  );
}

export default Home;
