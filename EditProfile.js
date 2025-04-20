// pages/EditProfile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/editProfile.css";

const EditProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/login");
        } else {
            setFormData({ name: storedUser.name, email: storedUser.email });
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would normally send data to your backend.
        // For now, we just update localStorage.
        localStorage.setItem("user", JSON.stringify(formData));
        alert("Profile updated!");
        navigate("/profile");
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form className="edit-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <div className="form-actions">
                    <button type="submit" className="save-btn">Save</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate("/profile")}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
