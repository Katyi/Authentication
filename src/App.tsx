import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './pages/login';
import { Main } from './pages/main/main';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/create-post/create-post';
import { UpdatePost } from './pages/update-post/update-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path='/updatepost' element={<UpdatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
