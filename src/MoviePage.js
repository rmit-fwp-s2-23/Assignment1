import "./MoviePage.css";
import React, { useState, useEffect } from 'react';
import { saveReviewForMovie, getReviewsForMovie } from './repository';
import "./Reviews.css";
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewPopup from './ReviewPopup'

function MoviePage() {
  let totalReviewsIndex = 0
  let totalReviewsNum = 0
  
  const navigate = useNavigate(); 
  const location = useLocation();

  const { movie } = location.state;
  const [reviews, setReviews] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [count, setCount] = React.useState(0);
  const [errorMessage, setErrorMessage] = useState(null);


  // State for new review and rating
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5); // Default rating

  useEffect(() => {
    const movieReviews = getReviewsForMovie(movie.imdbID);
    setReviews(movieReviews);
  }, [movie]);

  const handleReviewChange = (event) => {
    const reviewText = event.target.value;
    setNewReview(reviewText);
    setCount(reviewText.length);
  };

  const handleReviewSubmit = () => {
    if (count <= 250 && count > 0) {
      saveReviewForMovie(movie.imdbID, newReview, newRating);
      setReviews([...reviews, { review: newReview, rating: newRating }]);
      setNewReview('');
      setNewRating(5);
    }
    else if (count === 0) {
      setErrorMessage("Please enter a review.");
    }
    else if (count > 250)  {
      setErrorMessage("Please enter a review that is less than 250 characters.");
    }
    else {
    setErrorMessage('');
  }
  };

  const suburbs = [
    {
    id:1,
    suburb:'Southbank',
    timings:['8:30 AM', '10:30 AM', '12:00 PM', '7:00 PM', '9:00 PM', '11:00 PM']
    },
    {
    id:2,
    suburb:'Richmond',
    timings:['6:00 AM', '8:00 AM', '12:00 PM', '4:00 PM', '6:00 PM', '10:00 PM']
    },
    {
    id:3,
    suburb:'Carlton',
    timings:['2:00 PM', '4:30 PM', '6:30 PM', '10:30 PM', '11:30 PM', '1:00 AM']
    },
    {
    id:4,
    suburb:'Footscray',
    timings:['8:00 AM', '10:00 AM', '2:30 PM', '8:30 PM', '10:30 PM ', '12:30 AM']
    }
  ];

  const handReviewButton = () => {
    navigate("/Reviews");
  };

  return (
    <div className="movie-container">

        <div className="movie-container1">
        <img src={movie.Poster}/>
        </div>

        <div className="movie-container2"> 
        <h1 alt={movie.Title}>{movie.Title} - Showtimes</h1>
        
        {suburbs.map((suburb) => {return <><p key={suburb.id} className='movie-suburb'>{suburb.suburb}</p> 
        <div className="timings-container">
        {suburb.timings.map((time) => (<p className='movie-time'> {time} </p>))}</div></>})}
        </div>


        <div className="movie-container3"> 
        <button className="add-review-button"onClick={() => setButtonPopup(true)}><h1>Add Your Movie Review</h1></button>
        <ReviewPopup trigger={buttonPopup} setTrigger={setButtonPopup}>

        <h2 className="write-review-text">Please Enter Your Review Below.</h2>
        <div className='write-review-containter'>
            <textarea value={newReview} onChange={handleReviewChange} placeholder="type here"></textarea>
            <select value={newRating} onChange={e => setNewRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
            ))}
            </select>
            <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
        <p className='char-count'>Character Count {count} / 250</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        </ReviewPopup>
      
        </div>
        
        <div className="movie-container4">
        
        <div className='reviews-box'>
        {reviews.map((rev, index) => {
        totalReviewsNum += rev.rating;
        totalReviewsIndex += 1;
        return (
          <div key={index} className='reviews-container'>
          <p className='review'>Review: {rev.review}</p>
          <p className='rating'>Rating: {rev.rating}/5</p>
          <p className='total-rating'>Total Ratings: {totalReviewsNum}</p>
          <p className='total-index'>Total Indices: {totalReviewsIndex}</p>
          </div>
        );
        })}
        </div>
        </div>
        <div className='movie-container5'>
        {reviews.length > 0 && <p className='average-ratings'>Average Movie Ratings: {totalReviewsNum/totalReviewsIndex} out of 5</p>}
        </div>
        </div>

  );
}

export default MoviePage;