import React, { useState } from 'react';

// Search component
const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      console.error('onSearch is not defined');
    }
  };

  return (
    <div style={styles.search}>
      <form style={styles.form} onSubmit={handleSubmit} role="search">
        <input
          style={styles.input}
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search by title"
          aria-label="Search"
        />
        <button style={styles.button} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

// Inline CSS styles
const styles = {
  search: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px',
    marginTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: '600px',
  },
  input: {
    flex: 1,
    marginRight: '10px',
    borderRadius: '5px',
    padding: '10px',
    border: '1px solid #ced4da',
  },
  button: {
    borderRadius: '5px',
    padding: '10px 20px',
    border: '1px solid #007bff',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Search;
