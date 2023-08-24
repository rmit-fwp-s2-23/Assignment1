import React, { useState, useEffect } from "react";
import "./MyProfile.css";
import { getUserProfile, updateUserProfile } from "./repository";

function MyProfile(props) {
  const [userDetails, setUserDetails] = useState({
    username: props.username || "",
    email: "" // You can add more fields as needed
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchedUserDetails = getUserProfile(props.username);
    setUserDetails(fetchedUserDetails || {});
  }, [props.username]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updated = updateUserProfile(userDetails);
    if (updated) {
      setIsEditing(false);
      // Maybe show a success message or other actions
    } else {
      // Handle error, for instance, display a notification about the error
    }
  };

  return (
    <div className="my-profile-container">
    <div className="profile-box">
        <h1 className="display-4">My Profile</h1>
        {isEditing ? (
            <div>
                <label>
                    Username:
                    <input
                      name="username"
                      value={userDetails.username}
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
                <button onClick={handleSave}>Save</button>
            </div>
        ) : (
            <div className="user-details">
                <div className="user-detail-box">
                    <strong>User Details:</strong>
                    <p>Username: {userDetails.username}</p>
                    <p>Email: {userDetails.email}</p>
                </div>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        )}
    </div>
</div>
);

}

export default MyProfile;
