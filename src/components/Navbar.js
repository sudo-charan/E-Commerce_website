import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaSearch, FaShoppingCart, FaHeart, FaClipboardList, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa"; 
import "../styles/Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername && storedUsername !== "undefined") {
            setUsername(storedUsername);
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        axios.post("http://localhost:5000/auth/logout")
            .then(() => {
                localStorage.removeItem("userToken");  // ✅ Clear JWT
                localStorage.removeItem("username");   // ✅ Clear username
                setIsAuthenticated(false); // ✅ Update state
                setUsername("");
                navigate("/signin");
                setTimeout(() => window.location.reload(), 200); // ✅ Force refresh after a slight delay
            })
            .catch(error => console.error("Logout error:", error));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <nav className="navbar">
            {/* Left Section (Logo) */}
            <div className="navbar-left">
                <Link to="/" className="logo-link">
                    <h1 className="logo">Nittekart</h1>
                </Link>
            </div>

            {/* Center Section (Search Bar) */}
            <form className="search-box" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-icon"><FaSearch /></button>
            </form>

            {/* Right Section (Profile, Cart, Wishlist) */}
            <div className="navbar-right">
                <div className="profile-dropdown">
                    <button className="profile-button">
                        <FaUser /> {isAuthenticated ? username : "Login"} ▼
                    </button>
                    <div className="dropdown-content">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile"><FaUser /> Profile</Link>
                                <Link to="/wishlist"><FaHeart /> Wishlist</Link>
                                <Link to="/orders"><FaClipboardList /> Orders</Link>
                                <Link to="#" onClick={handleLogout}><FaSignOutAlt /> Logout</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/signin"><FaSignInAlt /> Login</Link>
                                <Link to="/signup"><FaUserPlus /> Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
                <Link className="cartlink" to="/cart">
                    <p className="cart-button"><FaShoppingCart /> Cart</p>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
