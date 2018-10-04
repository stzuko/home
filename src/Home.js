import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <home>
    <div className='container elegant-color-dark'>
      <div className='row text-center'>
        <div className='col-sm'>
          <div className="jumbotron elegant-color header" id="work">
            <Link to='/work'>Work</Link>
          </div>
        </div>
        <div className='col-sm'>
          <div className="jumbotron elegant-color header" id="art">
            <Link to='/art'>Art</Link>
          </div>
        </div>
        <div className='col-sm'>
          <div className="jumbotron elegant-color header" id="contact">
            <Link to='/contact'>Contact</Link>
          </div>
        </div>
      </div>
      <footer className="page-footer font-small elegant-color header">
        <div className="footer-copyright text-center py-3">© 2018 Copyright:
          <a href="https://github.com/stzuko">Syd Strzempko</a>
        </div>
      </footer>
    </div>
  </home>
)

export default Home
