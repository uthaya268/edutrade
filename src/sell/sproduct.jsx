import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sproduct.css";

const SellerProducts = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const savedProducts =
            JSON.parse(localStorage.getItem("sellerProducts")) || [];

        setProducts(savedProducts);
    }, []);

    // Delete product
    const deleteProduct = (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        const updatedProducts = products.filter(
            (product) => product.id !== id
        );

        localStorage.setItem(
            "sellerProducts",
            JSON.stringify(updatedProducts)
        );

        setProducts(updatedProducts);
    };

    // Get first image
    const getMainImage = (product) => {
        if (product.images?.image1) {
            return product.images.image1;
        }

        return "https://via.placeholder.com/300x220?text=No+Image";
    };

    return (
        <div className="seller-products-page">

            {/* Header */}
            <div className="seller-products-header">

                <div>
                    <h1>My Products</h1>
                    <p>
                        Products you have listed on EduTrade
                    </p>
                </div>

                <button
                    className="add-product-btn"
                    onClick={() => navigate("/sell")}
                >
                    <i className="bi bi-plus-lg"></i>
                    Sell New Product
                </button>

            </div>

            {/* Product Count */}
            <div className="product-count">
                <i className="bi bi-box-seam"></i>

                <span>
                    {products.length}{" "}
                    {products.length === 1
                        ? "Product"
                        : "Products"} Listed
                </span>
            </div>

            {/* Products */}
            {products.length === 0 ? (

                <div className="empty-products">

                    <div className="empty-icon">
                        <i className="bi bi-box-seam"></i>
                    </div>

                    <h2>No Products Listed</h2>

                    <p>
                        You haven't listed any products yet.
                        Start selling your unused items to other
                        students.
                    </p>

                    <button
                        onClick={() => navigate("/sell")}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Sell Your First Product
                    </button>

                </div>

            ) : (

                <div className="seller-product-grid">

                    {products.map((product) => (

                        <div
                            className="seller-product-card"
                            key={product.id}
                        >

                            {/* Image */}
                            <div className="seller-product-image">

                                <img
                                    src={getMainImage(product)}
                                    alt={product.name}
                                />

                                <span className="condition-badge">
                                    {product.condition}
                                </span>

                            </div>

                            {/* Details */}
                            <div className="seller-product-details">

                                <span className="category">
                                    {product.category}
                                </span>

                                <h2>
                                    {product.name}
                                </h2>

                                <p className="description">
                                    {product.description}
                                </p>

                                <div className="product-price">
                                    ₹{product.price}
                                </div>

                                {product.department && (
                                    <div className="product-info">
                                        <i className="bi bi-mortarboard"></i>
                                        {product.department}
                                    </div>
                                )}

                                {product.sellerName && (
                                    <div className="product-info">
                                        <i className="bi bi-person"></i>
                                        {product.sellerName}
                                    </div>
                                )}

                                {product.phone && (
                                    <div className="product-info">
                                        <i className="bi bi-telephone"></i>
                                        {product.phone}
                                    </div>
                                )}

                                <div className="product-date">
                                    Listed on {product.date}
                                </div>

                                {/* Actions */}
                                <div className="product-actions">

                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            navigate(
                                                `/product/${product.id}`,
                                                {
                                                    state: {
                                                        product
                                                    }
                                                }
                                            )
                                        }
                                    >
                                        <i className="bi bi-eye"></i>
                                        View
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        <i className="bi bi-trash"></i>
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default SellerProducts;