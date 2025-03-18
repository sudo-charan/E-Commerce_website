import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategoryNavbar.css";

const categories = [
    { name: "Grocery", img: "https://rukminim2.flixcart.com/flap/64/64/image/29327f40e9c4d26b.webp" },
    { name: "Mobiles", img: "https://rukminim2.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.webp" },
    { name: "Fashion", img: "https://rukminim2.flixcart.com/flap/64/64/image/0d75b34f7d8fbcb3.webp" },
    { name: "Electronics", img: "https://rukminim2.flixcart.com/flap/64/64/image/69c6589653afdb9a.webp" },
    { name: "Home & Furniture", img: "https://rukminim2.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.webp" },
    { name: "Appliances", img: "https://rukminim2.flixcart.com/flap/64/64/image/0139228b2f7eb413.webp" },
    { name: "Travel", img: "https://rukminim2.flixcart.com/flap/64/64/image/71050627a56b4693.webp" },
    { name: "Beauty, Toys & More", img: "https://rukminim2.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.webp" },
    { name: "Two Wheelers", img: "https://rukminim2.flixcart.com/flap/64/64/image/05d708653beff580.webp" }
];

const CategoryNavbar = () => {
    return (
        <div className="category-navbar">
            {categories.map((category, index) => (
                <Link key={index} to={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`} className="category-item">
                    <img src={category.img} alt={category.name} />
                    <span>{category.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default CategoryNavbar;
