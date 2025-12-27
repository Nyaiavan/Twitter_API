// Get references to DOM elements
const searchBtn = document.getElementById('searchBtn');        // The "Search" button
const usernameInput = document.getElementById('username');     // Input field for X username
const profileCard = document.getElementById('profile');        // The container showing user profile
const errorBox = document.getElementById('error');             // Error message container
const errorMessage = document.getElementById('error-message'); // Paragraph to display error text
const darkToggle = document.getElementById('darkToggle');      // Dark mode toggle button

// Variables to track searches
let searchCount = 0;    // Count of searches for new usernames (max 3 for free tier)
const cache = {};       // Cache object to store previously searched usernames

/**
 * Function to search for an X username.
 * Called when the user clicks the search button.
 */
function searchUser() {
  const username = usernameInput.value.trim(); // Get input value and remove extra spaces
  if (!username) return showError("Please enter a username"); // Show error if input is empty

  // If this username is already in cache, show cached data instead of fetching again
  if (cache[username]) {
    displayProfile(cache[username]);
    return;
  }

  // Limit of 3 new searches for free tier
  if (searchCount >= 3) {
    showError("Free tier allows only 3 searches for new usernames. Wait 15 minutes.");
    return;
  }

  // Fetch user data from the server
  fetch(`/search?username=${encodeURIComponent(username)}`) // Encode username to safely send in URL
    .then(res => res.json()) // Convert server response to JSON
    .then(profile => {
      // If the server returns an error, throw it to be caught in catch block
      if (profile.error) throw new Error(profile.error);

      cache[username] = profile; // Save successful result in cache
      displayProfile(profile);    // Show profile data on the page
      searchCount++;              // Increase search count for free tier limit
    })
    .catch(err => showError(err.message)); // Show any errors that occur
}

/**
 * Function to display user profile on the page.
 * @param {Object} profile - The profile object returned from server
 */
function displayProfile(profile) {
  // Update DOM elements with profile data
  document.getElementById("profile-picture").src = profile.profile_image_url;
  document.getElementById("profile-name").innerText = profile.name;
  document.getElementById("profile-username").innerText = "@" + profile.username;
  document.getElementById("profile-id").innerText = profile.id;
  document.getElementById("profile-description").innerText = profile.description;
  document.getElementById("profile-followers").innerText = profile.public_metrics.followers_count;
  document.getElementById("profile-following").innerText = profile.public_metrics.following_count;
  document.getElementById("profile-tweets").innerText = profile.public_metrics.tweet_count;

  profileCard.style.display = "flex"; // Make profile card visible
  hideError();                        // Hide any previous error messages
}

/**
 * Function to show an error message
 * @param {string} msg - The message to display
 */
function showError(msg) {
  errorMessage.innerText = msg;  // Set error message text
  errorBox.style.display = "block"; // Show error container
  profileCard.style.display = "none"; // Hide profile card if error occurs
}

/**
 * Function to hide the error message
 */
function hideError() {
  errorBox.style.display = "none"; // Hide error container
}

/**
 * Dark Mode Toggle
 * Adds/removes "dark" class on the body element
 * Changes the interface colors using CSS
 */
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark'); // Toggle dark mode on/off
});
