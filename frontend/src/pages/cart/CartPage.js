import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { deleteFromCart } from '../../actions/cartActions';
import './CartPage.css';
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


export default function Cart() {
  const cartState = useSelector(state => state.cartReducer);
  const cartItems = cartState.cartItems;
  const dispatch = useDispatch()
  const navigate = useNavigate()
  var subtotal = cartItems.reduce((x, items) => x + items.price, 0)
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {};

  const [loading, setLoading] = useState(false)
  const [NewWallet, setNewWallet] = useState('')
  const [code, setCode] = useState('');

  useEffect(() => {
    (axios.get(`${process.env.REACT_APP_BACKEND_URL}GetUpdateUser/users/${userInfo._id}`))
      .then((result) => {
        setNewWallet(result.data.wallet);
      })
      .catch((err) => console.log(err));
  }, []);

  const generateUniqueCode = () => {
    const code = Math.floor(10000 + Math.random() * 90000);
    return code.toString().substring(0, 4);
  };

  const handleSubmit = async () => {
    try {
      const New_Wallet = NewWallet - subtotal;
      const ownerID = userInfo._id;
      const name = userInfo.name;
  
      if (New_Wallet >= 0) {
        const uniqueCode = generateUniqueCode();
  
        Swal.fire({
          title: "Are you sure?",
          text: `Subtotal ${subtotal} RS`,
          icon: "warning",
          borderRadius: '50%',
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirm",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Successfull",
              text: `Balance amount on Wallet ${New_Wallet}`,
              icon: "success"
            });
  
            setLoading(true);
  
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}UpdateUser/update/users/${userInfo._id}`, { wallet: New_Wallet })
              .then((result) => {
                console.log("successfully updated wallet")
              }).catch(err => { alert("error") })
  
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}user/cart`, { ownerID,subtotal, name, code: uniqueCode, cartItems })
              .then((result) => {
                navigate('/Order')
                window.location.reload()
                setLoading(false)
              })
              .catch((err) => {
                alert('error')
              })
              .finally(setLoading(false))
  
            window.localStorage.removeItem("cartItems");
          }
        });
      } else {
        alert("Don't have enough amount on wallet");
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  

  return (
    <div style={{ marginTop: '90px' }}>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5 mb-5" style={{border:"1px solid black"}}>
          <h2 style={{ fontSize: "40px", color: "#333", fontFamily: "cursive", textAlign: "center", textShadow: "2px 2px 2px #ccc" }}>My Cart</h2>
          {cartItems.map((items) => (
            <div className="flex-container" key={items._id}>
              <div className='text-left m-1'>
                <div className="order-item-content">
                  <div>
                    <p style={{ fontSize: "25px", color: "#008080", fontWeight: "bold" }}>{items.name}</p>
                    <p style={{ fontSize: "15px", color: "#333", margin: "0", marginBottom: '5px', textAlign: "left" }}>Price: {items.price} Rs</p>
                    <div className="quantity-container">
                      <div className="centered-content">
                        <p style={{ fontSize: "16px", margin: "0", color: "#008080", fontWeight: "bold" }}>Quantity: {items.quantity}</p>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="image-delete-container">
                    <div className="image-container">
                      <img src={`https://online-food-website.onrender.com/images/${items.image}`} style={{ height: '80px', width: '80px', borderRadius: "50%", boxShadow: "2px 2px 5px #888" }} alt="Image" />
                      <FaTrash style={{ color: 'red', marginLeft: '10px', fontSize: "20px" }} onClick={() => { dispatch(deleteFromCart(items)) }} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4 text-right">
          <h3>Subtotal : {subtotal} RS</h3>
          {cartItems.length > 0 ? (
            <button className='btn btn-standard' disabled={loading} onClick={handleSubmit}>
              {loading && <i className='fa fa-refresh fa-spin'></i>}
              {loading && <span>loading..</span>}
              {!loading && <span>Checkout.</span>}
            </button>
          ) : (
            <button className='btn btn-standard' disabled onClick={handleSubmit}> check out</button>
          )}
        </div>
      </div>
    </div>
  );
}
