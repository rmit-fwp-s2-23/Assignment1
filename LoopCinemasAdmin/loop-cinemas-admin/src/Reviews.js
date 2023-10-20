import React, { useState, useEffect } from "react";
import "./Reviews.css";
import { getReviews, deleteReview, blockUser, unblockUser } from "./repository.js";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []); 

  const fetchReviews = async () => {
    const reviewsData = await getReviews();
    setReviews(reviewsData);
  };

  const handleDeleteReview = async (reviewId) => {
    await deleteReview(reviewId);
    fetchReviews(); // Refetching reviews after deletion
  };

  const handleBlockUser = async (userId) => {
    await blockUser(userId);
    fetchReviews(); // Refetching reviews to reflect the blocked user's status
  };

  const handleUnblockUser = async (userId) => {
    await unblockUser(userId);
    fetchReviews(); // Refetching reviews to reflect the unblocked user's status
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <div className="reviews">
          {reviews.map((review) => (
      <div key={review.review_id} className="review-item">
        <p>User ID: {review.user_id}</p>
        <strong>Review:</strong> 
        <div 
          dangerouslySetInnerHTML={{ __html: review.review }}
        ></div>
        <p>Rating: {review.rating}</p>
        <button onClick={() => handleDeleteReview(review.review_id)}>Delete Review</button>
        <button onClick={() => handleBlockUser(review.user_id)}>Block User</button>
        <button onClick={() => handleUnblockUser(review.user_id)}>Unblock User</button>
      </div>
    ))}
      </div>
    </div>
  );
}

export default Reviews;
