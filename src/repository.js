const USERS_KEY = "users";
const USER_KEY = "user";
const REVIEWS_KEY = "movie_reviews";


// Initialise local storage "users" with data, if the data is already set this function returns immediately.
function initUsers() {
  // Stop if data is already initialised.
  if(localStorage.getItem(USERS_KEY) !== null)
    return;

  // User data is hard-coded, passwords are in plain-text.
  const users = [
    {
      username: "saif",
      password: "abc123",
      email: "saif@example.com",
      // ... add more fields as needed
    },
    {
      username: "ahmad",
      password: "def456",
      email: "ahmad@example.com",
      // ... add more fields as needed
    }
  ];

  // Set data into local storage.
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getUsers() {
  // Extract user data from local storage.
  const data = localStorage.getItem(USERS_KEY);

  // Convert data to objects.
  return JSON.parse(data) || []; 
}

// NOTE: In this example the login is also persistent as it is stored in local storage.
function verifyUser(username, password) {
  const users = getUsers();
  for(const user of users) {
    if(username === user.username && password === user.password)
    {
      setUser(username);
      return true;
    }
  }

  return false;
}

function getUserProfile(username) {
  const users = getUsers();
  return users.find(user => user.username === username);
}

function updateUserProfile(updatedProfile) {
  const users = getUsers();
  const index = users.findIndex(user => user.username === updatedProfile.username);
  if (index !== -1) {
    users[index] = updatedProfile;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
  }
  return false;
}

function setUser(username) {
  localStorage.setItem(USER_KEY, username);
}

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

function registerUser(username, password) {
  const users = getUsers();

  // Check if username already exists
  for(const user of users) {
    if(username === user.username) {
      return false; // Username already exists
    }
  }

  // Add new user to the list
  users.push({ username, password });
  
  // Update localStorage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return true; // Registration successful
}

// Returns all reviews for a specific movie
function getReviewsForMovie(movieId) {
  const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || {};
  return reviews[movieId] || [];
}

// Saves a new review for a specific movie
function saveReviewForMovie(movieId, review, rating) {
  const allReviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || {};
  if (!allReviews[movieId]) {
    allReviews[movieId] = [];
  }
  allReviews[movieId].push({ review, rating });

  localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));
}

export {
  initUsers,
  verifyUser,
  getUser,
  removeUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getReviewsForMovie,
  saveReviewForMovie
}