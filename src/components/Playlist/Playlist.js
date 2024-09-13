import React from 'react';
import TrackList from '../TrackList/TrackList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import './Playlist.css';
import '../TrackList/TrackList.css';
import '../Track/Track.css';
import '../SearchResults/SearchResults.css';

function Playlist({ playlistName, playlistTracks, onRemoveTrack, onNameChange, onSavePlaylist })
{
  return (
    <div className="playlist">
      
      <div className='track-item'>
        <input
          type="text"
          value={playlistName}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
      <div className='playlist'>
        
        <TrackList tracks={playlistTracks} onRemoveTrack={onRemoveTrack} />
        <div className='Button-container'>
          <button className="Playlist-save" onClick={onSavePlaylist}>
            Save to <FontAwesomeIcon icon={faSpotify} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Playlist;