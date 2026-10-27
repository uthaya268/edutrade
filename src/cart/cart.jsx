import { useCart } from "../cartcontext/cartcontext.jsx";
import "./cart.css";
const Cart = () => {

    const {
        cart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        totalPrice
    } = useCart();

    return (

        <div className="cart-page">

            <h2>Shopping Cart</h2>

            {cart.length === 0 ? (
                <div className="no-cart">
                  <h3><i class="bi bi-cart-x"></i></h3>
                  <p>No items in the cart</p>
                </div>
            ) : (

                <>
                    {cart.map(item => (

                        <div className="cart-item" key={item.id}>

                            <img src={item.images.image1} width="100" />

                            <div>

                                <h3>{item.name}</h3>

                                <h4>₹{item.price}</h4>

                                <button onClick={() => decreaseQty(item.id)}>-</button>

                                <span>{item.quantity}</span>

                                <button onClick={() => increaseQty(item.id)}>+</button>

                                <br /><br />

                                <button onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                    <h2>Total : ₹{totalPrice}</h2>

                    <button>Buy Now</button>

                </>

            )}

        </div>

    );
};

export default Cart;