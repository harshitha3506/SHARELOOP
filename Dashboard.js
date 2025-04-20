import React from "react";
import "../styles/global.css";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Welcome to ShareLoop</h2>
                <p>Select an option to continue:</p>
                <div className="dashboard-options">
                    <a href="/buy" className="dashboard-btn">🛒 To Buy</a>
                    <a href="/sell" className="dashboard-btn">📦 To Sell</a>
                    <a href="/profile" className="dashboard-btn">👤 Profile</a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
