import React, { useState, useEffect } from 'react';
import NoteContext from './Notecontext';

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // Your auth token
  const authToken = process.env.REACT_APP_AUTH_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZjMGRiZjE1OTI5MDBkNDk2OGMyMmNmIn0sImlhdCI6MTcyMzk3NTA3NH0.cZC3mpJrh1NRai0ld3RCM2dABuV7xx76RREB9-pX-5U';

  // Fetch all notes from the server
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [authToken]); // Added authToken to dependency array

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch('http://localhost:5000/api/notes/addnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note._id === id ? updatedNote : note
        )
      );
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
