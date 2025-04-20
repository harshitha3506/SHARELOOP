import React, { useState } from "react";
import axios from "axios";
import "../styles/sell.css";

const categories = {
    Books: ["Fiction", "Non-fiction", "Textbooks", "Comics"],
    Electronics: ["Phones", "Laptops", "Chargers", "Cables"],
    Furniture: ["Chairs", "Tables", "Beds", "Sofas"],
    Medical: ["Medicines", "Equipment", "Supplies"],
    Clothing: ["Men", "Women", "Kids", "Accessories"],
    "Baby Items": ["Toys", "Clothes", "Utilities"]
};

const SellPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result); // base64 encoded image
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            category: selectedCategory,
            subcategory: selectedSubCategory,
            name: title,
            description,
            image
        };

        try {
            await axios.post("http://localhost:5000/api/items", newItem);
            alert("Item submitted successfully!");
            // Reset form
            setSelectedCategory("");
            setSelectedSubCategory("");
            setTitle("");
            setDescription("");
            setImage(null);
        } catch (error) {
            console.error("Error submitting item:", error);
        }
    };

    return (
        <div className="sell-container">
            <div className="sell-box">
                <h2>Sell an Item</h2>
                <form onSubmit={handleSubmit}>
                    <label>Category:</label>
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {Object.keys(categories).map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>

                    {selectedCategory && (
                        <>
                            <label>Subcategory:</label>
                            <select value={selectedSubCategory} onChange={(e) => setSelectedSubCategory(e.target.value)}>
                                <option value="">Select Subcategory</option>
                                {categories[selectedCategory].map((sub) => (
                                    <option key={sub} value={sub}>{sub}</option>
                                ))}
                            </select>
                        </>
                    )}

                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Description:</label>
                    <textarea
                        placeholder="Describe your item"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <label>Upload Image:</label>
                    <input type="file" onChange={handleImageUpload} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SellPage;
