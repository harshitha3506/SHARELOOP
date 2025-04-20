import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/buy.css";

const categories = {
    "Books": ["Fiction", "Study Guides", "Textbooks"],
    "Furniture & Home Essentials": ["Furniture", "Home Appliances", "Kitchenware", "Bedding"],
    "Medical & Health Supplies": ["Wheelchairs, Crutches, Walkers", "First Aid Kits", "Medical Cushions"],
    "Clothing & Accessories": ["Adult Clothing", "Shoes", "Winter Wear", "Bags & Accessories"],
    "Baby & Toddler Items": ["Baby Clothes", "Strollers", "Toys & Books"],
    "Electronic Gadgets": ["Phones", "Chargers", "Small Appliances"],
    "General Items": ["Household Items", "Unopened Food", "Tools", "Books & Games"]
};

const BuyPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const params = {};
                if (selectedCategory) params.category = selectedCategory;
                if (selectedSubCategory) params.subcategory = selectedSubCategory;
                if (searchQuery) params.q = searchQuery;

                const response = await axios.get("http://localhost:5000/api/items", { params });
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        if (selectedCategory || selectedSubCategory || searchQuery) {
            fetchItems();
        } else {
            setItems([]);
        }
    }, [selectedCategory, selectedSubCategory, searchQuery]);

    return (
        <div className="buy-container">
            <h2>🛍️ Explore Items</h2>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="category-section">
                <h3>Main Categories</h3>
                <div className="main-categories">
                    {Object.keys(categories).map(cat => (
                        <button
                            key={cat}
                            className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setSelectedSubCategory("");
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {selectedCategory && (
                    <>
                        <h4>Subcategories in {selectedCategory}</h4>
                        <div className="sub-categories">
                            {categories[selectedCategory].map(sub => (
                                <button
                                    key={sub}
                                    className={`subcategory-btn ${selectedSubCategory === sub ? "active" : ""}`}
                                    onClick={() => setSelectedSubCategory(sub)}
                                >
                                    {sub}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="items-display">
                {items.length > 0 ? (
                    <div className="items-grid">
                        {items.map(item => (
                            <div key={item._id} className="item-card">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <h4>{item.name}</h4>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    selectedSubCategory && <p className="no-items">No items found in this subcategory.</p>
                )}
            </div>
        </div>
    );
};

export default BuyPage;
