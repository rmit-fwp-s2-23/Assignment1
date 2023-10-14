import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import {
  getUserById,
  updateUserById,
  deleteUserById,
  deleteReviewById,
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
      await updateUserById(userDetails.user_id, userDetails);
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


  return (
    <div className="my-profile-container">
      <div className="profile-box">
        <h1 className="display-4">My Profile</h1>
        {isEditing ? (
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
        ) : (
          <div className="user-details">
            <div className="user-detail-box">
              <strong>User Details:</strong>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
              <p>Username: {userDetails.username}</p>
              <p>Sign Up Date: {userDetails.createdAt}</p>
            </div>
            <button
              style={{ marginRight: "10px" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
