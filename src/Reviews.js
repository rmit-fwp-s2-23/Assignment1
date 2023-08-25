import React, { useState, useEffect } from 'react';
import { saveReviewForMovie, getReviewsForMovie } from './repository';
import "./MoviePage.css";
import { useLocation } from 'react-router-dom';

function Reviews() {

    const location = useLocation();
    const { movie } = location.state;
  
    // State for current movie reviews
    const [reviews, setReviews] = useState([]);
  
    // State for new review and rating
    const [newReview, setNewReview] = useState('');
    const [newRating, setNewRating] = useState(5); // Default rating
  
    useEffect(() => {
      const movieReviews = getReviewsForMovie(movie.imdbID);
      setReviews(movieReviews);
    }, [movie]);
  
    const handleReviewSubmit = () => {
      saveReviewForMovie(movie.imdbID, newReview, newRating);
      setReviews([...reviews, { review: newReview, rating: newRating }]);
      setNewReview('');
      setNewRating(5);
    };

    return (
        <>
        {reviews.map((rev, index) => (
          <div key={index}>
            <p>{rev.review}</p>
            <small>Rating: {rev.rating}/5</small>
          </div>
        ))}

        <h3>Add your review</h3>
        <textarea value={newReview} onChange={e => setNewReview(e.target.value)} placeholder="Write your review here..."></textarea>
        <select value={newRating} onChange={e => setNewRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <button onClick={handleReviewSubmit}>Submit Review</button>
        </>
);
}

export default Reviews