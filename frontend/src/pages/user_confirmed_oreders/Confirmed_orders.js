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

    const confirmedOrders = orderlist.filter(order => order.confirm);

    return (
        <div>
            {
                loading ? <div class="spinner-border text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div> :
                    <div className="order-container">
                        <h2 className="order-heading">Placed Orders</h2>
                        <div className="order-list">
                            {confirmedOrders.map((orderItem, index) => (
                                userInfo._id === orderItem.ownerID ? (
                                    <div className="order-item" key={index}>
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
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </div>
            }
        </div>

    )
}
