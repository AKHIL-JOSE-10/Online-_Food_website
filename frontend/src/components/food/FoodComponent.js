import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../../actions/cartActions.js';
import './FoodComponent.css';
import Swal from 'sweetalert2'
export default function Foods({ food }) {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);


  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addtocart = () => {
    dispatch(addToCart(food, quantity));
    Swal.fire({
      text: "Successfully added to cart!",
      icon: "success",
      timer: 1500
    });
  };

  const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete('https://online-food-website.onrender.com/deletefood/' + id)
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <div className='shadow-lg p-3 mb-5 bg-body ' style={{ borderRadius: "20px", border: "1px solid black" }}>
      <div onClick={handleShow}>
        <h1>{food.name}</h1>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}images/${food.image}`}
          className='img-fluid'
          style={{ height: '200px', maxWidth: '100%', width: 'auto' }}
          alt='food Image'
        />
      </div>

      <div className='flex-container'>
        {userInfo && !userInfo.isAdmin && (
          <div className='w-100 m-1'>
            <p>Quantity:</p>
            <select
              className='form-control'
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            >
              {[...Array.from(Array(10).keys()).map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))]}
            </select>
          </div>
        )
        }

      </div>

      <div className='flex-container'>
        <div className='m-1 w-100'>
          <h6 className='mt-1'>
            Price: {food.price ? food.price * quantity + ' RS/-' : 'Not available'}
          </h6>
        </div>

        <div className='m-1 w-100'>
          {userInfo ? (
            userInfo && userInfo.isAdmin ? (
              <>
                <button className='btn btn-danger' onClick={() => handleDelete(food._id)}>
                  Delete
                </button>
                <Link to={`/Review/${food._id}`} style={{ marginLeft: "20px" }}>reviews</Link>
              </>

            ) : (
              <>
               <button
                className={`btn ${food.stock ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => (food.stock ? addtocart() : null)}
                disabled={!food.stock}
              >
                {food.stock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <Link to={`/Review/${food._id}`} style={{ marginLeft: "20px" }}>reviews</Link>
              </>

            )
          ) : (<button className='btn btn-standard' disabled > Login to Order </button>)
          }
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{food.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://online-food-website.onrender.com/images/${food.image}`}
            className='img-fluid'
            style={{ height: '300px' }}
            alt='food image'
          />
          <p>{food.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn' onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
