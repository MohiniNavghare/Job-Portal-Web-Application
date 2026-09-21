import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdWorkOutline, MdPersonOutline, MdLogout } from "react-icons/md";
import "./Navbar.css";

function Navbar(){
 const [user,setUser]=useState(null); const navigate=useNavigate();
 useEffect(()=>{const sync=()=>setUser(JSON.parse(localStorage.getItem("psk_current_user")||"null")); sync(); window.addEventListener("authchange",sync); return()=>window.removeEventListener("authchange",sync)},[]);
 const logout=()=>{localStorage.removeItem("psk_current_user");window.dispatchEvent(new Event("authchange"));navigate("/")};
 return <nav className="navbar"><div className="nav-inner">
  <Link className="brand" to="/"><span className="brand-icon"><MdWorkOutline/></span><span>PSK Job Portal</span></Link>
  <div className="nav-links"><Link to="/">Jobs</Link>{user?<><Link to="/profile"><MdPersonOutline/> {user.name}</Link><button className="logout" onClick={logout}><MdLogout/> Logout</button></>:<><Link to="/login">Login</Link><Link className="nav-register" to="/register">Register</Link></>}</div>
 </div></nav>
}
export default Navbar;
