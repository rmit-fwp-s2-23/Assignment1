import "./MoviePage.css"; // Include 'src/' in the import path
import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the stylesheet for the 'snow' theme
import {createReview, deleteReview, getReviewByMovie} from "./repository2.js"

import "./Reviews.css"; // Include 'src/' in the import path
import { useLocation} from "react-router-dom";
import ReviewPopup from "./ReviewPopup"; // Include 'src/' in the import path

function MoviePage(props) {
  let totalReviewsIndex = 0;
  let totalReviewsNum = 0;

  const modules = {toolbar: [
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ],
}

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
  const location = useLocation();

  const { movie } = location.state;
  const [reviews, setReviews] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const reactQuillRef = React.useRef();

  // State for new review and rating
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5); // Default rating

  // Fetch reviews for the movie on component mount
  useEffect(() => {
    const movieReviews = getReviewByMovie(movie.movie_id);
    console.log(movie.movie_id)
    setReviews([movieReviews]);
  }, [movie]);

  // Handle change in review text area
  const handleReviewChange = (value) => {
    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
    setNewReview(value);
    setCount(unprivilegedEditor.getLength() - 1);
  };

  // Handle submitting a new review
  const handleReviewSubmit = () => {
    // Check for review length
    if (count <= 600 && count > 0 && newReview.trim() != 0) {
      createReview(newRating, newReview, props.user_id, movie.movie_id)
      console.log(newRating, newReview, props.user_id, movie.movie_id)
      setReviews([
        ...reviews,
        { review: newReview, rating: newRating, user: props.name},
      ]);
      setNewReview("");
      setNewRating(5);
      setButtonPopup(false);
      setCount(0);
    } else if (count === 0 || newReview.trim() == 0) {
      setErrorMessage("Please enter a review.");
    } else if (count > 600) {
      setErrorMessage(
        "Please enter a review that is less than 600 characters."
      );
    }
  };

  const handleReview = () => {
    if (props.username) {
      setButtonPopup(true);
    } else {
      alert("Please log in to submit a review.");
      setCount(0)
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
    setReviews([updatedReviews]);
  };

  // Handle deleting a review
  const handleReviewDelete = (index) => {
    // Delete the review from the repository
    deleteReview(props.email, movie.name, index);

    // Remove the review from the reviews array
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews([updatedReviews]);
  };

  return (
    <div className="movie-container">
      <div className="movie-container1">
        <div className="movie-image">
        <img src={movie.image} />
        </div>
      </div>

      <div className="movie-container2">
        <h1 alt={movie.name}>{movie.name} - Showtimes</h1>

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

          <div className="quill-container">
          <ReactQuill theme="snow" value={newReview} onChange={handleReviewChange} placeholder="type here" modules={modules} onKeyDown={handleReview}
      ref={reactQuillRef}/>
          </div>
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
            <div className="submit-review">
            <button onClick={handleReviewSubmit}>Submit Review</button>
          <p className="char-count">Character Count {count} / 600</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </ReviewPopup>
      </div>

      <div className="movie-container4">
        <div className="reviews-box">
        {reviews ? (
          reviews.map((rev, index) => {
            totalReviewsNum += rev.rating;
            totalReviewsIndex += 1;
            return (
              <div key={index} className="reviews-container">
                <p className="review">
                  {rev.user_id}: {<div dangerouslySetInnerHTML={{ __html: rev.review }} />}
                </p>
                <p className="rating">Rating: {rev.rating}/5</p>
                {rev.user_id === props.user_id && (
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
          })
        ) :
<p>No Reviews Posted.</p>
}
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
