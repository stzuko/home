import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <div className='container elegant-color-dark'>
      <div className='row'>
        <Link to='/home' className='center-link'>
          <img className='rounded-circle' src="sydney.jpg" />
        </Link>
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

