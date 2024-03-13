import React from 'react'
import './styleheader.css'
import buger from '../../images/main_img.png'

export default function Styleheader() {
  return (
    
    <section>
  <div className="main anim">

<div className="main_text">

    <h1>Get Fresh<span> Food</span><br/>in a Easy Way</h1>

    <p className='paragraph'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Laborum, minus magnam nobis quam impedit nemo quaerat ex 
        necessitatibus ipsum totam voluptatum, fugit cupiditate 
        provident, quasi perspiciatis blanditiis illo nesciunt quae. 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Accusantium odio tenetur laudantium corrupti impedit 
        quidem dolore beatae, iure labore magni repellendus 
        inventore, eaque obcaecati commodi ipsa numquam. Accusamus, 
        molestiae veritatis.
    </p>

</div>

<div className="main_image">
    <img src={buger} />
</div>

</div>
    </section>
  

  )
}
