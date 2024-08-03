import React from 'react';

const AdminCard = ({ index,imageSrc, title, description,deleteFunction,post,status,hideFunction}) => {
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;

  const styles = {
    card: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      margin: '13px 30px',
      backgroundColor: '#fff',
    },
    imageContainer: {
      flexShrink: 0,
      width: '120px',
      height: '90px',
      marginRight: '10px',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
    },
    content: {
      flexGrow: 1,
      
    },
    title: {
      margin: 0,
      fontSize: '1.2em',
      marginBottom: '5px',
    },
    description: {
      margin: '0 0 10px 0',
      color: '#666',
    },
    index: {
      margin: '0 10px 0 0',
      color: '#666',
    },
    buttons: {
      display: 'flex',
      gap: '10px',
      alignItems:'center',
      justifyContent: 'center',
      marginLeft:'10%'
    },
    button: {
      padding: '5px 10px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    editButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    hideButton: {
      backgroundColor: '#008CBA',
      color: 'white',
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.index}>{index}</div>
      <div style={styles.imageContainer}>
        <img src={"http://localhost:3030"+imageSrc} alt="Thumbnail" style={styles.image} />
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.description}>{truncatedDescription}</p>
      </div>
      <div style={styles.buttons}>
          <button style={{ ...styles.button, ...styles.editButton }}>Edit</button>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={()=>{deleteFunction(post)}} >Delete</button>
          <button style={{ ...styles.button, ...styles.hideButton }} onClick={()=>{hideFunction(post)}}>{status=="Show"?"Hide":"Show"}</button>
        </div>
    </div>
  );
};

export default AdminCard;
