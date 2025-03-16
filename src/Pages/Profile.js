import React, { useEffect, useState } from "react";
import "../styles/Profile.css"

const Profile = () => {
  const userId = localStorage.getItem("userId"); // Get logged-in user ID
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch user details when the component loads
  useEffect(() => {
    if (!userId) {
      console.error("❌ User ID is missing!");
      return;
    }

    fetch(`http://localhost:5000/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("❌ Error fetching user:", data.error);
        } else {
          setProfile(data);
        }
      })
      .catch((error) => console.error("❌ Fetch error:", error));
  }, [userId]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Handle save changes
  const handleSave = () => {
    fetch(`http://localhost:5000/profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error("❌ Error updating profile:", data.error);
        } else {
          console.log("✅ Profile updated:", data);
          setIsEditing(false);
        }
      })
      .catch((error) => console.error("❌ Update error:", error));
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      <div className="profile-field">
        <label>First Name:</label>
        <input type="text" name="first_name" value={profile.first_name} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="profile-field">
        <label>Last Name:</label>
        <input type="text" name="last_name" value={profile.last_name} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="profile-field">
        <label>Gender:</label>
        <input type="text" name="gender" value={profile.gender} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="profile-field">
        <label>Email:</label>
        <input type="email" name="email" value={profile.email} disabled /> {/* Email should not be editable */}
      </div>

      <div className="profile-field">
        <label>Phone:</label>
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="profile-field">
        <label>Address:</label>
        <input type="text" name="address" value={profile.address} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div className="button-group">
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
        ) : (
          <>
            <button className="save-btn" onClick={handleSave}>Save Changes</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
