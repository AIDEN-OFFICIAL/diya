import React, { useEffect } from 'react'
import './App.css'
import FallingHearts from './FallingHearts'
import Gallery from './Gallery/Gallery'
import Home from './Home/Home'

import {BrowserRouter,Routes,Route} from "react-router-dom";
const App = () => {

 

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FallingHearts/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
