import React from 'react';
import burgerImage from '../images/burger.jpg'; // Assuming burger.jpg is in the correct path
import img from '../../components/images/biriyani.avif';

import './reviews.css'
function Reviews() {
  return (
    <div>
         <h2 className='mb-3' style={{ color: 'green', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center', fontSize: '35px', letterSpacing: '1px' }}>
  Best selling Foods
</h2>
      <a href="https://front.codes/" className="logo hover-target" target="_blank">
        <img src={burgerImage} alt="" />
      </a>

      <div className="section full-height over-hide px-4 px-sm-0">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-lg-10 col-xl-8 align-self-center padding-tb">
              <div className="section mx-auto text-center slider-height-padding">
                <input className="checkbox frst" type="radio" id="slide-1" name="slider" defaultChecked />
                <label htmlFor="slide-1"></label>
                <input className="checkbox scnd" type="radio" name="slider" id="slider-2" />
                <label htmlFor="slider-2"></label>
                <input className="checkbox thrd" type="radio" name="slider" id="slider-3" />
                <label htmlFor="slider-3"></label>
                <input className="checkbox foth" type="radio" name="slider" id="slider-4" />
                <label htmlFor="slider-4"></label>
                <ul>
                  <li>
                    <span>MALE GOOFY FACE</span>
                  </li>
                  <li>
                    <span>TOY PIG</span>
                  </li>
                  <li>
                    <span>SHY PORTRAIT</span>
                  </li>
                  <li>
                    <span>SKATEBOARD FACE</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
