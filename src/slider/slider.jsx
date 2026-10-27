import React,{useState,useEffect} from 'react'
import ad1 from "../assets/advert.png"
import ad2 from "../assets/ad2.png"
import ad3 from "../assets/ad3.png"
import ad4 from "../assets/ad4.png"
import ad5 from "../assets/ad5.png"
import "./slider.css"
const slider = () => {
  const adver=[ad1,ad2,ad3,ad4,ad5];
  const slogan=[
    "The Smarter Way to Buy & Sell Educational Essentials.",
    "Everything You Need for College, All in One Marketplace.",
    "Making Education More Affordable, One Trade at a Time.",
    "The Trusted Marketplace for Educational Essentials.",
    "Find Great Deals on Books, Equipment & More."
  ]
  function leftclick(){
    setCount((prev)=>prev===0?adver.length-1:prev-1);
  }
  function rightclick(){
    setCount((prev)=>prev===adver.length-1?prev-prev:prev+1)
  }
  const [count,setCount]=useState(0);
  // useEffect(()=>{
  //   const interval=setInterval(()=>{
  //     setCount((prev)=>prev===adver.length-1?prev-prev:prev+1);
  //   },3000);
  //   return ()=> clearInterval(interval);
  // },[])
  return (
    <div>
        <div className="slider">
            <img src={adver[count]} key={count} alt="" className="slide-img" />
        </div>
        <div className="left" onClick={()=>leftclick()}>
          <h5><i className="bi bi-chevron-compact-left"></i></h5>
        </div>
        <div className="right" onClick={()=>rightclick()}>
          <h5><i className="bi bi-chevron-compact-right"></i></h5>
        </div>
        <div className="slogan" key={count}>
          <h5>{slogan[count]}</h5>
        </div>
    </div>
  )
}

export default slider
