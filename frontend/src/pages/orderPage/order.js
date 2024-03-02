import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './order.css';

export default function Order() {

  const [orderlist, setOrderlist] = useState([]);
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}cart/getcart/cartitems`)
      .then((result) => {
        setOrderlist(result.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const unconfirmedOrders = orderlist.filter(order => !order.confirm);

  return (
    <div style={{ marginTop: "100px",marginBottom:"50px"}}>
     
      {loading ? (
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <div className='unconfirmed'>
            <b>Waiting to confirm..</b><br />
          </div>

          {unconfirmedOrders.map((orderItem, index) => (
            userInfo._id === orderItem.ownerID ? (
              <div className="order-item" key={index}>
                {orderItem.products.map((product, productIndex) => (
                  <div className="order-item-content" key={productIndex}>
                    <div className="order-item-name" style={{ color: 'red' }}><b>{product.name}</b></div>
                    <div className="order-item-quantity" style={{ color: 'red' }}>Quantity : {product.quantity}</div>
                    <div className="image-container">
                      <img src={`${process.env.REACT_APP_BACKEND_URL}images/${product.image}`} alt="Image" />
                    </div>
                  </div>
                ))}
                <div className="order-creation-time">
                  <b>Order Placed at: {new Date(orderItem.createdAt).toLocaleString()}</b>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
       <div style={{ marginRigt: 'auto' }}>
        <a href="/Confirmed_orders">
          <button className='btn btn-success mt-8'>confirmed Orders</button>
        </a>
      </div>
    </div>
  );
}
