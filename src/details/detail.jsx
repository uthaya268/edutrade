import React,{useState,useEffect} from 'react'
import Navbar from '../navbar/navbar.jsx'
import './detail.css'
import Buy from './buy.jsx'
import book from '../assets/book.png'
const Detail = () => {
  useEffect(()=>{
    window.scrollTo({
      top:0,
      left:0,
      behavior:"instant"
    });
  },[]);
  const [isproduct,setIsproduct]=useState(true);
  return (
    <>
    {isproduct ? <div className='product-detail'>
      <Navbar></Navbar>
      <div className="detail-product">
        <div className="inner-detail">
          <div className="top">
            <h1><i class="bi bi-arrow-left-circle-fill"></i></h1>
          </div>
        <div className="dp-image">
          <img src={book}  alt="" />
        </div>
        <div className="dp-detail">
          <h2>Book</h2>
          <h4>$ 400</h4>
          <p className='sold-detail'><i className="bi bi-shop"></i> Sold by: <span>User Name</span></p>
          <div className="org-img">
            <p>Original Images <i class="bi bi-chevron-down"></i></p>
            <div className="show-image">
              <img src={book} className='show-org' alt="" />
            </div>
          </div>
        </div>
        <div className="product-highlights">
          <h3>Product Highlight</h3>
          <div className="highlights-grid">
          <p>Buying Time: <span>august 2025</span></p>
          <p>Publication: <span>Technical </span></p>
          <p>Condition: <span>Good</span></p>
          <p>Color: <span>None</span></p>
          <p>Edition:<span>3rd edition</span></p>
          <p>Author:<span>Bhasker</span></p>
          </div>
        </div>
        <Buy></Buy>
        </div>
      </div>
    </div>:<></>}
    </>
  )
}

export default Detail
