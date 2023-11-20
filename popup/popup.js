document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(['ytmusic_search_redirection', 'playlist_id', 'playlists_button'], function (result) {
    // YTMusic search redirection
    const redirToggleWrapper = document.getElementById('redir-toggle-wrapper');
    const redirToggle = document.createElement('input');
    redirToggle.id = 'redirToggle';
    redirToggle.type = 'checkbox';
    redirToggle.checked = result.ytmusic_search_redirection ?? true;
    redirToggleWrapper.insertBefore(redirToggle, redirToggleWrapper.firstChild);

    redirToggle.addEventListener('change', function (event) {
      chrome.storage.local.set({ ytmusic_search_redirection: event.target.checked });
    });

    // Playlists button
    const playlistsToggleWrapper = document.getElementById('playlists-toggle-wrapper');
    const playlistsToggle = document.createElement('input');
    playlistsToggle.id = 'playlistsToggle';
    playlistsToggle.type = 'checkbox';
    playlistsToggle.checked = result.playlists_button ?? true;
    playlistsToggleWrapper.insertBefore(playlistsToggle, playlistsToggleWrapper.firstChild);

    playlistsToggle.addEventListener('change', function (event) {
      chrome.storage.local.set({ playlists_button: event.target.checked });
    });

    // Playlist Id field
    const playlistId = document.getElementById('playlist-id');
    playlistId.value = result.playlist_id ?? '';

    playlistId.addEventListener('input', function (event) {
      chrome.storage.local.set({ playlist_id: event.target.value });
    });
  });
});
