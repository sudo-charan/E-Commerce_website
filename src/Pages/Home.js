import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/* Categories Section */}
            <div className="categories">
                <h2>Shop by Category</h2>
                <div className="category-list">
                    <Link to="/mobiles" className="category">
                        <img src="https://source.unsplash.com/100x100/?smartphone" alt="Mobiles" />
                        <p>Mobiles</p>
                    </Link>
                    <Link to="/fashion" className="category">
                        <img src="https://source.unsplash.com/100x100/?fashion" alt="Fashion" />
                        <p>Fashion</p>
                    </Link>
                    <Link to="/electronics" className="category">
                        <img src="https://source.unsplash.com/100x100/?laptop,computer" alt="Electronics" />
                        <p>Electronics</p>
                    </Link>
                    <Link to="/home-kitchen" className="category">
                        <img src="https://source.unsplash.com/100x100/?kitchen" alt="Home & Kitchen" />
                        <p>Home & Kitchen</p>
                    </Link>
                    <Link to="/appliances" className="category">
                        <img src="https://source.unsplash.com/100x100/?appliances" alt="Appliances" />
                        <p>Appliances</p>
                    </Link>
                    <Link to="/beauty" className="category">
                        <img src="https://source.unsplash.com/100x100/?cosmetics" alt="Beauty" />
                        <p>Beauty</p>
                    </Link>
                    <Link to="/toys" className="category">
                        <img src="https://source.unsplash.com/100x100/?toys" alt="Toys" />
                        <p>Toys</p>
                    </Link>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="products-section">
                <h2>Featured Products</h2>
                <div className="products">
                    <Link to="/mobiles" className="product">
                        <img src="https://source.unsplash.com/200x200/?mobile" alt="Smartphone" />
                        <p>Smartphone</p>
                        <p className="price">₹14,999</p>
                    </Link>
                    <Link to="/electronics" className="product">
                        <img src="https://source.unsplash.com/200x200/?headphones" alt="Earbuds" />
                        <p>Wireless Earbuds</p>
                        <p className="price">₹1,999</p>
                    </Link>
                    <Link to="/fashion" className="product">
                        <img src="https://source.unsplash.com/200x200/?tshirt" alt="T-Shirt" />
                        <p>Men’s T-Shirt</p>
                        <p className="price">₹799</p>
                    </Link>
                    <Link to="/appliances" className="product">
                        <img src="https://source.unsplash.com/200x200/?fridge" alt="Refrigerator" />
                        <p>Double Door Refrigerator</p>
                        <p className="price">₹24,999</p>
                    </Link>
                    <Link to="/home-kitchen" className="product">
                        <img src="https://source.unsplash.com/200x200/?sofa" alt="Sofa Set" />
                        <p>Luxury Sofa Set</p>
                        <p className="price">₹49,999</p>
                    </Link>
                    <Link to="/fashion" className="product">
                        <img src="https://source.unsplash.com/200x200/?shoes" alt="Running Shoes" />
                        <p>Running Shoes</p>
                        <p className="price">₹1,499</p>
                    </Link>
                    <Link to="/beauty" className="product">
                        <img src="https://source.unsplash.com/200x200/?perfume" alt="Perfume" />
                        <p>Luxury Perfume</p>
                        <p className="price">₹3,499</p>
                    </Link>
                    <Link to="/electronics" className="product">
                        <img src="https://source.unsplash.com/200x200/?laptop" alt="Gaming Laptop" />
                        <p>Gaming Laptop</p>
                        <p className="price">₹79,999</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
