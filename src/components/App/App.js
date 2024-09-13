
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';

function App()
{
  const [ playlistURIs, setPlaylistURIs ] = useState([]);
  const [ playlistName, setPlaylistName ] = useState('My Playlist');
  const [ playlistTracks, setPlaylistTracks ] = useState([]);
  const [ searchResults, setSearchResults ] = useState([]);
  const [ isTokenReady, setIsTokenReady ] = useState(false);

  useEffect(() =>
  {
    // Call getAccessToken and update the state based on whether a token was successfully retrieved
    const token = Spotify.getAccessToken();
    if (token)
    {
      setIsTokenReady(true); // Update state to indicate token is ready
    }
  }, []);

  const addTrack = (track) =>
  {
    if (!playlistTracks.some((playlistTrack) => playlistTrack.id === track.id))
    {
      setPlaylistTracks([ ...playlistTracks, track ]);
      setPlaylistURIs([ ...playlistURIs, track.uri ]);
    }
  };

  const removeTrack = (track) =>
  {
    // Filter out the track with a unique property
    const updatedPlaylist = playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id);
    setPlaylistTracks(updatedPlaylist);
  };

  const updatePlaylistName = (newName) =>
  {
    setPlaylistName(newName);
  };

  const search = async (term) =>
  {
    if (!isTokenReady)
    {
      console.log('Token not ready. Cannot perform search.');
      return; // Early return if token is not ready
    }
    console.log(`Searching for: ${term}`); // Log for debugging
    const tracks = await Spotify.search(term);
    console.log(`Search results: ${tracks.length} tracks found`);
    setSearchResults(tracks);
  };
  // Inside your main application component (e.g., App.js)
  const saveToSpotify = async () =>
  {
    const userID = await Spotify.getUserID();
    const playlistID = await Spotify.createPlaylist(userID, playlistName);
    const trackURIs = playlistTracks.map((track) => track.uri);

    // Add tracks to the new playlist
    await Spotify.addTracksToPlaylist(userID, playlistID, trackURIs);

    // Reset the custom playlist in your app
    setPlaylistName('New Playlist');
    setPlaylistTracks([]);
  };

  return (
    <div className="body">
      <h1 className="header">Jammming</h1>
      <SearchBar onSearch={search} />
      <div className="Results">
        <SearchResults searchResults={searchResults} onAddTrack={addTrack} />
        <div className='Vr'></div>
        <Playlist
          playlistName={playlistName}
          playlistTracks={playlistTracks}
          onRemoveTrack={removeTrack}
          onNameChange={updatePlaylistName}
          onSavePlaylist={saveToSpotify}
        />
      </div>
      </div>
  );
}

export default App;