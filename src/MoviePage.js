import "./MoviePage.css"; // Include 'src/' in the import path
import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the stylesheet for the 'snow' theme
import {createReview, deleteReview, getReviewByMovie, getAllBookings, createBooking} from "./repository2.js"
import ReservationPopup from './ReservationPopup';
import "./Reviews.css"; // Include 'src/' in the import path
import { useLocation} from "react-router-dom";
import ReviewPopup from "./ReviewPopup"; // Include 'src/' in the import path
import "./ReservationPopup.css"; // Include 'src/' in the import path

function MoviePage(props) {
  console.log("Props received by MoviePage:", props);
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


    async function fetchReviews() {
      try {
        const fetchedReviews = await getReviewByMovie(movie.movie_id);
        setReviews(fetchedReviews);
      } catch (error) {
        setReviews([]);
        console.error("Error fetching reviews:", error);
      }
    }


    useEffect(() => { fetchReviews();
    }, []); // Empty dependency array
  
  // State for new review and rating
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5); // Default rating

  // Handle change in review text area
  const handleReviewChange = (value) => {
    const unprivilegedEditor = reactQuillRef.current.unprivilegedEditor;
    setNewReview(value);
    setCount(unprivilegedEditor.getLength() - 1);
  };

  // Handle submitting a new review
  const handleReviewSubmit = () => {
    // Check for review length
    if (count <= 600 && count > 0 && newReview.trim() !== "") {
      const reviewData = {
        rating: newRating,
        review: newReview,
        user_id: props.user_id,
        movie_id: movie.movie_id,
      }
      createReview(reviewData);
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


    if (reviews) {
      alert("Review Successful")
      fetchReviews();
    }
    else {
      alert("Please try again")
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

  const handleMovieTime = () => {
    if (props.username) {
      setReservationPopup(true);
    } else {
      alert("Please log in.");
      setCount(0)
    }
  }

  // // Handle editing an existing review
  // const handleReviewEdit = (index) => {
  //   // Get the review to be edited
  //   const reviewToEdit = reviews[index];

  //   // Set the new review and rating state to the current review and rating
  //   setNewReview(reviewToEdit.review);
  //   setNewRating(reviewToEdit.rating);
  //   setButtonPopup(true);

  //   // Remove the review from the reviews array
  //   const updatedReviews = [...reviews];
  //   updatedReviews.splice(index, 1);
  //   setReviews(updatedReviews);
  // };

  // // Handle deleting a review
  // const handleReviewDelete = (index) => {
  //   // Delete the review from the repository
  //   deleteReview(props.email, movie.name, index);

  //   // Remove the review from the reviews array
  //   const updatedReviews = [...reviews];
  //   updatedReviews.splice(index, 1);
  //   setReviews(updatedReviews);
  // };

      // States for reservation
      const [reservationPopup, setReservationPopup] = useState(false);
      const [selectedSessionTime, setSelectedSessionTime] = useState(null);
      const [bookings, setBookings] = useState([]);
  
      useEffect(() => {
          // Fetch all bookings
          async function fetchBookings() {
              const allBookings = await getAllBookings();
              setBookings(allBookings);
          }
          fetchBookings();
      }, []);
  
      const handleReserveSeats = async (time, seats) => {
        let seatNumber = parseInt(seats, 10); // Convert string to number
        // Calculate already reserved seats for this session
        const alreadyReserved = bookings.filter(booking => booking.time === time).reduce((acc, curr) => acc + parseInt(curr.seat, 10), 0);
        
        // Check if total seats after this reservation would exceed the limit
        if (alreadyReserved + seatNumber > 10) {
            alert("Exceeds maximum available seats for this session. Please choose fewer seats.");
            return;
        }
        else if (seatNumber < 1) {
            alert("Please enter a valid number of seats greater than zero.");
            return;
        }
        else {

        }
    
        const bookingData = {
            movie_id: movie.movie_id,
            user_id: props.user_id, 
            time: time,
            seat: seats
        };
        console.log("Booking data:", bookingData);
        const newBooking = await createBooking(bookingData);
        
        if (newBooking) {
            alert("Reservation successful!");

            // Refetch bookings from the database
            const allBookings = await getAllBookings();
            setBookings(allBookings);
            console.log('Updated bookings:', allBookings);

        } else {
            alert("Failed to reserve seats.");
        }
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
        
        {suburbs.map((suburb) => (
            <React.Fragment key={suburb.id}>
                <p className="movie-suburb">
                    {suburb.suburb}
                </p>
                <div className="timings-container">
                    {suburb.timings.map((time) => {
                        const reservedSeats = bookings.filter(booking => booking.time === time).reduce((acc, curr) => acc + parseInt(curr.seat, 10), 0);

                        return (
                            <div key={time} className='movie-time-container'>
                                <p 
                                    className='movie-time' 
                                    onClick={() => { 
                                        setSelectedSessionTime(time); 
                                        console.log("Selected time:", time);
                                        handleMovieTime();
                                    }}
                                > 
                                    {time}
                                    <p className='movie-reserved-seats'>
                                    Reserved Seats: {reservedSeats}
                                </p>

                                </p>
                            </div>
                        );
                    })}
                </div>
            </React.Fragment>
        ))}
        <ReservationPopup 
          trigger={reservationPopup} 
          setTrigger={setReservationPopup} 
          selectedSessionTime={selectedSessionTime}
          handleReserveSeats={handleReserveSeats} 
        />
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
    {console.log("this is review length" + reviews.length)}
    {reviews.length > 0 ? (
      reviews.map((rev, index) => {
        const { rating, review, user_id } = rev.rating;
        {console.log("Review rating: " + rev.rating + " Review review: " + rev.review + " Review user_id : " + user_id)}

        totalReviewsNum += parseInt(rev.rating);
        totalReviewsIndex += 1;
        return (
          <div key={index} className="reviews-container">
            <div className="review-title">
              {props.username}: {<div dangerouslySetInnerHTML={{ __html: rev.review }} />}
            </div>
            <p className="rating">Rating: {rev.rating}/5</p>
            {console.log("User Id: ", props.user_id, " Review user Id ", user_id)}
            {rev.user_id === props.user_id && (
              <div>
                {/* <button
                  style={{ marginRight: "10px" }}
                  onClick={() => handleReviewEdit(index)}
                >
                  Edit
                </button>
                <button onClick={() => handleReviewDelete(index)}>
                  Delete
                </button> */}
              </div>
            )}
          </div>
        );
      })
    ) : (
      <p>No Reviews Posted.</p>
    )}
  </div>
</div>

      <div className="movie-container5">
        {reviews.length > 0 && (
          <p className="average-ratings">
            Average Movie Ratings:{" "}
            {console.log(totalReviewsNum)}
            {(totalReviewsNum / totalReviewsIndex).toFixed(1)} out of 5
          </p>
        )}
      </div>
    </div>
  );
}

export default MoviePage;
