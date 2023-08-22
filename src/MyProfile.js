import React, { useState, useEffect } from "react";
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
    <div>
      <h1 className="display-4">My Profile</h1>
      <h4><strong>Hello {userDetails.username}!</strong></h4>
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
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
