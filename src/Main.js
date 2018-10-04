import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Work from './Work'
import Art from './Art'
import Contact from './Contact'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/work' component={Work}/>
      <Route exact path='/art' component={Art}/>
      <Route exact path='/contact' component={Contact}/>
    </Switch>
  </main>
)

export default Main
