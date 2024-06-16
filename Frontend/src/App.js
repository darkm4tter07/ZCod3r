import React, {useState, useEffect} from 'react'
import {Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from './Pages/LandingPage/index.js'
import Profile from './Pages/Profile/index.js';
import Home from './Pages/Home/index.js';
import PostPage from './Pages/PostPage/index.js';

const ProtectedRoutes = () =>{
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return window.localStorage.getItem('isAuthenticated');
  });
  return isAuthenticated ? <Outlet/> : <Navigate to='/'/>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/profile/:id' element={<Profile/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/post/:postId' element={<PostPage/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App