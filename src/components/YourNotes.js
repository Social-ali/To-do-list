import React, { useState, useContext } from 'react';
import NoteContext from '../context/Notes/Notecontext';
import Notesitem from './Notesitem'; // Ensure correct file path
import EditNoteModal from './EditNoteModal'; // Import the modal component
import Search from './Search'; // Import the Search component

const YourNotes = () => {
  const { notes } = useContext(NoteContext); // Access notes from context
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedNote(null);
  };

  // Handle search action
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const result = notes.filter(note =>
      note.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredNotes(result);
  };

  return (
    <div className="your-notes-container">
      <Search onSearch={handleSearch} /> {/* Render the Search component */}
      <h2 className="text-center">Your Notes</h2>
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note._id} className="note-item-wrapper">
              <center> <Notesitem note={note} onEdit={() => handleEditClick(note)} /></center>
             
            </div>
          ))
        ) : (
          
          <p><center><b>No notes found</b></center></p>
        )}
      </div>
      {selectedNote && (
        <EditNoteModal
          note={selectedNote}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default YourNotes;
