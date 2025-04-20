// pages/HomePage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/global.css";

const HomePage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="home-container">
            <h1 className="bubbly-title">ShareLoop</h1>
            <p className="subtitle">Welcome to a community of sharing!</p>
            {user && <p className="welcome-msg">Hello, {user.name}!</p>}

            <div className="options">
                <Link to="/buy" className="option">
                    <img src="/assets/buy.png" alt="Buy" />
                    <p>Buy</p>
                </Link>

                <Link to="/sell" className="option">
                    <img src="/assets/sell.png" alt="Sell" />
                    <p>Sell</p>
                </Link>

                <Link to="/profile" className="option" onClick={() => console.log("✅ Profile clicked!")}>
                    <img src="/assets/profile.png" alt="Profile" />
                    <p>Profile</p>
                </Link>
            </div>

            {user && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </div>
    );
};

export default HomePage;
