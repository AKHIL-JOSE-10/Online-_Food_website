import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Adminorders = () => {
  const [orderlist, setOrderlist] = useState([]);
  const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://online-food-website.onrender.com/cart/getcart/cartitems")
      .then((result) => {
        setOrderlist(result.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const handleConfirmOrder = (orderId) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}cart/updateCart/${orderId}`, { confirm: true })
      .then((result) => {
        Swal.fire({
          text: "Successful",
          icon: "success",
          timer: 1500
        });
        setTimeout(()=>window.location.reload(),1000)
      })
      .catch(err => console.log('Server error occurred'));
  };

  const unconfirmedOrders = orderlist.filter(order => !order.confirm);

  return (
    <div style={{ marginTop: '90px' }}>
      {loading ? (
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="order-container">
          <h2 className="order-heading">New Orders</h2>
          <div className="order-list">
            {unconfirmedOrders.length === 0 ? (
              <div><h4>No new orders</h4></div>
            ) : (
              unconfirmedOrders.map((orderItem, index) => (
                <div className="order-item" key={index}>
                  <h2 style={{ marginBottom: '30px', color: "green" }}>{orderItem.name}</h2>

                  {orderItem.products.map((product, productIndex) => (
                    <div className="order-item-content" key={productIndex}>
                      <div className="order-item-name"><b>{product.name}</b></div>
                      <div className="order-item-quantity">Quantity: {product.quantity}</div>
                      <div className="order-image-container">
                        <img src={`https://online-food-website.onrender.com/images/${product.image}`} alt="Image" />
                      </div>
                    </div>
                  ))}

                  <div className="order-creation-time">
                    <b>Order Placed at: {new Date(orderItem.createdAt).toLocaleString()}</b>
                  </div>
                  <button className="btn btn-success"  onClick={() => handleConfirmOrder(orderItem._id)}>
                    Confirm Order
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
