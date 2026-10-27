import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ordertrack.css";

const OrderTracking = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /*
      Product/order data can be passed from the Orders page
      using navigate("/track-order", { state: { order } })

      If no state is passed, we try to get the latest order
      from localStorage.
    */

    const orderFromPage = location.state?.order;

    const savedOrders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const order =
        orderFromPage ||
        savedOrders[savedOrders.length - 1] ||
        null;

    // User address
    const savedAddress =
        JSON.parse(localStorage.getItem("userAddress")) || {
            name: "User",
            phone: "Not Provided",
            address: "Address not provided",
            city: "",
            state: "",
            pincode: ""
        };

    if (!order) {
        return (
            <div className="tracking-empty">

                <div className="tracking-empty-icon">
                    <i className="bi bi-box-seam"></i>
                </div>

                <h2>Order Not Found</h2>

                <p>
                    We couldn't find the order details.
                </p>

                <button
                    onClick={() => navigate("/order")}
                >
                    ← Back to Orders
                </button>

            </div>
        );
    }

    /*
      Get product information.

      Different order structures are supported so that this
      page can work with your existing order data.
    */

    const product =
        order.product ||
        order.item ||
        order;

    const productName =
        product.name ||
        product.productName ||
        "Product";

    const productImage =
        product.image ||
        product.images?.image1 ||
        product.images?.[0] ||
        product.img ||
        "";

    const quantity =
        order.quantity ||
        product.quantity ||
        1;

    const price =
        order.price ||
        product.price ||
        0;

    const orderId =
        order.orderId ||
        order.id ||
        `EDU${Date.now()}`;

    const orderDate =
        order.date ||
        order.orderDate ||
        new Date().toLocaleDateString();

    const status =
        order.status ||
        "Order Placed";

    /*
      Calculate total
    */
    const totalPrice =
        Number(price) * Number(quantity);

    /*
      Current tracking status.

      You can later get this value from your backend.
    */
    const trackingSteps = [
        {
            title: "Order Placed",
            description: "Your order has been placed successfully.",
            icon: "bi-check-circle-fill",
            completed: true
        },
        {
            title: "Order Confirmed",
            description: "Seller has confirmed your order.",
            icon: "bi-box-seam",
            completed:
                status === "Order Confirmed" ||
                status === "Shipped" ||
                status === "Out for Delivery" ||
                status === "Delivered"
        },
        {
            title: "Shipped",
            description: "Your product is on the way.",
            icon: "bi-truck",
            completed:
                status === "Shipped" ||
                status === "Out for Delivery" ||
                status === "Delivered"
        },
        {
            title: "Out for Delivery",
            description: "Your order is arriving soon.",
            icon: "bi-bicycle",
            completed:
                status === "Out for Delivery" ||
                status === "Delivered"
        },
        {
            title: "Delivered",
            description: "Your order has been delivered.",
            icon: "bi-house-check-fill",
            completed:
                status === "Delivered"
        }
    ];

    return (
        <div className="tracking-page">

            {/* HEADER */}

            <div className="tracking-header">

                <div>
                    <h1>Track Your Order</h1>

                    <p>
                        Track your EduTrade order and delivery
                        details
                    </p>
                </div>

                <button
                    className="back-orders-btn"
                    onClick={() => navigate("/order")}
                >
                    <i className="bi bi-arrow-left"></i>
                    My Orders
                </button>

            </div>


            {/* ORDER SUMMARY */}

            <div className="tracking-layout">

                <div className="tracking-left">

                    {/* PRODUCT CARD */}

                    <div className="tracking-card">

                        <div className="card-heading">
                            <h2>
                                <i className="bi bi-box-seam"></i>
                                Order Details
                            </h2>

                            <span className="order-status">
                                {status}
                            </span>
                        </div>

                        <div className="product-summary">

                            <div className="tracking-product-image">

                                {productImage ? (
                                    <img
                                        src={productImage}
                                        alt={productName}
                                    />
                                ) : (
                                    <div className="no-image">
                                        <i className="bi bi-image"></i>
                                    </div>
                                )}

                            </div>

                            <div className="product-summary-info">

                                <h3>
                                    {productName}
                                </h3>

                                <p>
                                    Quantity:{" "}
                                    <strong>
                                        {quantity}
                                    </strong>
                                </p>

                                <p>
                                    Price:{" "}
                                    <strong>
                                        ₹{price}
                                    </strong>
                                </p>

                                <p>
                                    Order ID:{" "}
                                    <strong>
                                        #{orderId}
                                    </strong>
                                </p>

                            </div>

                        </div>


                        {/* ORDER INFORMATION */}

                        <div className="order-info-grid">

                            <div className="order-info-box">
                                <span>
                                    Order Date
                                </span>

                                <strong>
                                    {orderDate}
                                </strong>
                            </div>

                            <div className="order-info-box">
                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {quantity}
                                </strong>
                            </div>

                            <div className="order-info-box">
                                <span>
                                    Product Price
                                </span>

                                <strong>
                                    ₹{price}
                                </strong>
                            </div>

                            <div className="order-info-box">
                                <span>
                                    Total Amount
                                </span>

                                <strong className="total-price">
                                    ₹{totalPrice}
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* TRACKING */}

                    <div className="tracking-card">

                        <div className="card-heading">

                            <h2>
                                <i className="bi bi-geo-alt"></i>
                                Delivery Tracking
                            </h2>

                        </div>

                        <div className="tracking-timeline">

                            {trackingSteps.map(
                                (step, index) => (

                                    <div
                                        className={`tracking-step ${
                                            step.completed
                                                ? "completed"
                                                : ""
                                        }`}
                                        key={index}
                                    >

                                        <div className="timeline-icon">

                                            <i
                                                className={`bi ${step.icon}`}
                                            ></i>

                                        </div>

                                        <div className="timeline-content">

                                            <h3>
                                                {step.title}
                                            </h3>

                                            <p>
                                                {step.description}
                                            </p>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="tracking-right">

                    {/* DELIVERY ADDRESS */}

                    <div className="tracking-card">

                        <div className="card-heading">

                            <h2>
                                <i className="bi bi-geo-alt-fill"></i>
                                Delivery Address
                            </h2>

                            <button
                                className="edit-address"
                                onClick={() =>
                                    navigate("/address")
                                }
                            >
                                Edit
                            </button>

                        </div>

                        <div className="address-box">

                            <h3>
                                {savedAddress.name}
                            </h3>

                            <p>
                                {savedAddress.address}
                            </p>

                            <p>
                                {savedAddress.city}
                                {savedAddress.city && ", "}
                                {savedAddress.state}
                            </p>

                            <p>
                                PIN: {savedAddress.pincode}
                            </p>

                            <div className="address-phone">

                                <i className="bi bi-telephone-fill"></i>

                                {savedAddress.phone}

                            </div>

                        </div>

                    </div>


                    {/* PAYMENT */}

                    <div className="tracking-card">

                        <div className="card-heading">

                            <h2>
                                <i className="bi bi-credit-card"></i>
                                Payment Details
                            </h2>

                        </div>

                        <div className="payment-details">

                            <div>
                                <span>
                                    Payment Method
                                </span>

                                <strong>
                                    {order.paymentMethod ||
                                        "Cash on Delivery"}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Product Price
                                </span>

                                <strong>
                                    ₹{price}
                                </strong>
                            </div>

                            <div>
                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {quantity}
                                </strong>
                            </div>

                            <div className="payment-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{totalPrice}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* HELP */}

                    <div className="help-card">

                        <i className="bi bi-headset"></i>

                        <div>

                            <h3>
                                Need Help?
                            </h3>

                            <p>
                                Contact EduTrade support if
                                you have any questions about
                                your order.
                            </p>

                            <button>
                                Contact Support
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderTracking;