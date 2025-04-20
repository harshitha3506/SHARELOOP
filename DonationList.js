import React, { useState, useEffect } from 'react';
import API from '../api'; // Import the API helper

function DonationList() {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await API.getDonations();
                setDonations(response.data);
            } catch (error) {
                console.error('Failed to fetch donations:', error);
            }
        };

        fetchDonations();
    }, []);

    return (
        <div>
            {donations.map(donation => (
                <div key={donation._id}>{donation.title}</div>
            ))}
        </div>
    );
}

export default DonationList;