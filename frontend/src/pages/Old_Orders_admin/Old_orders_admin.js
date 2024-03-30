import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Old_orders_admin() {
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
    const confirmedOrders = Array.isArray(orderlist) ? orderlist.filter(order => (order.confirm && order.delivered) || order.cancel) : [];

    return (
        <div style={{ marginTop: "90px" }}>
            {
                loading ? <div className="spinner-border m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> :
                    <div className="order-container">
                        <h2 className="order-heading">Old Orders</h2>
                        <div className="order-list">
                            {confirmedOrders.map((orderItem, index) => (
                                <div className="order-item" key={index}>
                                    <h2 style={{ marginBottom: '30px', color: "green" }}>{orderItem.name}<h4><b style={{ color: "red" }}>token : {" "}{orderItem.code}</b></h4></h2>
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
                                        <div style={{ fontSize: "30px", color: "green" }}>Delivered</div>
                                    ) : orderItem.cancel ? (
                                        <>
                                            <div style={{ fontSize: "30px", color: "red" }}>Cancelled</div>
                                            <p>Amount successfully remitted</p>
                                        </>
                                    ) : (
                                        <div style={{ color: "red", fontSize: "30px" }}>Not Delivered</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
            }
        </div>
    )
}
