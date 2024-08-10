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
import ChatPage from './Pages/ChatPage/index.js';
import ProblemPage from './Pages/Problems/index.js';
import Problem from './Pages/Problem/index.js';

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
            <Route path='saved' element={<SavedPosts/> }/>
            <Route path='followers' element={<Followers/>}/>
            <Route path='following' element={<Following/>}/>
            <Route path='solved' element={<div>Solved</div>}/>
          </Route>
          <Route path='/chats' element={<ChatPage/>}>
            <Route path=':id' element={<div>Chat with user</div>}/>
            <Route path='group/:id' element={<div>Chat with group</div>}/>
          </Route>
          <Route path='/problems' element = {<ProblemPage/>}/>
          <Route path='/problem/:id' element={<Problem/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App