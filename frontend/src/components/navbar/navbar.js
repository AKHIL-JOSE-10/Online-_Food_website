import React, { useState, useEffect } from 'react';
import "./navbar.css";
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function Navbar() {
  const cartState = useSelector(state => state.cartReducer);
  const [cookies, setCookies] = useCookies(['access_token']);
  const [userInfo, setUserInfo] = useState('');

  const user = JSON.parse(window.localStorage.getItem("userInfo")) || {};
  
  useEffect(() => {
    if (user._id) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}GetUpdateUser/users/` + user._id)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  }, []);

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userInfo");
    window.location.href = '/';
  }

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
        <a  href='/' style={{ color: '#fff' }}>Home</a>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        {user.name ? (
          user.isAdmin ? (
            <>
              <a  style={{ color: '#fff' }}>{userInfo.name}</a>
              <a href="/Admin" style={{ color: '#fff' }}>Task</a>
            </>
          ) : (
            <>
              <a  style={{ color: '#fff' }}>{userInfo.name}</a>
              <a href="/Order" style={{ color: '#fff' }}>Orders</a>
            </>
          )
        ) : (
          <a href="/Login" style={{ color: '#fff'}}>Login</a>
        )}

        {!userInfo.isAdmin && userInfo._id && (
          <>
            <a href={`/Cart/${userInfo._id}`} style={{ color: '#fff' }}>Cart {cartState.cartItems.length}</a>
            <a href={`/Contact/${userInfo._id}`} style={{ color: '#fff' }}>Contact </a>
            <a style={{ color: '#fff' }}>Wallet: {userInfo.wallet} Rs</a>
            <a style={{ color: '#fff' }} onClick={handleLogout}>Logout</a>
          </>
        )}

        {userInfo.isAdmin && userInfo._id && (
          <>
            <a href={'/Adminorders'} style={{ color: '#fff' }}>New Orders</a>
            <a href={'/Old_orders_admin'} style={{ color: '#fff' }}>Old Orders</a>
            <a  style={{ color: '#fff' }} onClick={handleLogout}>Logout</a>
          </>
        )}
      </div>
    </div>
  );
}
