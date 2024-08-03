import React, {useState, useEffect}from "react";
import  "./admin.css"
import profilePic from "./images/man.jpg"
import thumbnail from "./images/thumbnail.jpg"
import AdminCard from "./AdminCard";
import AddPost from "./AddPost";
import { useNavigate, Link } from "react-router-dom";





  function Admin() 
{
const [data, setData] = useState([]);
const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3030/posts');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const onDelete =async (post)=>{
    const url ="http://localhost:3030/posts/"+post._id;
    fetch(url, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Image deleted successfully');
          fetchData();
        } else {
          console.error('Failed to delete image. Status code:', response.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  const onHide =async (post)=>{
    const url ="http://localhost:3030/posts/"+post._id+"/toggle-status";
    fetch(url, {
      method: 'PUT',
    })
      .then(response => {
        if (response.ok) {
          console.log('STATUS UPDATED SUCCESSFUL');
          fetchData();
        } else {
          console.error('Failed to UPDATE STATUS Status code:', response.status);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }


    const elements = data.map((post,index)=>(
    
      <div key={index}>
            <AdminCard
            index={post.sno}
            imageSrc={post.thumbnail}
            title={post.title}
            description={post.description}
            status={post.status}
            deleteFunction={onDelete}
            hideFunction={onHide}
            post={post}
            />
        </div>
    ));

    return(
      <div>
     <header className="header">
      <div className="header-left">
        <h1>Procoders</h1>
      </div>
      <div className="header-center">
        <h2>Admin Panel</h2>
      </div>
      <div className="header-right">
        <div className="profile">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <div className="profile-name">John</div>
        </div>
      </div>
    </header>
    {elements}
    <Link to="/AddPost" state={{ username: "Talha" }}>
    <button className="Addbutton" Link>+</button>
    </Link>
    
    </div>
        
    );
}



export default Admin;