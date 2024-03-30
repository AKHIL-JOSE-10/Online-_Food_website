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
        const sortedOrders = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrderlist(sortedOrders);
        
      })
      .catch(err => console.log(err))
      .finally(setLoading(false))
  }, []);

  const handleCancel = (orderId, subtotal, ownerID) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}food/UpdateUser/update/users/order/${ownerID}`, { wallet: subtotal })
      .then((result) => {
        console.log("successfully updated wallet")
      }).catch(err => { alert("error") })

    axios.put(`${process.env.REACT_APP_BACKEND_URL}cartitem/update/updateCart/${orderId}`, { delivered: false, confirm: false, cancel: true })
      .then(res => { alert("Cancelled") })
      .catch(err => { alert("Error") })
    window.location.reload()
  }

  const handleConfirmOrders = (orderId) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}cartitem/update/updateCart/${orderId}`, { delivered: false, confirm: true, cancel: false })
      .then((result) => {
        Swal.fire({
          text: "Successful",
          icon: "success",
          timer: 1500
        });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(err => console.log('Server error occurred'));
  };

  const handledeliveredOrders = (orderId) => {
    axios.put(`${process.env.REACT_APP_BACKEND_URL}cartitem/update/updateCart/${orderId}`, { confirm: true, delivered: true, cancel: false })
      .then((result) => {
        Swal.fire({
          text: "Successful",
          icon: "success",
          timer: 1500
        });
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(err => console.log('Server error occurred'));
  };

  const unconfirmedOrders = orderlist.filter(order => (!order.confirm || !order.delivered) && !order.cancel);

  return (
    <div style={{ marginTop: '90px' }}>
      {loading ? (
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
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
                  <h2 style={{ marginBottom: '30px', color: "green" }}>{orderItem.name}<h4><b style={{ color: "red" }}>token : {" "}{orderItem.code}</b></h4></h2>
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
                  {orderItem.confirm ? (
                    <>
                      <button className="btn btn-success" disabled>
                        Confirmed
                      </button>
                      {!orderItem.delivered && (
                        <button className="btn btn-success" style={{ marginLeft: "20px" }} onClick={() => handledeliveredOrders(orderItem._id)}>
                          Delivered
                        </button>
                      )}
                    </>
                  ) : (
                    <div>
                      <button className="btn btn-success" onClick={() => handleConfirmOrders(orderItem._id, orderItem.subtotal, orderItem.ownerID)}>
                        Confirm Order
                      </button>
                      <button className="btn btn-success " style={{ backgroundColor: "red", marginLeft: "20px" }} onClick={() => handleCancel(orderItem._id, orderItem.subtotal, orderItem.ownerID)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
