import React from 'react';
import './Track.css';

function Track({name, artist, album})
{
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
      </div>
    </div>
  );
}

export default Track;