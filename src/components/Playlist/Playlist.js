import React from "react";
import './Playlist.css';

import Tracklist from "../TrackList/TrackList";
import SaveToSpotify from "../SaveToSpotify/SaveToSpotify";

const Playlist = (props) => {
    // Function to update playlist name variable
    const handlePlaylistName = (e) => {
        props.onNameChange(e.target.value);
    };

    return (
        <div className="playlist">
            <label>

            <input
                type="text"
                id="PlaylistName"
                placeholder="Playlist Name"
                class=""
                value={props.name}
                onChange={handlePlaylistName}
            />

            <span class="">
                Playlist Name
            </span>
            </label>
            <div>
                {props.tracks.length === 0 ? (
                    <h3>add songs here...</h3>
                ) : (
                    <Tracklist 
                        tracks={props.tracks} 
                        isAdd={false}
                        onRemove={props.onRemove}
                    />
                )}
            </div>
            <div>
                <SaveToSpotify onSave={props.onSave}/>
            </div>
        </div>
    );
};

export default Playlist;