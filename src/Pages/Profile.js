import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css"; // Keep styles

const Profile = () => {
    const id = localStorage.getItem("userId"); // Ensure userId is stored

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
    });

    const [editMode, setEditMode] = useState(false);

    // ✅ Fetch user details on mount
    useEffect(() => {
        if (!id) {
            console.error("❌ No User ID found in localStorage");
            return;
        }

        axios.get(`http://localhost:5000/profile/${id}`)
            .then((res) => {
                console.log("✅ User Data Fetched:", res.data);
                setFormData(res.data); // Set user data
            })
            .catch((err) => console.error("❌ Error fetching user:", err));
    }, [id]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle profile update
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/profile/${id}`, formData)
            .then((res) => {
                console.log("✅ Profile Updated:", res.data);
                alert("Profile updated successfully!");
                setEditMode(false);
            })
            .catch((err) => console.error("❌ Error updating profile:", err));
    };

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>

            <div className="profile-field">
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} disabled={!editMode} />
            </div>

            <div className="profile-field">
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} disabled={!editMode} />
            </div>

            <div className="profile-field">
                <label>Gender:</label>
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} disabled={!editMode} />
            </div>

            <div className="profile-field">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} disabled />
            </div>

            <div className="profile-field">
                <label>Phone:</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={!editMode} />
            </div>

            <div className="profile-field">
                <label>Address:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={!editMode} />
            </div>

            {!editMode ? (
                <button className="edit-btn" onClick={() => setEditMode(true)}>Edit Profile</button>
            ) : (
                <div className="button-group">
                    <button className="save-btn" onClick={handleUpdate}>Save Changes</button>
                    <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
