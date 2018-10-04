import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <div className='container elegant-color-dark'>
      <div className='row'>
	<img className='rounded-circle' src="./img/syd.jpg" />
      </div>
      <div className='row text-center header'>
	<div className='col'>
	  Syd Strzempko
          <hr />
	</div>
      </div>
    </div>
  </header>
)

export default Header

