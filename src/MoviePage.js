import "./MoviePage.css"; // Include 'src/' in the import path
import React, { useState, useEffect } from "react";
import {
  saveReviewForMovie,
  getReviewsForMovie,
  deleteReviewForMovie,
} from "./repository"; // Include 'src/' in the import path
import "./Reviews.css"; // Include 'src/' in the import path
import { useLocation, useNavigate } from "react-router-dom";
import ReviewPopup from "./ReviewPopup"; // Include 'src/' in the import path

function MoviePage(props) {
  let totalReviewsIndex = 0;
  let totalReviewsNum = 0;

  const navigate = useNavigate();
  const location = useLocation();

  const { movie } = location.state;
  const [reviews, setReviews] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [count, setCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  // State for new review and rating
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5); // Default rating

  // Fetch reviews for the movie on component mount
  useEffect(() => {
    const movieReviews = getReviewsForMovie(movie.imdbID);
    setReviews(movieReviews);
  }, [movie]);

  // Handle change in review text area
  const handleReviewChange = (event) => {
    const reviewText = event.target.value;
    setNewReview(reviewText);
    setCount(reviewText.length);
  };

  // Handle submitting a new review
  const handleReviewSubmit = () => {
    // Check for review length
    if (count <= 250 && count > 0 && newReview.trim() != 0) {
      saveReviewForMovie(movie.imdbID, newReview, newRating, props.username);
      setReviews([
        ...reviews,
        { review: newReview, rating: newRating, user: props.username },
      ]);
      setNewReview("");
      setNewRating(5);
      setButtonPopup(false);
      setCount(0);
    } else if (count === 0 || newReview.trim() == 0) {
      setErrorMessage("Please enter a review.");
    } else if (count > 250) {
      setErrorMessage(
        "Please enter a review that is less than 250 characters."
      );
    }
  };

  const handleReview = () => {
    if (props.username) {
      setButtonPopup(true);
    } else {
      alert("Please log in to submit a review.");
    }
  };

  // Handle editing an existing review
  const handleReviewEdit = (index) => {
    // Get the review to be edited
    const reviewToEdit = reviews[index];

    // Set the new review and rating state to the current review and rating
    setNewReview(reviewToEdit.review);
    setNewRating(reviewToEdit.rating);
    setButtonPopup(true);

    // Remove the review from the reviews array
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  // Handle deleting a review
  const handleReviewDelete = (index) => {
    // Delete the review from the repository
    deleteReviewForMovie(movie.imdbID, index);

    // Remove the review from the reviews array
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  // Suburbs and timings data
  const suburbs = [
    {
      id: 1,
      suburb: "Southbank",
      timings: [
        "8:30 AM",
        "10:30 AM",
        "12:00 PM",
        "7:00 PM",
        "9:00 PM",
        "11:00 PM",
      ],
    },
    {
      id: 2,
      suburb: "Richmond",
      timings: [
        "6:00 AM",
        "8:00 AM",
        "12:00 PM",
        "4:00 PM",
        "6:00 PM",
        "10:00 PM",
      ],
    },
    {
      id: 3,
      suburb: "Carlton",
      timings: [
        "2:00 PM",
        "4:30 PM",
        "6:30 PM",
        "10:30 PM",
        "11:30 PM",
        "1:00 AM",
      ],
    },
    {
      id: 4,
      suburb: "Footscray",
      timings: [
        "8:00 AM",
        "10:00 AM",
        "2:30 PM",
        "8:30 PM",
        "10:30 PM ",
        "12:30 AM",
      ],
    },
  ];

  // Handle clicking on the "Reviews" button
  const handReviewButton = () => {
    navigate("/Reviews");
  };

  return (
    <div className="movie-container">
      <div className="movie-container1">
        <img src={movie.Poster} />
      </div>

      <div className="movie-container2">
        <h1 alt={movie.Title}>{movie.Title} - Showtimes</h1>

        {suburbs.map((suburb) => {
          return (
            <>
              <p key={suburb.id} className="movie-suburb">
                {suburb.suburb}
              </p>
              <div className="timings-container">
                {suburb.timings.map((time) => (
                  <p className="movie-time"> {time} </p>
                ))}
              </div>
            </>
          );
        })}
      </div>

      <div className="movie-container3">
        <button className="add-review-button" onClick={() => handleReview()}>
          <h1>Add Your Movie Review</h1>
        </button>
        <ReviewPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h2 className="write-review-text">Please Enter Your Review Below.</h2>
          <div className="write-review-containter">
            <textarea
              value={newReview}
              onChange={handleReviewChange}
              placeholder="type here"
            ></textarea>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
          <p className="char-count">Character Count {count} / 250</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </ReviewPopup>
      </div>

      <div className="movie-container4">
        <div className="reviews-box">
          {reviews.map((rev, index) => {
            totalReviewsNum += rev.rating;
            totalReviewsIndex += 1;
            return (
              <div key={index} className="reviews-container">
                <p className="review">
                  {rev.user}: {rev.review}
                </p>
                <p className="rating">Rating: {rev.rating}/5</p>
                {rev.user === props.username && (
                  <div>
                    <button
                      style={{ marginRight: "10px" }}
                      onClick={() => handleReviewEdit(index)}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleReviewDelete(index)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="movie-container5">
        {reviews.length > 0 && (
          <p className="average-ratings">
            Average Movie Ratings:{" "}
            {(totalReviewsNum / totalReviewsIndex).toFixed(1)} out of 5
          </p>
        )}
      </div>
    </div>
  );
}

export default MoviePage;
