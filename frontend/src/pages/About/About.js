import React from 'react'
import './About.css'
import AbouImage from '../../images/about.png'

export default function About() {
  return (
    <div className="about">

    <div className="about_main">

        <div className="about_image">
            <img src={AbouImage} />
        </div>

        <div className="about_text">

            <h1><span>About</span>Us</h1>
            <h3>why food choose us?</h3>
            <div>  <p>
            Welcome to our college canteen, where delicious meals meet vibrant campus life!
            Our diverse menu caters to all tastes and dietary needs,
            fostering connections among students. With a commitment to quality and affordability,
            join us for a dining experience that celebrates the flavors of campus life.</p></div>
            <div className="about_services">

                <div className="s_1">
                    <i className="fa-solid fa-truck-fast"></i>
                    <a href="#">Fast Delivery</a>
                </div>

                <div className="s_1">
                    <i className="fa-brands fa-amazon-pay"></i>
                    <a href="#">Easy Payment</a>
                </div>

                <div className="s_1">
                    <i className="fa-solid fa-headset"></i>
                    <a href="#">24 x 7 Services</a>
                </div>

            </div>


        </div>

    </div>

</div>
  )
}
