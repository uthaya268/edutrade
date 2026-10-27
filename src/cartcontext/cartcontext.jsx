import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    // Add Item
    const addToCart = (product) => {

    console.log("Product Received:", product);

    const exist = cart.find(item => item.id === product.id);

    if (exist) {
        setCart(
            cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    } else {
        setCart([...cart, { ...product, quantity: 1 }]);
    }
};
    // Remove Item

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    // Increase Quantity

    const increaseQty = (id) => {
        setCart(
            cart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // Decrease Quantity

    const decreaseQty = (id) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );

    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);