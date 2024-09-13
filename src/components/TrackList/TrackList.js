import React from 'react';
import './TrackList.css';

function TrackList({ tracks, onRemoveTrack })
{
  return (
    <div className="Tracklist">
      
      {tracks.map((track) => (
        <div className="Track" key={track.id}>
          <div className="Track-information">
            <p><span style={{ fontWeight: 'bold' }}>{track.name}</span> | {track.artist} | {track.album}</p>
          </div>
          <button className="Track-action Track-remove" onClick={() => onRemoveTrack(track)}>
          -
          </button>
        </div>
      ))}
    </div>
  );
}

export default TrackList;