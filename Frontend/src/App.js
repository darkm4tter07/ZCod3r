import React, {useState, useEffect} from 'react'
import {Route, Routes, useNavigate, Outlet, Navigate } from "react-router-dom";
import LandingPage from './Pages/LandingPage/index.js'
import Profile from './Pages/Profile/index.js';
import Home from './Pages/Home/index.js';
import PostPage from './Pages/PostPage/index.js';
import Followers from './Components/Followers.js';
import Following from './Components/Following.js';
import CreatedPosts from './Components/CreatedPosts.js';
import SavedPosts from './Components/SavedPosts.js';

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
          <Route path='/home' element={<Home/>}/>
          <Route path='/post/:postId' element={<PostPage/>}/>
          <Route path='/profile/:id' element={<Profile/>}>
            <Route path='posts' element={<CreatedPosts/>}/>
            <Route path='saved' element={<SavedPosts/>}/>
            <Route path='followers' element={<Followers/>}/>
            <Route path='following' element={<Following/>}/>
            <Route path='solved' element={<div>Solved</div>}/>
          </Route>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App