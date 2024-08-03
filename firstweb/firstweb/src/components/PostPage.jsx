import React, { useState, useEffect } from "react";
import profilePic from "../components/images/man.jpg";
import logo from "../components/images/logo.png";
import "./admin.css";
import { useLocation ,Link } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";


function PostPage() {
  const [comment, setComment] = useState("");
  const [copy, setCopy] = useState("COPY");
  const location = useLocation();
  const { state } = location;
  const  postId = state && state.postid;
  const [post,setPost]=useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3030/posts/'+postId);
      const jsonData = await response.json();
      setPost(jsonData);
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  


  if (!post) {
    return <div>Post not found</div>;
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


  const addComment = () => {

    // Storeddata[postIndex].comments.push(comment);
    // localStorage.setItem("mydata", JSON.stringify(Storeddata));
    // setComment("");
  };

  const code = `
  function greet(name) {
    console.log("Hello, " + name + "!");
  }

  greet("World");
`;

const webkitScrollbarStyle = {
  display: "none"
};

function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = text;

  // Prevent the textarea from being visible
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';

  // Append the textarea to the document body
  document.body.appendChild(textarea);

  // Select the text inside the textarea
  textarea.select();

  try {
      // Execute the copy command
      const successful = document.execCommand('copy');
      if (successful) {
          console.log('Text copied to clipboard');
      } else {
          console.error('Failed to copy text to clipboard');
      }
  } catch (err) {
      console.error('Error copying text to clipboard:', err);
  }

  // Remove the textarea from the document
  document.body.removeChild(textarea);
  setCopy("COPIED")
}
  return (
    <div>
      <header className="header" style={{ width: "100%", height: "80px", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="header-left" style={{ width: "10%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          <a href="/home" style={{ display: "flex", justifyContent: "space-between", margin: "0px" }}>
            <img src={logo} alt="LOGO" className="profile-pic" style={{ width: "220px", height: "100px", cursor: "pointer", marginLeft: "-33px" }} />
          </a>
          <h2 style={{ marginLeft: "-65px", fontWeight: "600", fontFamily: "sans-serif" }}>CodeTube</h2>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
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

      <div className="section1" style={{ width: "60%", float: "left" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "48px" }}>
          {/* <img src={post.thumbnail} alt="Thumbnail" style={{ width: "850px", height: "450px", borderRadius: "10px",marginTop:"10px" ,display:"flex",alignItems:"flex-start"}} /> */}
          <div className="video-container" >
            <iframe width="850" height="450" src={post.youtubeLink} 
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen style={{ marginTop: "25px", borderRadius: "20px" }}></iframe>
            <h5 style={{ marginTop: "10px", fontWeight: "bold" }}>{post.title}</h5>
            <h6 style={{ backgroundColor: "#f1f1f1", padding: "10px", fontSize: "15px", fontWeight: "500", borderRadius: "12px", marginTop: "8px", width: "850px", height: "70%" }}>{post.description}</h6>
            <div style={{ backgroundColor: "#f1f1f1", padding: "10px", fontSize: "15px", fontWeight: "400", borderRadius: "12px", marginTop: "18px", width: "850px", fontSize: "20px", fontWeight: "bold" }}>
              Comments
              <div className="profile" style={{ display: "flex", marginTop: "5px" ,justifyContent:"space-between" }}>
                <img src={profilePic} alt="Profile" className="profile-pic" />
                <input
                  type="text"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment..."
                  style={{ fontWeight: "normal", fontSize: "12px", marginLeft: "5px", width: "620px" }}
                />
                <button className="btn btn-info" onClick={addComment}>SUBMIT</button>
              </div>
            </div>
          </div>

        </div>
        <div className="section2" style={{ width: "40%", float: "left", position: "absolute", top: "100px", right: "20px" }}>

          <div style={{ marginTop: "5px", display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "200px", background: "#f0efef", padding: "10px", width: "300px", borderRadius: "15px" }}>
            <h4 style={{ marginLeft: "35px" }}>Download Code File</h4>
            <a href={post.fileUrl} download style={{ textDecoration: "none", color: "black" }}>
              <button onClick={()=>{downloadTextAsFile("code.txt",post.code)}} style={{ padding: "10px 20px", backgroundColor: "#007bff", border: "none", borderRadius: "5px", color: "white", cursor: "pointer", marginLeft: "58px" }}>
                Download File
              </button>
            </a>
          </div>
          <div  className="removescroll" style={{ marginRight:"200px",marginLeft: "200px", width: "300px", height: "100%",marginTop:"30px" ,overflowY: "auto",webkitScrollbarStyle:"none"} } >
            <div style={{ border: "1px solid #ccc", borderRadius: "8px", height: "500px", padding: "5px",overflowX: "hidden", background:"#282c34" }}>
              <div  style={{ display: "flex", alignItems: "flex-end" , justifyContent:"end"}}>
              
              <button className="btn btn-secondary" style={{}} onClick={()=>{copyToClipboard(post.code)}}>{copy}</button>
              </div>
              
              <SyntaxHighlighter language={post.category} style={atomOneDark} className="removescroll">
                {post.code}
              </SyntaxHighlighter>
            </div>
          </div>

        </div>
      </div>
      <style jsx>{`
  .removescroll::-webkit-scrollbar {
    display: none;
  }
  div {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
  }
`}</style>
    </div>
  );

  function downloadTextAsFile(filename, text) {
    // Create a new Blob object using the text string
    const blob = new Blob([text], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with the desired file name
    link.download = filename;

    // Create a URL for the Blob and set it as the href attribute
    link.href = window.URL.createObjectURL(blob);

    // Append the link to the body (not visible to the user)
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
}
}


export default PostPage;