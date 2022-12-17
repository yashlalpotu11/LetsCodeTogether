import React from 'react'
import { Switch, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Create from './components/Create'
import Join from './components/Join'
import Editor from './components/Editor'
import About from './components/About'
// const axios = require('axios')
const App = () => {
  return(
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/room/:roomid' component={Editor}/>
          <Route exact path='/join' component={Join} />
          <Route exact path='/about' component={About} />
        </Switch>
      </>
  )
}
export default App