import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import {auth} from "../firebase"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatContext)
  
  const handleClick = (u)=>{
    dispatch({type:"LOGOUT",payload:u})
  }

  return (
    <div className='navbar'>
        <span className="logo">Chat App</span>
        <div className='user'>
            <img src={currentUser.photoURL} alt=""></img>
            <span>{currentUser.displayName}</span>
            <button onClick={()=>{signOut(auth);handleClick(null);}}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar