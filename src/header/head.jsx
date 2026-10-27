import React from "react";

import Slide from "../slider/slider";
import Component from "../components/component.jsx";
import Product from "../products/product.jsx";

import Login from "../login/login.jsx";
import User from "../login/user.jsx";


const Head = ({
    showlogin,
    showuser,

    setShowlogin,
    setShowuser,

    setName,
    setUser,

    user,
    name
}) => {

    return (
        <div>

            {/* ================= LOGIN POPUP ================= */}

            {showlogin && (
                <Login
                    setShowlogin={setShowlogin}
                    setUser={setUser}
                    setName={setName}
                />
            )}


            {/* ================= HOME CONTENT ================= */}

            <Slide />

            <Component />

            <Product />


            {/* ================= USER POPUP ================= */}

            {showuser && (
                <User
                    showuser={showuser}
                    setShowuser={setShowuser}
                    user={user}
                    setUser={setUser}
                    name={name}
                />
            )}

        </div>
    );
};


export default Head;