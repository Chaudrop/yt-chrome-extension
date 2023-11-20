const YTMusicButtonHtmlContent = `
  <span class="chaudrop-button-label">YTMusic</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
    <path d="M 40.960938 4.9804688 A 2.0002 2.0002 0 0 0 40.740234 5 L 28 5 A 2.0002 2.0002 0 1 0 28 9 L 36.171875 9 L 22.585938 22.585938 A 2.0002 2.0002 0 1 0 25.414062 25.414062 L 39 11.828125 L 39 20 A 2.0002 2.0002 0 1 0 43 20 L 43 7.2460938 A 2.0002 2.0002 0 0 0 40.960938 4.9804688 z M 12.5 8 C 8.3826878 8 5 11.382688 5 15.5 L 5 35.5 C 5 39.617312 8.3826878 43 12.5 43 L 32.5 43 C 36.617312 43 40 39.617312 40 35.5 L 40 26 A 2.0002 2.0002 0 1 0 36 26 L 36 35.5 C 36 37.446688 34.446688 39 32.5 39 L 12.5 39 C 10.553312 39 9 37.446688 9 35.5 L 9 15.5 C 9 13.553312 10.553312 12 12.5 12 L 22 12 A 2.0002 2.0002 0 1 0 22 8 L 12.5 8 z"/>
  </svg>
`;

const playlistsButtonHtmlContent = `
  <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 18H20M22 18H20M20 18V16M20 18V20" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 11L20 11" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 17L14 17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M2 5L20 5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span class="chaudrop-button-label">Playlists</span>
`;

const buttonCssContent = `
  #chaudrop-ytmusic-link-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px 8px 16px;
    gap: 8px;
    height: 28px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.2s ease;
    vertical-align: top;
    margin-left: 8px;
    background-color: #ff2000b0;
  }

  .chaudrop-button-label {
    font-size: 14px;
    font-family: "Roboto","Arial",sans-serif;
    font-weight: 500;
    color: #0f0f0f;
  }

  #chaudrop-ytmusic-link-button:hover {
    background: #ff2000d0;
  }

  #chaudrop-playlists-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px 8px 16px;
    gap: 8px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: 0.2s ease;
    margin-right: 8px;
  }

  #chaudrop-playlists-button:hover {
    background: #e5e5e5;
  }
`;

function removeYTMusicButton() {
  actualButton = document.getElementById('chaudrop-ytmusic-link-button');
  if (actualButton) {
    actualButton.remove();
  }
}

function createYouTubeMusicButton() {
  const titleElement = document.querySelector('div[id="title"] yt-formatted-string');
  if (titleElement) {
    removeYTMusicButton();

    const button = document.createElement('button');
    button.id = 'chaudrop-ytmusic-link-button';
    button.innerHTML = YTMusicButtonHtmlContent;

    button.addEventListener('click', redirectToYouTubeMusic);
    titleElement.parentNode.appendChild(button);
  } else {
    setTimeout(function () {
      createYouTubeMusicButton();
    }, 300);
  }
}

function removePlaylistsButton() {
  actualButton = document.getElementById('chaudrop-playlists-button');
  if (actualButton) {
    actualButton.remove();
  }
}

function createPlaylistsButton() {
  const actionsMenuElement = document.querySelector('div[id="actions"] ytd-menu-renderer');
  if (actionsMenuElement) {
    removePlaylistsButton();

    const button = document.createElement('button');
    button.id = 'chaudrop-playlists-button';
    button.innerHTML = playlistsButtonHtmlContent;

    button.addEventListener('click', () => {
      document.querySelector("*[aria-label=\"Enregistrer dans une playlist\"]").click()
    });
    actionsMenuElement.insertBefore(button, actionsMenuElement.firstChild);
  } else {
    setTimeout(function () {
      createPlaylistsButton();
    }, 300);
  }
}

function formatTitle(title) {
  const patterns = [
    'official music video',
    'official video',
    'videoclip oficial',
    'clip officiel',
    'video oficial',
    'video official',
    'vídeo oficial',
    'official audio',
    'audio oficial',
    'cover audio',
    'audio',
    'official music video with lyrics',
    'music video w lyrics',
    'lyric music video',
    'official lyric video',
    'lyric video oficial',
    'video lyric oficial',
    'video lyric',
    'lyric video',
    'letra oficial',
    'letra\\/lyrics',
    'official visualizer',
    'official visualiser',
    'official visual',
    'visualizer oficial',
    'visualizer',
    'visualiser',
    'visual video',
    'visualizer \\& letra',
    'art video',
    'videofans oficial',
    'prod\\..+',
    'prod\\.by.+',
    'prod by.+',
    'prodby.+',
    '\\(prod .+\\)',
    '\\[prod .+\\]',
  ];
  const multiplePatterns = [' x ', '\\|'];
  for (pattern of patterns) {
    multiplePatterns.push(
      `${pattern}`,
      `\\(${pattern}\\)`,
      `\\[${pattern}\\]`,
      `\\( ${pattern} \\)`,
      `\\[ ${pattern} \\]`,
    );
  }
  // remove emojis
  const filteredTitle = title.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
    ' ',
  );
  const regexp = new RegExp(multiplePatterns.join('|'), 'gi');
  const formattedTitle = filteredTitle.replace(regexp, ' ');
  return formattedTitle.trim().replace(/ +/g, ' ');
}

function redirectToYouTubeMusic() {
  const titleElement = document.querySelector('div[id="title"] yt-formatted-string');
  if (titleElement) {
    const videoTitle = titleElement.innerText;
    const formattedTitle = formatTitle(videoTitle);
    const youtubeMusicSearchURL = `https://music.youtube.com/search?q=${encodeURIComponent(
      formattedTitle,
    )}`;
    chrome.runtime.sendMessage({ action: 'redirect', url: youtubeMusicSearchURL });
  }
}

function tryButtonCreation() {
  if (window.location.pathname === '/watch') {
    chrome.storage.local.get(['playlist_id', 'playlists_button'], function (result) {
      if (result.playlist_id) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('list') === result.playlist_id) {
          createYouTubeMusicButton();
        }
      } else {
        createYouTubeMusicButton();
      }

      if (result.playlists_button) {
        createPlaylistsButton();
      }
    });
  }
}

document.addEventListener('yt-navigate-finish', () => {
  removeYTMusicButton();
  removePlaylistsButton();
  tryButtonCreation();
});

tryButtonCreation();

const styleElement = document.createElement('style');
styleElement.innerHTML = buttonCssContent;
document.head.appendChild(styleElement);