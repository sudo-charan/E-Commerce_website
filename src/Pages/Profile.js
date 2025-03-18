import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css";

const Profile = () => {
    const userId = 15; // Hardcoded for now, replace with localStorage.getItem("userId")
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        email: "",
        phone: "",
        address: "",
    });
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    // ✅ Fetch user details on mount
    useEffect(() => {
        axios.get(`http://localhost:5000/profile/${userId}`)
            .then(res => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching user:", err);
                setLoading(false);
            });
    }, [userId]);

    // ✅ Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle profile update
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/profile/${userId}`, formData)
            .then(() => {
                alert("Profile updated successfully!");
                setEditMode(false);
            })
            .catch(err => console.error("Error updating profile:", err));
    };

    if (loading) return <h2>Loading...</h2>;

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
