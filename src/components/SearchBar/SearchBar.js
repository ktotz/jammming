import React, { useState } from 'react';
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function SearchBar({ onSearch })
{
  const [ searchTerm, setSearchTerm ] = useState('');

  const handleSearch = (e) =>
  {
    e.preventDefault();
    if (searchTerm)
    {
      onSearch(searchTerm); // Call the onSearch prop with the search term
    }
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Enter a song, album, or artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="SearchButton" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </button>
    </div>
  );
}

export default SearchBar;