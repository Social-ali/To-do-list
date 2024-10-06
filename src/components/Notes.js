import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem'; // Assuming you have a NoteItem component to display individual notes

const YourNotes = () => {
  const [notes, setNotes] = useState([]); // All notes
  const [filteredNotes, setFilteredNotes] = useState([]); // Filtered notes based on search
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  // Fetch notes from an API or context here
  useEffect(() => {
    // Replace with your note-fetching logic
    const fetchNotes = async () => {
      // Example fetch call
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
      setFilteredNotes(data);
    };

    fetchNotes();
  }, []);

  // Filter notes based on search query
  useEffect(() => {
    if (searchQuery) {
      setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  return (
    <div>
      <h1>Your Notes</h1>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
      />
      <div>
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => <NoteItem key={note.id} note={note} />) // Display individual note
        ) : (
          <p>No notes found</p>
        )}
      </div>
    </div>
  );
};

export default YourNotes;
