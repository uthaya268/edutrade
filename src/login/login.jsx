import React, { useState } from "react";
import "./login.css";
import { user } from "../assets/user.js";

const Login = ({ setShowlogin, setUser, setName }) => {

    // ================= LOGIN / SIGN UP STATE =================

    const [currState, setCurrState] = useState("Log in");

    // ================= FORM VALUES =================

    const [name, setLocalName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // ================= PASSWORD VISIBILITY =================

    const [showPassword, setShowPassword] = useState(false);

    // ================= ERROR =================

    const [error, setError] = useState("");

    // ================= SUBMIT FORM =================

    const submit = (e) => {

        e.preventDefault();

        // Clear previous error
        setError("");

        // =====================================================
        // SIGN UP
        // =====================================================

        if (currState === "Sign Up") {

            // Name validation
            if (name.trim() === "") {
                setError("Please enter your name");
                return;
            }

            // Email validation
            if (email.trim() === "") {
                setError("Please enter your email");
                return;
            }

            // Password validation
            if (password.trim() === "") {
                setError("Please enter your password");
                return;
            }

            // Password length validation
            if (password.length < 6) {
                setError("Password must contain at least 6 characters");
                return;
            }

            // -------------------------------------------------
            // SIGN UP SUCCESS
            // -------------------------------------------------

            setName(name.trim());

            setUser(true);

            setShowlogin(false);

            console.log("Account created successfully");

            return;
        }

        // =====================================================
        // LOGIN
        // =====================================================

        // Email validation
        if (email.trim() === "") {
            setError("Please enter your email");
            return;
        }

        // Password validation
        if (password.trim() === "") {
            setError("Please enter your password");
            return;
        }

        // Password length validation
        if (password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }

        // =====================================================
        // CHECK USER FROM user.js
        // =====================================================

        const enteredEmail = email.trim();

        /*
         * user.js contains an ARRAY:
         *
         * export const user = [
         *     {
         *         email: "uk@gmail.com",
         *         password: "ukukuk",
         *         name: "udhaya"
         *     }
         * ];
         *
         * Therefore we use .find()
         */

        const foundUser = user.find(
            (u) =>
                u.email === enteredEmail &&
                u.password === password
        );

        // =====================================================
        // LOGIN FAILED
        // =====================================================

        if (!foundUser) {

            setError("Username or Password are incorrect");

            return;
        }

        // =====================================================
        // LOGIN SUCCESS
        // =====================================================

        console.log("Login successful");
        console.log("User:", foundUser);

        // Set username
        setName(foundUser.name);

        // Set logged-in state
        setUser(true);

        // Close login popup
        setShowlogin(false);
    };

    // ================= CHANGE LOGIN / SIGN UP =================

    const changeState = () => {

        // Clear error
        setError("");

        // Change state
        if (currState === "Log in") {
            setCurrState("Sign Up");
        } else {
            setCurrState("Log in");
        }

        // Clear form
        setLocalName("");
        setEmail("");
        setPassword("");

        // Reset password visibility
        setShowPassword(false);
    };

    // ================= CLOSE LOGIN =================

    const closeLogin = () => {

        setShowlogin(false);

        // Clear error
        setError("");

        // Clear form
        setLocalName("");
        setEmail("");
        setPassword("");
    };

    // ================= RETURN =================

    return (

        <div className="login-overlay">

            <div className="login-container">

                {/* =================================================
                    CLOSE BUTTON
                ================================================= */}

                <button
                    type="button"
                    className="login-close"
                    onClick={closeLogin}
                    aria-label="Close login"
                >
                    <i className="bi bi-x-lg"></i>
                </button>


                {/* =================================================
                    LOGIN HEADER
                ================================================= */}

                <div className="login-header">

                    {/* User Icon */}

                    <div className="login-icon">

                        <i className="bi bi-person-fill"></i>

                    </div>


                    {/* Heading */}

                    <h2>

                        {currState === "Sign Up"
                            ? "Create Account"
                            : "Welcome Back"}

                    </h2>


                    {/* Description */}

                    <p>

                        {currState === "Sign Up"
                            ? "Create your EduTrade account"
                            : "Login to continue to EduTrade"}

                    </p>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form onSubmit={submit}>

                    {/* =================================================
                        NAME
                    ================================================= */}

                    {currState === "Sign Up" && (

                        <div className="input-group">

                            <label>
                                Full Name
                            </label>


                            <div className="input-box">

                                <i className="bi bi-person"></i>


                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setLocalName(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                    autoComplete="name"
                                />

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        EMAIL
                    ================================================= */}

                    <div className="input-group">

                        <label>
                            Email Address
                        </label>


                        <div className="input-box">

                            <i className="bi bi-envelope"></i>


                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="Enter your email"
                                autoComplete="email"
                            />

                        </div>

                    </div>


                    {/* =================================================
                        PASSWORD
                    ================================================= */}

                    <div className="input-group">

                        <label>
                            Password
                        </label>


                        <div className="input-box">

                            <i className="bi bi-lock"></i>


                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                placeholder="Enter your password"
                                autoComplete={
                                    currState === "Sign Up"
                                        ? "new-password"
                                        : "current-password"
                                }
                            />


                            {/* Password Eye */}

                            <i
                                className={
                                    showPassword
                                        ? "bi bi-eye-slash password-icon"
                                        : "bi bi-eye password-icon"
                                }
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                role="button"
                                tabIndex="0"
                                title={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            ></i>

                        </div>

                    </div>


                    {/* =================================================
                        ERROR MESSAGE
                    ================================================= */}

                    {error && (

                        <p className="login-error">

                            <i className="bi bi-exclamation-circle"></i>

                            {" "}

                            {error}

                        </p>

                    )}


                    {/* =================================================
                        TERMS AND CONDITIONS
                    ================================================= */}

                    <div className="login-condition">

                        <input
                            type="checkbox"
                            required
                            className="check-box"
                        />


                        <p>

                            I agree to the{" "}

                            <span>
                                Terms and Conditions
                            </span>

                        </p>

                    </div>


                    {/* =================================================
                        SUBMIT BUTTON
                    ================================================= */}

                    <button
                        type="submit"
                        className="login-submit"
                    >

                        {currState === "Sign Up"
                            ? "Create Account"
                            : "Log In"}


                        <i className="bi bi-arrow-right"></i>

                    </button>


                    {/* =================================================
                        SWITCH LOGIN / SIGN UP
                    ================================================= */}

                    <div className="login-switch">

                        {currState === "Sign Up" ? (

                            <p>

                                Already have an account?{" "}

                                <span onClick={changeState}>

                                    Log In

                                </span>

                            </p>

                        ) : (

                            <p>

                                Don't have an account?{" "}

                                <span onClick={changeState}>

                                    Create Account

                                </span>

                            </p>

                        )}

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Login;