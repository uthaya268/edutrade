import React, { useEffect, useState } from "react";
import "./product.css";
import { Link } from "react-router-dom";
import { product_items } from "../assets/products.js";

const Product = () => {

    const [wish, setWish] = useState([]);

    const [sellerProducts, setSellerProducts] = useState([]);

    // // Load seller products
    // useEffect(() => {

    //     const savedProducts =
    //         JSON.parse(
    //             localStorage.getItem("sellerProducts")
    //         ) || [];

    //     setSellerProducts(savedProducts);

    // }, []);

    // Combine original products + seller products
    const allProducts = [
        ...product_items,
        ...sellerProducts
    ];

    // Featured products
    const featuredProducts = allProducts.filter(
        (product) =>
            product.sellerProduct ||
            product.id % 5 === 0
    );

    // Wishlist
    const togglelist = (id) => {

        setWish((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );

    };

    return (
        <>

            <h2>Featured Products</h2>

            <div className="product">

                {featuredProducts.map((product) => (

                    <div
                        className="fea-prod"
                        key={product.id}
                    >

                        {/* PRODUCT IMAGE */}

                        <div className="prod-img">

                            <img
                                src={
                                    product.images?.image1 ||
                                    product.image ||
                                    "/images/default.png"
                                }
                                alt={product.name}
                                className="p-img"
                            />

                        </div>


                        {/* SELLER PRODUCT LABEL */}

                        {product.sellerProduct && (

                            <span className="seller-badge">
                                Student Seller
                            </span>

                        )}


                        {/* PRODUCT NAME */}

                        <h4 className="prod-name">
                            {product.name}
                        </h4>


                        {/* CATEGORY */}

                        <p className="prod-category">
                            {product.category}
                        </p>


                        {/* CONDITION */}

                        {/* <p className="prod-condition">
                            {product.condition}
                        </p> */}


                        {/* PRICE */}

                        <h4 className="amount">

                            ₹
                            <span>
                                {product.price}
                            </span>

                        </h4>


                        {/* BUY NOW */}

                        <Link
                            to="/details"
                            state={{
                                item: product,
                                wish: wish
                            }}
                        >

                            <button className="prod-but">
                                Buy Now
                            </button>

                        </Link>


                        {/* WISHLIST */}

                        <p
                            className={
                                wish.includes(product.id)
                                    ? "heart-color"
                                    : "heart"
                            }
                        >

                            <i
                                className="bi bi-heart-fill"
                                onClick={() =>
                                    togglelist(product.id)
                                }
                            ></i>

                        </p>

                    </div>

                ))}

            </div>

        </>

    );
};

export default Product;