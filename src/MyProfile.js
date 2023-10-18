import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import {
  getUserById,
  updateUserById,
  deleteUserById,
  deleteReviewById,
  getAllBookings,
  getMovieById
} from "./repository2";

function MyProfile(props) {
  const [userDetails, setUserDetails] = useState({
    userId: props.userId || "",
    name: "",
    password: "",
    signUpDate: "",
    createdAt: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  console.log("User ID from props:", props.userId);
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!props.userId) {
        console.error("UserId prop is undefined or not valid.");
        return;
      }
      try {
        const fetchedUserDetails = await getUserById(props.userId);
        console.log("Fetched User Details:", fetchedUserDetails);
        setUserDetails(fetchedUserDetails || {});
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [props.userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserById(userDetails.user_, userDetails);
      setIsEditing(false);
      alert("Your profile was updated successfully.");
    } catch (error) {
      alert("There was an error updating your profile. Please try again.");
    }
  };
  console.log("User Details State:", userDetails);

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await deleteUserById(userDetails.user_id);
        // Note: If each user's reviews have the user's ID as a reference, 
        // you might also need to delete those reviews using 'deleteReviewsByUser' or similar.
        props.logoutUser();
      } catch (error) {
        console.error("Error deleting user account:", error);
      }
    }
  };

  const [userBookings, setUserBookings] = useState([]); // New state to hold user bookings

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const allBookings = await getAllBookings();
        const filteredBookings = allBookings.filter(
          (booking) => booking.user_id === props.userId
        );
        setUserBookings(filteredBookings);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [props.userId]); // Dependency array includes props.userId to refetch when it changes

  const [movieNames, setMovieNames] = useState({});

  useEffect(() => {
    const fetchMovieNames = async () => {
        const newMovieNames = {};
        for (const booking of userBookings) {
            try {
                // Assuming you have a getMovieById function
                const movie = await getMovieById(booking.movie_id); 
                newMovieNames[booking.movie_id] = movie.name;
            } catch (error) {
                console.error("Error fetching movie name:", error);
            }
        }
        setMovieNames(newMovieNames);
    };

    if (userBookings.length > 0) {
        fetchMovieNames();
    }
}, [userBookings]);



return (
  <div className="my-profile-container">
    <div className="profile-box">
      <h1 className="display-4">My Profile</h1>
      {isEditing ? (
        <div>
<div>
  <label>
    Name:
    <input
      name="name"
      value={userDetails.name}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Email:
    <input
      name="email"
      value={userDetails.email}
      onChange={handleInputChange}
    />
  </label>
  <label>
    Password:
    <input
      name="password"
      value={userDetails.password}
      onChange={handleInputChange}
    />
  </label>
  <button onClick={handleSave}>Save</button>
</div>
      </div>
      ) : (
        <div className="user-details">
          <div className="user-detail-box">
            <strong>User Details:</strong>
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            <p>Username: {userDetails.username}</p>
            <p>Sign Up Date: {userDetails.createdAt}</p>
          </div>
          <button style={{ marginRight: "10px" }} onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      )}

      <div className="profile-box">
        <h2 className="display-4">My Bookings</h2>
        {userBookings && userBookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Movie</th>
                <th>Seats Booked</th>
                <th>Session</th>
                <th>Suburb</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{movieNames[booking.movie_id]}</td>
                  <td>{booking.seat}</td>
                  <td>{booking.time}</td>
                  <td>{booking.suburb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no bookings.</p>
        )}
      </div>
    </div>
  </div>
);
        }
export default MyProfile;
