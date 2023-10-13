import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:8080";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.post(API_HOST + "/api/user/login", { email: email, password: password });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function getAllUsers() {
    const response = await axios.get(API_HOST + `/api/user`);
  
    return response.data;
  }

async function getUserById(id) {
  const response = await axios.get(API_HOST + `/api/user/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/user", user);

  return response.data;
}

async function updateUserById(id, updatedUserData) {
    const response = await axios.put(API_HOST + `/api/user/${id}`, updatedUserData);
  
  return response.data;
}

  async function deleteUserById(id) {
    const response = await axios.delete(API_HOST + `/api/user/${id}`);
  
  return response.data;
}

// --- Review -------------------------------------------------------------------------------------
async function getAllReviews() {
    const response = await axios.get(API_HOST + "/api/reviews");
  
    return response.data;
  }
  async function getReviewByMovie(movie_id) {
    try {
      const response = await axios.get(API_HOST + `/api/reviews/${movie_id}`);
      
      return response.data;

    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("Error fetching reviews:", error);
      return "Error fetching reviews.";
    }
  }
  
  async function createReview(rating, review, user_id, movie_id) {
    const reviewData = {
      rating,
      review,
      user_id,
      movie_id,
    };
  
    try {
      const response = await axios.post(API_HOST + '/api/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }
  
  
  async function updateReviewById(id, updatedReviewData) {
    const response = await axios.put(API_HOST + `/api/reviews/${id}`, updatedReviewData);
  
    return response.data;
  }
  
  async function deleteReview(review_id) {
    const response = await axios.delete(`${API_HOST}/api/reviews/${review_id}`);
  
    return response.data;
  }

// --- Movie -------------------------------------------------------------------------------------
async function getAllMovies() {
    const response = await axios.get(API_HOST + "/api/movie");
  
    return response.data;
  }
  
  async function getMovieByName(movie_id) {
    const response = await axios.get(API_HOST + `/api/movie/${movie_id}`);
  
    return response.data;
  }
  
  async function createMovie(movie) {
    const response = await axios.post(API_HOST + "/api/movie", movie);
  
    return response.data;
  }
  
  async function updateMovieById(id, updatedMovieData) {
    const response = await axios.put(API_HOST + `/api/movie/${id}`, updatedMovieData);
  
    return response.data;
  }
  
  async function deleteMovieById(id) {
    const response = await axios.delete(API_HOST + `/api/movie/${id}`);
  
    return response.data;
  }
  
// --- Booking -----------------------------------------------------------------------------------
async function getAllBookings() {
    const response = await axios.get(API_HOST + "/api/booking");
  
    return response.data;
  }
  
  async function getBookingById(id) {
    const response = await axios.get(API_HOST + `/api/booking/${id}`);
  
    return response.data;
  }
  
  async function createBooking(booking) {
    const response = await axios.post(API_HOST + "/api/booking", booking);
  
    return response.data;
  }
  
  async function updateBookingById(id, updatedBookingData) {
    const response = await axios.put(API_HOST + `/api/booking/${id}`, updatedBookingData);
  
    return response.data;
  }
  
  async function deleteBookingById(id) {
    const response = await axios.delete(API_HOST + `/api/booking/${id}`);
  
    return response.data;
  }

// --- Helper functions to interact with local storage --------------------------------------------
  function setUser(user) {
    console.log("Setting user:", user); // Debugging
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  function getUser() {
    const user = JSON.parse(localStorage.getItem(USER_KEY));
    console.log("Getting user:", user); // Debugging
    return user;
  }

  function removeUser() {
    localStorage.removeItem(USER_KEY);
  }
  
  export {
    verifyUser, getUserById, createUser, updateUserById, deleteUserById, getAllUsers,
    getAllReviews, getReviewByMovie, createReview, updateReviewById, deleteReview,
    getAllMovies, getMovieByName, createMovie, updateMovieById, deleteMovieById,
    getAllBookings, getBookingById, createBooking, updateBookingById, deleteBookingById, getUser, removeUser, setUser
  };
  
