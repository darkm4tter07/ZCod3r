import React,{useRef, useEffect} from 'react';
import {auth, GoogleProvider, OutlookProvider, signInWithPopup} from '../config/firebase-config.js';
import {BASE_URL} from "../Constants.js";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const LoginModal = ({onClose}) => {
    let menuRef = useRef();
    const navigate = useNavigate();
    const sendUserData = async(currUser, token)=>{
        try {
            const response = await axios.post(`${BASE_URL}/api/users/login`, currUser);
            if(response.status === 200){
                window.localStorage.setItem('isAuthenticated',true);
                window.localStorage.setItem('token',token);
                window.localStorage.setItem("user", JSON.stringify(response.data.data));
                onClose();
                navigate("/home");
            }else{
                throw new Error("Login Failed");
            }
        } catch (error) {
            console.log("Error in sending user data ", error);
        }
    }
    GoogleProvider.setCustomParameters({
        prompt: 'select_account'
    });
     
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, GoogleProvider);
            if(!result){
                throw new Error("Google Login Failed");
            }
            const currUser = {
                username: result.user.email.split("@")[0],
                email: result.user.email,
                fullName: result.user.displayName,
                profileUrl: result.user.photoURL? result.user.photoURL: "",
            };
            sendUserData(currUser,result.user.accessToken);
        } catch (error) {
            console.log("Google Login Failed ", error);
            console.log("Login failed through this email: ",error.customData.email);
        }
    }
    
    const loginWithOutlook = async () => {
        try {
            const result = await signInWithPopup(auth, OutlookProvider);
            if(!result){
                throw new Error("Outlook Login Failed");
            }
            const currUser = {
                username: result.user.email.split("@")[0],
                email: result.user.email,
                fullName: result.user.displayName,
                profileUrl: result.user.photoURL? result.user.photoURL: "",
            };
            sendUserData(currUser, result.user.accessToken);
        } catch (error) {
            console.log("Outlook Login Failed ", error.message);
            console.log("Login failed through this email: ",error.customData.email);
        }
    }

    useEffect(()=>{
        let handler = (e) => {
            if(!menuRef.current.contains(e.target)){
                onClose();
            }
        };
        document.addEventListener("mousedown",handler);

        return ()=>{
            document.removeEventListener("mousedown",handler);
        };
    })

  return (
    <div className='absolute border-[3px] bg-white border-black flex flex-col gap-2 right-8 top-20 shadow-2xl rounded-lg p-4' ref={menuRef}>
        <div className='absolute right-2 top-2 w-6 cursor-pointer' onClick={onClose}><img src="Close.png"/></div>
        <div className='font-extrabold text-lg bg-[#d9d9d9] rounded-md px-1 inline-block w-20 text-center mb-2'>ZCod3r</div>
        <div className='flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]' onClick={loginWithGoogle} >
            <img src="Google.png" className='w-6' />
            <div>Login with Google</div>
        </div>
        <div className='flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]' onClick={loginWithOutlook}>
            <img src="Outlook.svg" className='w-6' />
            <div>Login with Outlook</div>
        </div>
    </div>
  )
}

export default LoginModal;