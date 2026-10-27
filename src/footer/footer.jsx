import React from 'react'
import logo from '../assets/llogo.png'
import './footer.css'
const footer = () => {
  return (
    <div className='footer'>
        <div className="foo-img">
            <img src={logo} alt="" />
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
    </div>
  )
}

export default footer
