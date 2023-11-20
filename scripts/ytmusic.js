function getLink() {
  const titleElement = document.querySelector(
    'ytmusic-shelf-renderer[class="style-scope ytmusic-section-list-renderer"] \
yt-formatted-string[class="title style-scope ytmusic-responsive-list-item-renderer complex-string"] \
a',
  );

  if (!titleElement) {
    setTimeout(function () {
      getLink();
    }, 300);
  } else {
    chrome.storage.local.get('ytmusic_search_redirection', function (result) {
      const ytmusic_search_redirection = result.ytmusic_search_redirection ?? true;
      if (ytmusic_search_redirection) {
        location.replace('https://youtube.com/' + titleElement.getAttribute('href'));
      } else {
        console.log(titleElement.getAttribute('href'));
        console.log(titleElement);
      }
    });
  }
}

getLink();
