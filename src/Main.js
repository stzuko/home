import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <div className='container elegant-color-dark'>
      <div className='row text-center'>
	<div className='col-sm'>
	  <div className="jumbotron elegant-color header">
	    Work
	  </div>
	</div>
	<div className='col-sm'>
	  <div className="jumbotron elegant-color header">
	    Art
	  </div>
	</div>
	<div className='col-sm'>
	  <div className="jumbotron elegant-color header">
	    Contact
          </div>
	</div>
      </div>
      <footer className="page-footer font-small elegant-color header">
	<div className="footer-copyright text-center py-3">© 2018 Copyright:
      	  <a href="https://github.com/stzuko">Syd Strzempko</a>
    	</div>
      </footer>
    </div>
  </main>
)

export default Main

