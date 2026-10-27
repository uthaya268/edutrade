import React, { useState } from "react";
import "./navbar.css";

import logo from "../assets/logo.png";
import logo2 from "../assets/llogo.png";

import { material_list } from "../assets/assets.js";

import "bootstrap-icons/font/bootstrap-icons.css";

import { Link } from "react-router-dom";

import { useCart } from "../cartcontext/cartcontext.jsx";


const Navbar = ({
    setShowlogin,
    setUser,
    user,
    setShowuser,
    showuser,
    name
}) => {

    const [iscategory, setIscategory] = useState(true);

    const { cart } = useCart();

    const count = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    return (
        <div className="navbar">

            {/* LOGO */}
            <div className="nav-logo">

                <Link to="/">
                    <img
                        src={logo2}
                        alt="EduTrade"
                    />
                </Link>

            </div>


            {/* SEARCH */}
            <div className="search-box">

                <input
                    type="text"
                    placeholder="Enter your product"
                />

            </div>


            {/* NAVIGATION */}
            <ul className="nav-links">

                {/* HOME */}
                <li>
                    <Link to="/">
                        <i className="bi bi-house-fill"></i>
                        Home
                    </Link>
                </li>


                {/* CATEGORY */}
                <li
                    onClick={() => {
                        setIscategory(!iscategory);
                    }}
                >
                    <i className="bi bi-tags-fill"></i>
                    Category
                </li>


                {/* CART */}
                <li>
                    <Link to="/cart">

                        <i className="bi bi-bag-plus-fill"></i>

                        Cart

                        {count > 0 && (
                            <span className="cart-count">
                                {count}
                            </span>
                        )}

                    </Link>
                </li>


                {/* ORDERS */}
                <li>
                    <Link to="/order">

                        <i className="bi bi-cart-check-fill"></i>

                        Orders

                    </Link>
                </li>


                {/* SELL */}
                <li>
                    <Link to="/sproduct">

                        <i className="bi bi-currency-dollar"></i>

                        Sell

                    </Link>
                </li>

            </ul>


            {/* LOGIN / USER BUTTON */}
            <button
                className="log-but"
                onClick={() => {

                    if (user) {

                        setShowuser(!showuser);

                    } else {

                        setShowlogin(true);

                    }

                }}
            >

                <i className="bi bi-person-fill"></i>

                {user ? name : "Login"}

            </button>


            {/* CATEGORY DROPDOWN */}
            <div
                className={
                    iscategory
                        ? "category"
                        : "category-y"
                }
            >

                {material_list.map((item, index) => (

                    <Link
                        key={item.id || index}
                        to="/show"
                        state={item}
                    >

                        {item.name}

                    </Link>

                ))}

            </div>

        </div>
    );
};


export default Navbar;