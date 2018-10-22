import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
    <div className='container elegant-color-dark'>
      <div className='row text-center'>
        <div className='col-sm'>
          <Link to='/work'>
            <div className="jumbotron elegant-color header" id="work">
              Work
            </div>
          </Link>
        </div>
        <div className='col-sm'>
          <Link to='/art'>
            <div className="jumbotron elegant-color header" id="art">
              Art
            </div>
          </Link>
        </div>
        <div className='col-sm'>
          <Link to='/contact'>
            <div className="jumbotron elegant-color header" id="contact">
              Contact
            </div>
          </Link>
        </div>
      </div>
    </div>
)

export default Home
