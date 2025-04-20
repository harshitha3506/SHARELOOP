console.log("✅ Profile component loaded");
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
    console.log("🚀 Profile component is loading...");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [uploadedItems, setUploadedItems] = useState([
        { id: 1, name: "Study Guide" },
        { id: 2, name: "Microwave" },
        { id: 3, name: "Winter Coat" }
    ]);

    const boughtItems = [
        { id: 101, name: "Laptop Charger" },
        { id: 102, name: "Wooden Chair" }
    ];

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            navigate("/login"); // Redirect to login if not authenticated
        } else {
            setUser(storedUser);
            setLoading(false); // ✅ Only stop loading if user is valid
        }
    }, [navigate]);

    // Remove uploaded item
    const removeUploadedItem = (id) => {
        setUploadedItems(prev => prev.filter(item => item.id !== id));
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        alert("Logged out successfully!");
        navigate("/login");
    };

    // Show loading while checking user
    if (loading) return <p>Loading profile...</p>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-info">
                    <img src="/assets/profile-placeholder.png" alt="Profile" className="profile-pic" />
                    <div>
                        <h2>{user ? user.name : "Guest"}</h2>
                        <p>Email: {user ? user.email : "N/A"}</p>
                    </div>
                </div>
                <button className="edit-btn" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            </div>

            <div className="items-section">
                <div className="items-list">
                    <h3>Items Bought</h3>
                    <div className="items-horizontal">
                        {boughtItems.length > 0 ? (
                            boughtItems.map(item => (
                                <div key={item.id} className="item-box">{item.name}</div>
                            ))
                        ) : (
                            <p>No items bought yet.</p>
                        )}
                    </div>
                </div>

                <div className="items-list">
                    <h3>Items Uploaded</h3>
                    <div className="items-horizontal">
                        {uploadedItems.length > 0 ? (
                            uploadedItems.map(item => (
                                <div key={item.id} className="item-box">
                                    {item.name}
                                    <button className="remove-btn" onClick={() => removeUploadedItem(item.id)}>✖</button>
                                </div>
                            ))
                        ) : (
                            <p>No items uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>

            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
