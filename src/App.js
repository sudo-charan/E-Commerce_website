import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Orders from "./Pages/Orders.js";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const userToken = localStorage.getItem("userToken");
        const storedUsername = localStorage.getItem("username");

        if (userToken) {
            setIsAuthenticated(true);
            setUsername(storedUsername || ""); // Load username from localStorage
        }
    }, []);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username} />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Pass setUsername so the username is updated after login/signup */}
                <Route path="/signin" element={isAuthenticated ? <Navigate to="/" /> : <SignIn setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp setIsAuthenticated={setIsAuthenticated} setUsername={setUsername} />} />

                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />} />
                <Route path="/wishlist" element={isAuthenticated ? <Wishlist /> : <Navigate to="/signin" />} />
                <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/signin" />} />
                <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/signin" />} />
            </Routes>   
        </Router>
    );
}

export default App;
