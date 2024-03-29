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

            <h1><span>About</span></h1>
            <div>  <p>
            Welcome to your college canteen, where delicious meals meet vibrant campus life!
            Our diverse menu caters to all tastes and dietary needs,
            fostering connections among students. With a commitment to quality and affordability,
            join us for a dining experience that celebrates the flavors of campus life.</p></div>
            <div>
                <p>PH: 9875635212</p>
                <p></p>
            </div>
            <div className="about_services">

                {/* <div className="s_1">
                    <i className="fa-solid fa-truck-fast"></i>
                    <a >PH: 9875635212</a>
                </div>

                <div className="s_1">
                    <i className="fa-brands fa-amazon-pay"></i>
                    <a>Easy Ordering</a>
                </div> */}

                {/* <div className="s_1">
                    <i className="fa-solid fa-headset"></i>
                    <a>Friendly customer support</a>
                </div> */}

            </div>


        </div>

    </div>

</div>
  )
}
