import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { getReviews, deleteReview, blockUser, unblockUser } from "./repository.js";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []); // Added an empty dependency array to avoid infinite loop

  const fetchReviews = async () => {
    const reviewsData = await getReviews();
    console.log("Fetched Reviews:", reviewsData);
    setReviews(reviewsData);
  };

  const handleDeleteReview = async (reviewId) => {
    await deleteReview(reviewId);
    fetchReviews();
  };

  const handleBlockUser = async (userId) => {
    await blockUser(userId);
    fetchReviews();
  };

  const handleUnblockUser = async (userId) => {
    await unblockUser(userId);
    fetchReviews();
  };

  const [activeButtons, setActiveButtons] = useState({});

  const toggleButton = (userId) => {
    setActiveButtons(prevState => ({
      ...prevState,
      [userId]: !prevState[userId]
    }));
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review.review_id} className="review-item">
            <p>User: {review.user && review.user.name ? review.user.name : "Unknown User"}</p>

            <p>User ID: {review.user_id}</p>
            <strong>Review:</strong> 
            <div dangerouslySetInnerHTML={{ __html: review.review }}></div>
            <p>Rating: {review.rating}</p>
            <button onClick={() => handleDeleteReview(review.review_id)}>Delete Review</button>
            <button 
            className={activeButtons[review.user_id] ? 'active' : ''} 
            onClick={() => {
              handleBlockUser(review.user_id);
              toggleButton(review.user_id);
            }}
          >
            Block User
          </button>
          <button 
            className={!activeButtons[review.user_id] ? 'active' : ''} 
            onClick={() => {
              handleUnblockUser(review.user_id);
              toggleButton(review.user_id);
            }}
          >
            Unblock User
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Reviews;
