import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import food from '../../images/food_background.jpg';
import pizza from '../../components/images/pizza.webp'
import './topbar.css';

export default function Top() {
  return (
    <div className="position-relative">

      <div className="topbar-carouselExampleControls1 carousel slide" data-ride="carousel">
        <div className="topbar-carousel-inner">
          <div className="topbar-carousel-item active">
            <img className="d-block w-100" src={food} alt="First slide" />
            <div className="text-container">
              <b className="text-style">People who love to eat</b><br />
              <b className="text-style">Are always the best </b><br />
              <b className="text-style"> People..</b>
            </div>
            
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls1" role="button" data-slide="prev"></a>
        <a className="carousel-control-next" href="#carouselExampleControls1" role="button" data-slide="next"></a>
      </div>

     
    </div>
  );
}
