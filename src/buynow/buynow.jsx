import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./buynow.css";

const BuyNow = ({ orders, setOrders }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state?.product;

    const [quantity, setQuantity] = useState(1);

    // Delivery details
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Payment
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

    // UPI
    const [upiId, setUpiId] = useState("");

    // Card
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    if (!product) {
        return (
            <div className="no-product">
                <h2>No Product Selected</h2>

                <button onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const price = Number(product.price) || 0;
    const totalPrice = price * quantity;

    // Increase quantity
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // Decrease quantity
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    // Format card number
    const handleCardNumber = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 16) {
            value = value.slice(0, 16);
        }

        // Add space after every 4 digits
        value = value.replace(/(.{4})/g, "$1 ").trim();

        setCardNumber(value);
    };

    // Format expiry date
    const handleExpiryDate = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        if (value.length >= 3) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }

        setExpiryDate(value);
    };

    // CVV
    const handleCVV = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 3) {
            value = value.slice(0, 3);
        }

        setCvv(value);
    };

    // Validate payment
    const validatePayment = () => {
        if (paymentMethod === "UPI") {
            if (!upiId.trim()) {
                alert("Please enter your UPI ID");
                return false;
            }

            // Basic UPI validation
            const upiRegex = /^[\w.-]+@[\w.-]+$/;

            if (!upiRegex.test(upiId)) {
                alert("Please enter a valid UPI ID\nExample: username@upi");
                return false;
            }
        }

        if (paymentMethod === "Card") {
            const cleanCardNumber = cardNumber.replace(/\s/g, "");

            if (cleanCardNumber.length !== 16) {
                alert("Please enter a valid 16-digit card number");
                return false;
            }

            if (!cardName.trim()) {
                alert("Please enter the card holder name");
                return false;
            }

            if (expiryDate.length !== 5) {
                alert("Please enter a valid expiry date");
                return false;
            }

            if (cvv.length !== 3) {
                alert("Please enter a valid 3-digit CVV");
                return false;
            }
        }

        return true;
    };

    // Place order
    const placeOrder = () => {
        // Delivery validation
        if (!fullName.trim()) {
            alert("Please enter your full name");
            return;
        }

        if (!phone.trim()) {
            alert("Please enter your phone number");
            return;
        }

        if (phone.length < 10) {
            alert("Please enter a valid phone number");
            return;
        }

        if (!address.trim()) {
            alert("Please enter your delivery address");
            return;
        }

        // Payment validation
        if (!validatePayment()) {
            return;
        }

        // Payment information
        let paymentDetails = {};

        if (paymentMethod === "UPI") {
            paymentDetails = {
                upiId: upiId
            };
        }

        if (paymentMethod === "Card") {
            paymentDetails = {
                cardNumber: "**** **** **** " + cardNumber.replace(/\s/g, "").slice(-4),
                cardName: cardName,
                expiryDate: expiryDate
            };
        }

        // Create order
        const newOrder = {
            id: Date.now(),

            product: product,

            quantity: quantity,

            totalPrice: totalPrice,

            status: "Order Placed",

            paymentMethod: paymentMethod,

            paymentDetails: paymentDetails,

            deliveryDetails: {
                fullName: fullName,
                phone: phone,
                address: address
            },

            orderDate: new Date().toLocaleString()
        };

        // Add order
        setOrders((prevOrders) => [
            ...prevOrders,
            newOrder
        ]);

        alert("Order placed successfully!");

        // Go to Orders page
        navigate("/order");
    };

    return (
        <div className="buy-now-page">

            <div className="buy-now-container">

                {/* ================= LEFT SIDE ================= */}

                <div className="product-section">

                    {/* ORDER DETAILS */}

                    <h2>Order Details</h2>

                    <div className="buy-product">

                        <div className="buy-product-image">

                            <img
                                src={
                                    product.images?.image1 ||
                                    product.image ||
                                    "/images/default.png"
                                }
                                alt={product.name}
                            />

                        </div>

                        <div className="buy-product-details">

                            <h3>{product.name}</h3>

                            <p className="category">
                                Category: {product.category}
                            </p>

                            <p className="condition">
                                Condition: {product.condition || "Good"}
                            </p>

                            <h3 className="product-price">
                                ₹{price}
                            </h3>

                            {/* QUANTITY */}

                            <div className="quantity">

                                <span>Quantity:</span>

                                <button onClick={decreaseQuantity}>
                                    −
                                </button>

                                <span className="quantity-number">
                                    {quantity}
                                </span>

                                <button onClick={increaseQuantity}>
                                    +
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ================= DELIVERY DETAILS ================= */}

                    <div className="delivery-section">

                        <h2>Delivery Details</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(e.target.value)
                            }
                        />

                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            maxLength="10"
                            onChange={(e) => {
                                const value =
                                    e.target.value.replace(/\D/g, "");

                                setPhone(value);
                            }}
                        />

                        <textarea
                            placeholder="Delivery Address"
                            rows="4"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                        ></textarea>

                    </div>


                    {/* ================= PAYMENT ================= */}

                    <div className="payment-section">

                        <h2>Payment Method</h2>

                        {/* COD */}

                        <label className="payment-option">

                            <input
                                type="radio"
                                name="payment"
                                value="Cash on Delivery"
                                checked={
                                    paymentMethod ===
                                    "Cash on Delivery"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            <span>
                                <i className="bi bi-cash-stack"></i>
                                Cash on Delivery
                            </span>

                        </label>


                        {/* UPI */}

                        <label className="payment-option">

                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={paymentMethod === "UPI"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            <span>
                                <i className="bi bi-phone"></i>
                                UPI
                            </span>

                        </label>


                        {/* UPI INPUT */}

                        {paymentMethod === "UPI" && (

                            <div className="payment-details upi-details">

                                <label>
                                    UPI ID
                                </label>

                                <input
                                    type="text"
                                    placeholder="example@upi"
                                    value={upiId}
                                    onChange={(e) =>
                                        setUpiId(e.target.value)
                                    }
                                />

                                <p className="payment-info">
                                    Example: yourname@oksbi
                                </p>

                            </div>

                        )}


                        {/* CARD */}

                        <label className="payment-option">

                            <input
                                type="radio"
                                name="payment"
                                value="Card"
                                checked={paymentMethod === "Card"}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            />

                            <span>
                                <i className="bi bi-credit-card"></i>
                                Card
                            </span>

                        </label>


                        {/* CARD DETAILS */}

                        {paymentMethod === "Card" && (

                            <div className="payment-details card-details">

                                {/* CARD NUMBER */}

                                <label>
                                    Card Number
                                </label>

                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    maxLength="19"
                                    onChange={handleCardNumber}
                                />


                                {/* CARD NAME */}

                                <label>
                                    Card Holder Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Name on Card"
                                    value={cardName}
                                    onChange={(e) =>
                                        setCardName(e.target.value)
                                    }
                                />


                                {/* EXPIRY + CVV */}

                                <div className="card-row">

                                    <div>

                                        <label>
                                            Expiry Date
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiryDate}
                                            maxLength="5"
                                            onChange={handleExpiryDate}
                                        />

                                    </div>


                                    <div>

                                        <label>
                                            CVV
                                        </label>

                                        <input
                                            type="password"
                                            placeholder="***"
                                            value={cvv}
                                            maxLength="3"
                                            onChange={handleCVV}
                                        />

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}

                <div className="order-summary">

                    <h2>Order Summary</h2>

                    <div className="summary-row">

                        <span>
                            Product Price
                        </span>

                        <span>
                            ₹{price}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Quantity
                        </span>

                        <span>
                            {quantity}
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <span className="free">
                            FREE
                        </span>

                    </div>


                    <div className="summary-row">

                        <span>
                            Payment
                        </span>

                        <span>
                            {paymentMethod}
                        </span>

                    </div>


                    <hr />


                    <div className="summary-total">

                        <span>
                            Total Amount
                        </span>

                        <span>
                            ₹{totalPrice}
                        </span>

                    </div>


                    {/* PLACE ORDER */}

                    <button
                        className="place-order"
                        onClick={placeOrder}
                    >
                        Place Order

                        <i className="bi bi-check-circle-fill"></i>

                    </button>


                    {/* CONTINUE SHOPPING */}

                    <button
                        className="continue-shopping"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        </div>
    );
};

export default BuyNow;