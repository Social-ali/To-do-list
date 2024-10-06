import React, { useState, useContext } from 'react';
import NoteContext from '../context/Notes/Notecontext'; // Import context
import EditNoteModal from './EditNoteModal'; // Import the modal component
import './Notesitem.css'; // Ensure this CSS file contains the necessary styles

function Notesitem({ note }) {
  const { deleteNote, editNote } = useContext(NoteContext); // Get context functions
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!note) {
    return <div>No note data available</div>; // Handle cases where note might be undefined
  }

  // Handle delete
  const handleDelete = async () => {
    try {
      await deleteNote(note._id); // Make sure deleteNote handles errors internally
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Handle edit
  const handleEdit = async (id, title, description, tag) => {
    try {
      await editNote(id, title, description, tag); // Call editNote from context
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <div className="col-md-4 col-sm-6 content-card">
      <div className="card-big-shadow">
        <div className="card card-just-text" data-background="color" data-color="blue" data-radius="none">
          <div className="content">
            <h6 className="category">Follow</h6>
            <h4 className="title">
              <button type="button" className="link-button">{note.title}</button>
            </h4>
            <p className="description">{note.description}</p>
            <div className="card-actions">
              <i 
                className="fa-solid fa-trash-can mx-2" 
                title="Delete" 
                onClick={handleDelete}
              ></i>
              <i 
                className="fa-solid fa-pen-to-square mx-2" 
                title="Edit" 
                onClick={() => setIsModalOpen(true)}
              ></i>
            </div>
          </div>
        </div>
      </div>

      {/* Render the modal */}
      <EditNoteModal
        show={isModalOpen}
        note={note}
        onClose={() => setIsModalOpen(false)}
        onSave={handleEdit}
      />
    </div>
  );
}

export default Notesitem;
