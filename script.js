// listen for form submit
document.getElementById('my-form').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('site-name').value;
  var siteUrl = document.getElementById('site-url').value;
  if (!validateForm(siteName, siteUrl)) {
    console.log('false');
    return false;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Local Storage Test
  // localStorage.setItem('test', 'hello world');
  // localStorage.getItem('test');
  // localStorage.removeItem('test');

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    // Init array
    var bookmarks = [];
    // Add to array
    bookmarks.push(bookmark);
    // Set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Fetch from local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Reset back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  // Clear form
  document.getElementById('my-form').reset();
  // Re fetch bookmarks
  fetchBookmarks();
  // Prevent form submit default
  e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re fetch bookmarks
  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {
  // Fetch from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output ID
  var bookmarksResults = document.getElementById('bookmarks-results');
  // Build output
  bookmarksResults.innerHTML = '';
  for (var i = 0; i  < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">' +
                                  '<h3>' + name +
                                  ' <a class="btn btn-default" target="_blank" href="' + url + '">VISIT</a> ' +
                                  ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger"href="#">DELETE</a> ' +
                                  '</h3>' +
                                  '</div>'
  }
}

function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form');
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL');
    return false;
  }
  console.log('true');
  return true;
}
