import React from 'react';
import food from '../../components/images/food.avif';
import users from '../../components/images/users.avif';
import stockimg from '../../components/images/stock_image.png'
import messageimg from '../../components/images/message.png'

import { Link } from 'react-router-dom';
import './admin.css';

export const Admin = () => {
  const imageStyle = {
    height: '150px',
    objectFit: 'cover',
  };

  return (
    <div className="card-container" style={{marginTop:"90px"}}>
      <div className="card mx-2" style={{border:'1px solid' , marginTop:'20px'}}>
        <Link to='/addFood'>
          <img className="card-img-top" src={food} alt="Card image cap" style={imageStyle} />
        </Link>
        <div className="card-body">
          <p className="card-text">
            Add your food items here.
          </p>
          <Link to='/addFood'>
            <button className="btn btn-standard">
              Add Products
            </button>
          </Link>
        </div>
      </div>

      <div className="card mx-2 " style={{border:'1px solid' , marginTop:'20px'}}>
        <img className="card-img-top" src={users} alt="Card image cap" style={imageStyle} />
        <div className="card-body">
          <p className="card-text">
            View All Users Here
          </p>
          <Link to='/Viewusers'>
            <button className="btn btn-standard"> 
              View Users
            </button>
          </Link>
        </div>
      </div>
      <div className="card mx-2 " style={{border:'1px solid' ,marginTop:'20px'}}>
        <img className="card-img-top" src={stockimg} alt="Card image cap" style={imageStyle} />
        <div className="card-body">
          <p className="card-text">
            Add & Remove(Stock)
          </p>
          <Link to='/Stock'>
            <button className="btn btn-standard"> 
              Action
            </button>
          </Link>
        </div>
      </div>
      <div className="card mx-2" style={{border:'1px solid', marginTop:'20px'}}>
        <Link to='/Readmessage'>
          <img className="card-img-top" src={messageimg} alt="Card image cap" style={imageStyle} />
        </Link>
        <div className="card-body">
          <p className="card-text">
            Read Message
          </p>
          <Link to='/Readmessage'>
            <button className="btn btn-standard">
              messages
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
