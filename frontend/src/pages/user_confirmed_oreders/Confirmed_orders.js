
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Confirmed_orders({ product }) {

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

    // Ensure orderlist is an array before filtering
    const confirmedOrders = Array.isArray(orderlist) ? orderlist.filter(order => order.confirm || order.cancel) : [];

    // Sort confirmed orders by createdAt in descending order
    const sortedConfirmedOrders = confirmedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            {
                loading ?  <div className="spinner-border m-5" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>:
                    <div className="order-container">
                        <h2 className="order-heading">Placed Orders</h2>
                        {sortedConfirmedOrders.length === 0 ? (
                            <h3>No placed orders</h3>
                        ) : (
                            <div className="order-list">
                                {sortedConfirmedOrders.map((orderItem, index) => (
                                    userInfo._id === orderItem.ownerID ? (
                                        <div className="order-item" key={index}>
                      <h2 style={{ marginBottom: '30px', color: "green" }}>{orderItem.name}<h4><b style={{color:"red"}}>token : {" "}{orderItem.code}</b></h4></h2>
                                            {orderItem.products.map((product, productIndex) => (
                                                <div className="order-item-content" key={productIndex}>
                                                    <div className="order-item-name" style={{ color: 'green' }}><b>{product.name}</b></div>
                                                    <div className="order-item-quantity" style={{ color: 'green' }}>Quantity : {product.quantity}</div>
                                                    <div className="image-container">
                                                        <img src={`${process.env.REACT_APP_BACKEND_URL}images/${product.image}`} alt="Image" />
                                                    </div>
                                                </div>
                                            ))}
                                            
                                            <div className="order-creation-time">
                                                <b>Order Placed at: {new Date(orderItem.createdAt).toLocaleString()}</b>
                                            </div>
                                            {orderItem.delivered ? (
                                                <div style={{fontSize:"30px",color:"green"}}>Delivered</div>
                                            ) : orderItem.cancel ? (
                                                <>
                                                <div style={{fontSize:"30px",color:"red"}}>Cancelled</div>
                                                <p>Amount successfully remitted</p>
                                                </>
                                            ) : (
                                                <>
                                                  <div style={{color:"red",fontSize:"25px"}}>Order Confirmed</div>
                                                <div style={{color:"green"}}>food will be ready within 10 mins</div>
                                                </>
                                            )}
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        )}
                    </div>
            }
        </div>

    )
}
