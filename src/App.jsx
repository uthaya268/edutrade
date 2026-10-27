import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Head from "./header/head.jsx";
import Navbar from "./navbar/navbar.jsx";
import Showcom from "./components/view/showcom.jsx";
import Detail from "./details/prodetail.jsx";
import Footer from "./footer/footer.jsx";
import Cart from "./cart/cart.jsx";
import Sell from './sell/sell.jsx'
import Sproduct from './sell/sproduct.jsx'
import Ordertrack from './orders/ordertrack.jsx'
import { CartProvider } from "./cartcontext/cartcontext.jsx";

import Order from "./orders/orders.jsx";
import Buynow from "./buynow/buynow.jsx";

const App = () => {

    // Login state
    const [showlogin, setShowlogin] = useState(false);
    const [user, setUser] = useState(false);
    const [showuser, setShowuser] = useState(false);
    const [name, setName] = useState("");

    // Orders state
    const [orders, setOrders] = useState([]);

    return (
        <CartProvider>

            {/* NAVBAR */}
            <Navbar
                setShowlogin={setShowlogin}
                setUser={setUser}
                user={user}
                setShowuser={setShowuser}
                showuser={showuser}
                name={name}
            />

            {/* ROUTES */}
            <Routes>

                {/* HOME */}
                <Route
                    path="/"
                    element={
                        <Head
                            showlogin={showlogin}
                            setShowlogin={setShowlogin}
                            showuser={showuser}
                            setShowuser={setShowuser}
                            user={user}
                            setUser={setUser}
                            name={name}
                            setName={setName}
                        />
                    }
                />

                {/* PRODUCTS / CATEGORIES */}
                <Route
                    path="/show"
                    element={<Showcom />}
                />

                {/* PRODUCT DETAILS */}
                <Route
                    path="/details"
                    element={<Detail />}
                />

                {/* CART */}
                <Route
                    path="/cart"
                    element={<Cart />}
                />

                {/* BUY NOW */}
                <Route
                    path="/buy"
                    element={
                        <Buynow
                            orders={orders}
                            setOrders={setOrders}
                        />
                    }
                />

                {/* ORDERS */}
                <Route
                    path="/order"
                    element={
                        <Order
                            orders={orders}
                        />
                    }
                />
                <Route path="/sell" element={<Sell></Sell>}></Route>
                <Route path="/sproduct" element={<Sproduct></Sproduct>}></Route>
                <Route path="/ordertrack" element={<Ordertrack></Ordertrack>}></Route>

            </Routes>

            {/* FOOTER */}
            <Footer />

        </CartProvider>
    );
};

export default App;