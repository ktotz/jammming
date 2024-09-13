import React, { useState, useEffect } from 'react';
import './App.css';
import Header from '../Header/header';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import { performSearch, handleSavePlaylist, addTrackToPlaylist, removeTrackFromPlaylist } from '../../helpers';

import Spotify from '../../util/Spotify';

const App = () => {
  // State Variables
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Initialize Spotify API with access token
  useEffect(() => {
    Spotify.requestAccessToken();
  }, []);

  // Update the playlist name
  const updatePlaylistName = (value) => {
    setPlaylistName(value);
  };

  // Get Search Results
  const getSearchResults = async (searchQuery) => {
    setSearchPerformed(true);
    try {
      await performSearch(Spotify, searchQuery, setSearchResults);
    } catch (error) {
      alert('Error during search: ' + error);
    }
  }

  // Add a track to the playlist
  const addTrack = (track) => {
    addTrackToPlaylist(track, playlistTracks, setPlaylistTracks);
  };

  // Remove a track from the playlist
  const removeTrack = (track) => {
    removeTrackFromPlaylist(track, setPlaylistTracks);
  };

  // Save the playlist
  const savePlaylist = async () => {
    try {
      await handleSavePlaylist(Spotify, playlistName, playlistTracks, setPlaylistName, setPlaylistTracks);
    } catch (error) {
      alert('Error saving playlist: ' + error);
    }
  };

  return (
    <div className="body">
      <Header />
      <div className='search-bar'>
        <SearchBar 
          getSearchResults={getSearchResults}
        />
      </div>
      <div>
        {searchPerformed ? (
          <>
            <div className='search-results'>
              <SearchResults 
                results={searchResults}
                onAdd={addTrack}
              />
            </div>
            <div className='playlist'>
              <Playlist 
                name={playlistName}
                tracks={playlistTracks}
                onNameChange={updatePlaylistName}
                onRemove={removeTrack}
                onSave={savePlaylist}
              />
            </div>
          </>
        ) : (
          <div>
            <h2>
              Enter a search term to get started!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;