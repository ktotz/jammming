const Spotify = {

  clientId: '8c589d162031417daa2606f349d790fe',
  redirectUri: 'http://localhost:3000/',
  search: async (term) =>
  {
    const accessToken = Spotify.getAccessToken();
    const apiUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try
    {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok)
      {
        const jsonResponse = await response.json();
        if (jsonResponse.tracks)
        {
          return jsonResponse.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
            artist: track.artists[ 0 ].name,
            album: track.album.name,
            uri: track.uri,
          }));
        }
        return [];
      }
    } catch (error)
    {
      console.error('Error searching for tracks:', error);
    }
  },
   getUserID: async () =>
  {
    const accessToken = Spotify.getAccessToken();
    const apiUrl = 'https://api.spotify.com/v1/me';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try
    {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });

      if (response.ok)
      {
        const jsonResponse = await response.json();
        return jsonResponse.id;
      }
    } catch (error)
    {
      console.error('Error fetching user ID:', error);
    }
  },
  createPlaylist: async (userID, playlistName) =>
  {
    const accessToken = Spotify.getAccessToken();
    const apiUrl = `https://api.spotify.com/v1/users/${userID}/playlists`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    const data = JSON.stringify({
      name: playlistName,
      description: 'Custom playlist created with Jammming',
    });

    try
    {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: data,
      });

      if (response.ok)
      {
        const jsonResponse = await response.json();
        return jsonResponse.id; // The new playlist's ID
      }
    } catch (error)
    {
      console.error('Error creating playlist:', error);
    }
  },
  addTracksToPlaylist: async (userID, playlistID, trackURIs) =>
  {
    const accessToken = Spotify.getAccessToken();
    const apiUrl = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    const data = JSON.stringify({
      uris: trackURIs,
    });

    try
    {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: data,
      });

      if (response.ok)
      {
        console.log('Tracks added to the playlist successfully');
      }
    } catch (error)
    {
      console.error('Error adding tracks to the playlist:', error);
    }
  },
  
  
};

Spotify.getAccessToken = () =>
{
  // Check if the access token is already in the URL
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch)
  {
    const accessToken = accessTokenMatch[ 1 ];
    const expiresIn = Number(expiresInMatch[ 1 ]);

    // Clear parameters from the URL to avoid issues with expired tokens
    window.setTimeout(() =>
    {
      window.history.pushState('Access Token', null, '/');
    }, expiresIn * 1000);

    return accessToken;
  } else
  {
    // If the access token is not in the URL, redirect the user to Spotify's authorization endpoint
    const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${Spotify.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${Spotify.redirectUri}`;
    window.location.href = redirectUrl;
  }
};

export default Spotify;