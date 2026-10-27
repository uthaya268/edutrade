import React from "react";
import { useNavigate } from "react-router-dom";
import "./orders.css";
import {Link} from "react-router-dom"
const Orders = ({ orders = [] }) => {

    const navigate = useNavigate();

    return (
        <div className="orders-page">

            <div className="orders-container">

                <h1>My Orders</h1>

                {orders.length === 0 ? (

                    <div className="no-orders">

                        <i className="bi bi-bag-x"></i>

                        <h2>No Orders Yet</h2>

                        <p>
                            You haven't placed any orders yet.
                        </p>

                        <button onClick={() => navigate("/")}>
                            Start Shopping
                        </button>

                    </div>

                ) : (

                    <div className="orders-list">

                        {orders.map((order, index) => (

                          <Link to="/ordertrack"><div
                                className="order-card"
                                key={index}
                            >

                                <div className="order-image">

                                    <img
                                        src={
                                            order.product?.images?.image1 ||
                                            order.product?.image ||
                                            "/images/default.png"
                                        }
                                        alt={
                                            order.product?.name ||
                                            "Product"
                                        }
                                    />

                                </div>

                                <div className="order-details">

                                    <h3>
                                        {order.product?.name}
                                    </h3>

                                    <p>
                                        Quantity: {order.quantity}
                                    </p>

                                    <p>
                                        Price: ₹{order.totalPrice}
                                    </p>

                                    <p className="order-status">
                                        Status: {order.status}
                                    </p>

                                </div>

                            </div></Link>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
};

export default Orders;