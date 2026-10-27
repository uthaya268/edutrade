import React,{useState} from 'react'
import './showcom.css'
import {useLocation,Link} from 'react-router-dom'
import '../component.jsx'
import {product_items} from '../../assets/products.js'
import imglogo from '../../assets/llogo.png'
import Navbar from '../../navbar/navbar.jsx'
const showcom = () => {
  const location=useLocation();
  const item=location.state?.item;
  if(!item){
    return  <h2>no elements found</h2>
  }
  const [wish,setWish]=useState([]);
    const togglelist=(index)=>{
      setWish((prev)=>
      prev.includes(index)?prev.filter((i)=>i!==index):[...prev,index]
    );
    };
    const filteredProducts = product_items.filter(
    product => product.category === item.name
);
const [showwish,setShowWish]=useState([]);
  const showtogglelist=(index)=>{
    setShowWish((prev)=>
    prev.includes(index)?prev.filter((i)=>i!==index):[...prev,index]
  );
  };
console.log("Item Name:", item.name);
console.log("Products:", product_items);
console.log("Filtered:", filteredProducts);

console.log("Selected:", item.name);

product_items.forEach((p) => {
  console.log(p.category);
});
  return (
    <div>
      <div className="component-items">
        <div className="com-header">
        </div>
        <div className="component-prod">
          <p><Link to="/"><i class="bi bi-arrow-left-circle"></i></Link> {item.name}</p>
         <div className='com-product'>
                {filteredProducts.map((product,index)=>{
                    return <div className="com-fea-prod" key={product.id}>
                      
                    <div className="prod-img">
                        <img src={product.images.image1} alt="" className='p-img'/>
                    </div>
                    <h4 className='prod-name'>{product.name}</h4>
                    <div className="amoun-heart">
                    <h4 className='amount'>$ <span>{product.price}</span>/-</h4>
                    <p className={showwish.includes(index)?"show-like-color":"show-like"} key={index}><i class="bi bi-heart-fill" onClick={()=>showtogglelist(index)}></i></p>
                    </div>
                    <button className='prod-but'>View More</button>
                    </div>

                })}
                
            </div>
            </div>
            {/* <div className="margin-left"></div>
            <div className="margin-right"></div> */}
            {/* <div className="foot-show">
        <div className="foo-img">
                    <img src={imglogo} alt="" />
                </div>
                <div className="foo-menu">
                    <ul>
                        <li>About Us</li>
                        <li>Help & Support</li>
                        <li>Terms & Policies</li>
                    </ul>
                </div>
                <hr />
                <p className='cr'><span>EDUTRADE</span>c for copy rights</p>
      </div> */}
      </div>
    </div>
  )
}

export default showcom
