import { useCart } from '../cartcontext/cartcontext'
import React from 'react'
import "./buy.css"
import { useNavigate } from 'react-router-dom'
const Buy = ({product}) => {
  const {addToCart}=useCart();
  const navigate=useNavigate();

  const handlenow=()=>{
    navigate("/buy",{state:{product:product}});
  };
  return (
    <div className='buy'>
        <button onClick={handlenow}>Buy Now <i className="bi bi-cart-plus-fill"></i></button>
        <button onClick={()=> addToCart(product)}>Add to Cart <i className="bi bi-bag-plus-fill"></i></button>
    </div>
  )
}

export default Buy
