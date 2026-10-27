import React from 'react'
import './componenet.css';
import {material_list} from '../assets/assets.js'
import book from "../assets/book.png";
import {Link} from 'react-router-dom'
const component = () => {
  return (
    <>
    <h2>Category:</h2>
    <div className="material">
      {material_list.map((item,index)=>{
        return  <div className='component' key={index}>
        <div className="com-img">
            <img src={item.img} className='img-com' />
        </div>
        <div className="content">
          <h3>{item.name}</h3>
          <Link to='/show' state={{item:item}} key={index}>
          <p>view more</p>
           </Link>
        </div>
        <i className="bi bi-chevron-right"></i>
        
    </div>
      })}
    
    </div>
    </>
  )
}

export default component
