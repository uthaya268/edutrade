import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sell.css";

const Sell = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        department: "",
        price: "",
        condition: "",
        description: "",
        sellerName: "",
        phone: "",
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert("You can upload maximum 5 images");
            return;
        }

        setImages(files);
    };

    // Convert image into Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !product.name ||
            !product.category ||
            !product.price ||
            !product.condition ||
            !product.description
        ) {
            alert("Please fill all required fields");
            return;
        }

        if (images.length === 0) {
            alert("Please upload at least one product image");
            return;
        }

        try {
            // Convert uploaded images to Base64
            const imageData = await Promise.all(
                images.map((image) => convertToBase64(image))
            );

            // Create seller product
            const newProduct = {
                id: Date.now(),

                name: product.name,

                category: product.category,

                department: product.department,

                price: Number(product.price),

                condition: product.condition,

                description: product.description,

                sellerName: product.sellerName,

                phone: product.phone,

                images: {
                    image1: imageData[0] || "",
                    image2: imageData[1] || "",
                    image3: imageData[2] || "",
                    image4: imageData[3] || "",
                    image5: imageData[4] || "",
                },

                sellerProduct: true,

                date: new Date().toLocaleDateString(),
            };

            // Get existing seller products
            const existingProducts =
                JSON.parse(
                    localStorage.getItem("sellerProducts")
                ) || [];

            // Add new product
            const updatedProducts = [
                ...existingProducts,
                newProduct,
            ];

            // Save products
            localStorage.setItem(
                "sellerProducts",
                JSON.stringify(updatedProducts)
            );

            alert("Product listed successfully!");

            // Go to product page
            navigate("/products");

        } catch (error) {
            console.error(error);

            alert(
                "Something went wrong while uploading the product."
            );
        }
    };

    return (
        <div className="sell-page">
            <p className="s-back"><i class="bi bi-arrow-left-circle"></i></p>

            <div className="sell-container">

                <div className="sell-header">
                    <h1>Sell Your Product</h1>

                    <p>
                        Sell your unused items to students on EduTrade
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* PRODUCT INFORMATION */}

                    <div className="sell-card">

                        <h2>
                            <i className="bi bi-box-seam"></i>
                            Product Information
                        </h2>

                        <div className="form-group">

                            <label>
                                Product Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="Enter product name"
                                value={product.name}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Category *
                                </label>

                                <select
                                    name="category"
                                    value={product.category}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Books">
                                        Books
                                    </option>

                                    <option value="Electronics">
                                        Electronics
                                    </option>

                                    <option value="Lab Equipment">
                                        Lab Equipment
                                    </option>

                                    <option value="Stationery">
                                        Stationery
                                    </option>

                                    <option value="Hostel Essentials">
                                        Hostel Essentials
                                    </option>

                                    <option value="Notes">
                                        Notes
                                    </option>

                                    <option value="Creative Tools">
                                        Creative Tools
                                    </option>

                                    <option value="Project Materials">
                                        Project Materials
                                    </option>

                                    <option value="Fashion">
                                        Fashion
                                    </option>

                                    <option value="Others">
                                        Others
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Department
                                </label>

                                <select
                                    name="department"
                                    value={product.department}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Department
                                    </option>

                                    <option value="Information Technology">
                                        Information Technology
                                    </option>

                                    <option value="Computer Science">
                                        Computer Science
                                    </option>

                                    <option value="Electronics">
                                        Electronics
                                    </option>

                                    <option value="Electrical">
                                        Electrical
                                    </option>

                                    <option value="Mechanical">
                                        Mechanical
                                    </option>

                                    <option value="Civil">
                                        Civil
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Price (₹) *
                                </label>

                                <div className="price-input">

                                    <span>₹</span>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="Enter price"
                                        min="1"
                                        value={product.price}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>


                            <div className="form-group">

                                <label>
                                    Product Condition *
                                </label>

                                <select
                                    name="condition"
                                    value={product.condition}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Condition
                                    </option>

                                    <option value="New">
                                        New
                                    </option>

                                    <option value="Like New">
                                        Like New
                                    </option>

                                    <option value="Good">
                                        Good
                                    </option>

                                    <option value="Fair">
                                        Fair
                                    </option>

                                    <option value="Used">
                                        Used
                                    </option>

                                </select>

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Product Description *
                            </label>

                            <textarea
                                name="description"
                                rows="5"
                                placeholder="Describe your product..."
                                value={product.description}
                                onChange={handleChange}
                            ></textarea>

                        </div>

                    </div>


                    {/* IMAGE UPLOAD */}

                    <div className="sell-card">

                        <h2>
                            <i className="bi bi-images"></i>
                            Product Images
                        </h2>

                        <p className="image-info">
                            Upload clear images of your product.
                            Maximum 5 images.
                        </p>

                        <label
                            htmlFor="product-images"
                            className="upload-box"
                        >

                            <i className="bi bi-cloud-arrow-up"></i>

                            <h3>
                                Upload Product Images
                            </h3>

                            <p>
                                Click here to select images
                            </p>

                            <span>
                                JPG, JPEG or PNG
                            </span>

                        </label>

                        <input
                            id="product-images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            hidden
                        />


                        {images.length > 0 && (

                            <div className="image-preview">

                                {images.map((image, index) => (

                                    <div
                                        className="preview-item"
                                        key={index}
                                    >

                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Product ${index + 1}`}
                                        />

                                        <span>
                                            {index === 0
                                                ? "Main Image"
                                                : `Image ${index + 1}`}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>


                    {/* SELLER INFORMATION */}

                    <div className="sell-card">

                        <h2>
                            <i className="bi bi-person"></i>
                            Seller Information
                        </h2>

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Your Name
                                </label>

                                <input
                                    type="text"
                                    name="sellerName"
                                    placeholder="Enter your name"
                                    value={product.sellerName}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    maxLength="10"
                                    value={product.phone}
                                    onChange={(e) => {

                                        const value =
                                            e.target.value.replace(
                                                /\D/g,
                                                ""
                                            );

                                        setProduct((prev) => ({
                                            ...prev,
                                            phone: value,
                                        }));

                                    }}
                                />

                            </div>

                        </div>

                    </div>


                    {/* AGREEMENT */}

                    <div className="selling-policy">

                        <input
                            type="checkbox"
                            id="agreement"
                            required
                        />

                        <label htmlFor="agreement">

                            I confirm that the information provided
                            about this product is accurate and the
                            product belongs to me.

                        </label>

                    </div>


                    {/* BUTTONS */}

                    <div className="sell-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="sell-btn"
                        >

                            <i className="bi bi-tag-fill"></i>

                            List Product

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Sell;