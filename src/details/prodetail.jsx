import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './prodetail.css';
import { product_list } from '../assets/assets.js';
import Button from './buy.jsx';

const Prodetail = () => {
    const location = useLocation();
    const item = location.state?.item;

    const [wish, setWish] = useState([]);
    const [selectedimage, setSelectedimage] = useState(0);
    const [animate, setAnimate] = useState(false);
    const [imgcount, setImgcount] = useState(0);
    const [prodcount, setProdcount] = useState(1);

    useEffect(() => {
        window.scrollTo({
            top: 10,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    // If no product was passed through Link state
    if (!item) {
        return (
            <div className="item-not-found">
                <h2>Item not found</h2>
                <Link to="/">
                    <button>Go Home</button>
                </Link>
            </div>
        );
    }

    // Safely get images and details
    const images = Object.values(item.images || {});
    const details = Object.values(item.details || {});

    // If product has no images
    if (images.length === 0) {
        return (
            <div className="item-not-found">
                <h2>No images available for this product</h2>
                <Link to="/">
                    <button>Go Home</button>
                </Link>
            </div>
        );
    }

    const relatedprod = product_list.filter(
        product =>
            product.category === item.category &&
            product.id !== item.id
    );

    const togglelist = (index) => {
        setWish(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    function leftclick() {
        setAnimate(true);

        setTimeout(() => {
            setImgcount(prev =>
                prev === 0 ? images.length - 1 : prev - 1
            );

            setAnimate(false);
        }, 300);
    }

    function rightclick() {
        setAnimate(true);

        setTimeout(() => {
            setImgcount(prev =>
                prev === images.length - 1 ? 0 : prev + 1
            );

            setAnimate(false);
        }, 300);
    }

    function plus() {
        setProdcount(prev => prev + 1);
    }

    function minus() {
        setProdcount(prev => (prev > 1 ? prev - 1 : 1));
    }

    return (
        <>
            <div className="viewdetail">

                <div className="prod-detail">

                    {/* FIRST SECTION */}
                    <div className="first-section">

                        <p className="prod-home">
                            <Link to="/">
                                <i className="bi bi-arrow-left-circle-fill"></i>
                            </Link>

                            <span>
                                Home / {item.category} / {item.name}
                            </span>
                        </p>

                        {/* IMAGE SECTION */}
                        <div className="image-section">

                            <div className="prod-image">
                                <img
                                    src={images[imgcount]}
                                    className={`img-detail ${
                                        animate ? 'pageturn' : ''
                                    }`}
                                    alt={item.name}
                                />
                            </div>

                            {images.length > 1 && (
                                <div className="prod-image-2">
                                    <img
                                        src={
                                            images[
                                                (imgcount + 1) %
                                                images.length
                                            ]
                                        }
                                        className="img-detail-2"
                                        alt={`${item.name} preview`}
                                    />
                                </div>
                            )}

                        </div>

                        {/* THUMBNAILS */}
                        <div className="sub-image">

                            {images.map((pic, index) => (
                                <div
                                    className="s-img"
                                    key={index}
                                >
                                    <img
                                        src={pic}
                                        className={`next-image ${
                                            imgcount === index
                                                ? 'active-thumbnail'
                                                : ''
                                        }`}
                                        alt={`${item.name} ${index + 1}`}
                                        onClick={() => {
                                            setImgcount(index);
                                            setSelectedimage(index);
                                        }}
                                    />
                                </div>
                            ))}

                        </div>

                        {/* IMAGE ARROWS */}
                        {images.length > 1 && (
                            <div className="move-but">

                                <p
                                    className="img-move-l"
                                    onClick={leftclick}
                                >
                                    <i className="bi bi-caret-left-fill"></i>
                                </p>

                                <p
                                    className="img-move-r"
                                    onClick={rightclick}
                                >
                                    <i className="bi bi-caret-right-fill"></i>
                                </p>

                            </div>
                        )}

                        {/* SELLER */}
                        <p className="sold-user">
                            <i className="bi bi-shop"></i>

                            {' '}Sold by:{' '}

                            <span>
                                {item.sellername || 'Unknown Seller'}
                            </span>
                        </p>

                    </div>

                    {/* SECOND SECTION */}
                    <div className="prod-in">

                        <div className="prod-item-name">
                            <h3>{item.name}</h3>
                        </div>

                        <div className="lorem">
                            <p>
                                {item.description ||
                                    'No description available.'}
                            </p>
                        </div>

                        <div className="prod-price">
                            <h4>
                                $ {item.price}
                            </h4>

                            <p>
                                Include all taxes
                            </p>
                        </div>

                        <p className="stock">
                            <i className="bi bi-check-circle-fill"></i>

                            {' '}In Stock
                        </p>

                        {/* QUANTITY */}
                        <div className="prod-quantity">

                            <p className="h-quantity">
                                Quantity
                            </p>

                            <div className="items-quantity">

                                <p
                                    className="item-minus"
                                    onClick={minus}
                                >
                                    -
                                </p>

                                <p>
                                    {prodcount}
                                </p>

                                <p
                                    className="item-add"
                                    onClick={plus}
                                >
                                    +
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* THIRD SECTION */}
                    <div className="third-section">

                        {/* SHOP AD */}
                        <div className="shop-ad">

                            <h4>
                                Why Shop with Edutrade{' '}
                                <i className="bi bi-question-circle"></i>
                            </h4>

                            <p>
                                <i className="bi bi-check-circle"></i>
                                {' '}Trusted By Students
                            </p>

                            <p>
                                <i className="bi bi-check-circle"></i>
                                {' '}100% Secure Payments
                            </p>

                            <p>
                                <i className="bi bi-check-circle"></i>
                                {' '}Fast & Reliable Delivery
                            </p>

                            <p>
                                <i className="bi bi-check-circle"></i>
                                {' '}Easy Returns
                            </p>

                        </div>

                        {/* PRODUCT DETAILS */}
                        <div className="product-about">

                            <h5>
                                Product Details:
                            </h5>

                            <div className="product-about-detail">

                                <p>
                                    <label>Condition:</label>

                                    <span>
                                        {details[0] || 'Not specified'}
                                    </span>
                                </p>

                                <p>
                                    <label>Purchase:</label>

                                    <span>
                                        {details[1] || 'Not specified'}
                                    </span>
                                </p>

                                <p>
                                    <label>Brand:</label>

                                    <span>
                                        {details[2] || 'Not specified'}
                                    </span>
                                </p>

                                <p>
                                    <label>Type:</label>

                                    <span>
                                        {details[3] || 'Not specified'}
                                    </span>
                                </p>

                                <p>
                                    <label>Quantity:</label>

                                    <span>
                                        {details[4] || 'Not specified'}
                                    </span>
                                </p>

                            </div>

                        </div>

                        {/* BUY BUTTON */}
                        <Button product={item} />

                    </div>

                </div>

                {/* RELATED PRODUCTS */}
                <div className="r-prod">

                    <h3>
                        Related Products
                    </h3>

                    <div className="product">

                        {relatedprod.map((product, index) => (

                            <div
                                className="fea-prod"
                                key={product.id}
                            >

                                <div className="prod-img">

                                    <img
                                        src={product.images?.image1}
                                        alt={product.name}
                                        className="p-img"
                                    />

                                </div>

                                <h4 className="prod-name">
                                    {product.name}
                                </h4>

                                <h4 className="amount">
                                    $
                                    <span>
                                        {product.price}
                                    </span>
                                    /-
                                </h4>

                                <Link
                                    to="/details"
                                    state={{
                                        item: product
                                    }}
                                >
                                    <button className="prod-but">
                                        Buy Now
                                    </button>
                                </Link>

                                <p
                                    className={
                                        wish.includes(index)
                                            ? 'heart-color'
                                            : 'heart'
                                    }
                                >
                                    <i
                                        className="bi bi-heart-fill"
                                        onClick={() =>
                                            togglelist(index)
                                        }
                                    ></i>
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </>
    );
};

export default Prodetail;