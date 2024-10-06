import React, { useContext, useState } from 'react';
import NoteContext from '../context/Notes/Notecontext';
import { useNavigate } from 'react-router-dom';
import './Notesitem.css'; 
function AddNote() {
  const { addNote } = useContext(NoteContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
  const navigate = useNavigate(); // Use navigate hook

  const handleAddNote = () => {
    if (title && description) {
      addNote(title, description, 'General'); // Add note
      setAlertVisible(true); // Show alert

      // Hide alert and redirect after 2 seconds
      setTimeout(() => {
        setAlertVisible(false); // Hide alert
        navigate('/archive'); // Redirect to /archive
      }, 2000);
    } else {
      // Handle case where title or description is missing
      alert('Please fill in both title and description.');
    }
  };

  return (
    <div className="add">

    <div className="container">
      <h1><center>Add a note</center></h1>
      {alertVisible && (
        <div className="alert alert-primary" role="alert">
          Note added!
        </div>
      )}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddNote}>Add</button>
    </div>
    </div>
  );
}

export default AddNote;
