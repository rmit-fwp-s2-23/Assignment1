import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import { getUserProfile, updateUserProfile, deleteUser, deleteReviewsByUser } from "./repository";

function MyProfile(props) {
  // State to hold user details
  const [userDetails, setUserDetails] = useState({
    username: props.username || "",
    name: "",
    password: "",
    signUpDate: ""
  });

  // State to toggle editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user details on component mount or when username changes
  useEffect(() => {
    const fetchedUserDetails = getUserProfile(props.username);
    setUserDetails(fetchedUserDetails || {});
  }, [props.username]);

  // Handle input changes and update state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  // Handle save button click
  const handleSave = () => {
    const updated = updateUserProfile(userDetails);
    if (updated) {
      setIsEditing(false);
      alert("Your profile was updated successfully.");
    } else {
      alert("There was an error updating your profile. Please try again.");
    }
  };

  // Handle delete account button click
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      deleteUser(userDetails.username);
      deleteReviewsByUser(userDetails.username);
      props.logoutUser();
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
                    <p>Sign Up Date: {userDetails.signUpDate}</p>
                </div>
                <button onClick={() => setIsEditing(true)}>Edit</button>

                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
