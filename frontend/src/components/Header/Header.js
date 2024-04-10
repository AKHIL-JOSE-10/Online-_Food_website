import React from 'react'
import './Header.css'
import buger from '../../images/main_img.png'

export default function Header() {
  return (
    
    <section>
  <div className="main anim">

<div className="main_text">

<h1>Get Fresh<span> Food</span><br/>in a Easy Way</h1>

</div>

<div className="main_image">
    <img src={buger} />
</div>

</div>
    </section>
  

  )
}
