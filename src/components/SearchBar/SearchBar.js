import React, {useState} from "react";
import './SearchBar.css';

const SearchBar = (props) => {
  // State Variables
  const [searchQuery, setSearchQuery] = useState("");

  // Function to update search query variable
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) {
      alert("Search query is empty!");
    } else {
      props.getSearchResults(searchQuery); // Call the getSearchResults function from App.js
    }
    setSearchQuery(""); // Reset the search query
  };

  // Function to handle the enter key press
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
          <div className="search-bar">
              <input
                  className="search-bar-input" 
                  type="text"
                  placeholder="Search for a song, artist, or album..."
                  value={searchQuery}
                  onChange={handleSearchQuery}
                  onKeyDown={handleEnterKeyPress}
              />
          </div>
      </form>
    </>
  );
};

export default SearchBar;