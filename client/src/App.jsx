import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './routes/home'
import About from './routes/About'
import Header from './components/Header'
import Footer from './components/Footer'
import Book from './routes/Book'
import OneBook from './routes/OneBook'
import CreateBook from './routes/CreateBook'


const App = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/books' element={<Book/>} />
        <Route path='/books/:slug' element={<OneBook/>} />
        <Route path='/books/createbook' element={<CreateBook />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App