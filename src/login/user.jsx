import React from 'react'
import './user.css'
const User = ({setShowuser,user,setUser,showuser,name}) => {
  const logmessage=()=>{
    alert("Logged Out Successfully...");
  }
  return (
    <div className='user'>
        <ul>
            <li className='user-name'>Hello,<span>{name}</span></li>
            <li><i class="bi bi-person-circle"></i> Profile</li>
            <li><i class="bi bi-question-diamond-fill"></i> Help</li>
            <li><button onClick={()=>{setUser(!user);setShowuser(!showuser);}}>Log Out</button></li>
        </ul>
    </div>
  )
}

export default User
