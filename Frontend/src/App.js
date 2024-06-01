import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './Pages/LandingPage/index.js'
import Profile from './Pages/Profile/index.js';
import Community from './Pages/Community/index.js';
import auth from './config/firebase-config.js';
import { validateUser } from './Api/index.js';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false || window.localStorage.getItem('isAuthenticated')===true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token)=>{
          window.localStorage.setItem('isAuthenticated', true);
          window.localStorage.setItem('token', token);
          setIsAuthenticated(true);
          validateUser(token).then((response)=>{
            console.log(response.data);
          }).catch((error)=>{
            console.log(error);
          })
        })
      } else {
        setIsAuthenticated(false);
        window.localStorage.setItem('isAuthenticated', false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/community' element={<Community/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App