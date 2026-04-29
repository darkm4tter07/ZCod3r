import React, { useRef, useEffect } from "react";
import {
  auth,
  GoogleProvider,
  OutlookProvider,
  signInWithPopup,
} from "../config/firebase-config.js";
import { BASE_URL } from "../Constants.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  let menuRef = useRef();
  const navigate = useNavigate();

  const sendUserData = async (currUser, token) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, currUser);
      if (response.status === 200) {
        window.localStorage.setItem("isAuthenticated", true);
        window.localStorage.setItem("token", token);
        window.localStorage.setItem("user", JSON.stringify(response.data.data));
        onClose();
        navigate("/home");
      } else {
        throw new Error("Login Failed");
      }
    } catch (error) {
      console.log("Error in sending user data ", error);
    }
  };

  GoogleProvider.setCustomParameters({ prompt: "select_account" });

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      if (!result) throw new Error("Google Login Failed");

      const currUser = {
        username: result.user.email.split("@")[0],
        email: result.user.email,
        fullName: result.user.displayName,
        profileUrl: result.user.photoURL || "",
      };
      sendUserData(currUser, result.user.accessToken);
    } catch (error) {
      console.log("Google Login Failed ", error);
    }
  };

  const loginWithOutlook = async () => {
    try {
      const result = await signInWithPopup(auth, OutlookProvider);
      if (!result) throw new Error("Outlook Login Failed");

      const currUser = {
        username: result.user.email.split("@")[0],
        email: result.user.email,
        fullName: result.user.displayName,
        profileUrl: result.user.photoURL || "",
      };
      sendUserData(currUser, result.user.accessToken);
    } catch (error) {
      console.log("Outlook Login Failed ", error.message);
    }
  };

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute top-24 right-10 z-50 bg-[#0d1117] border-2 border-yellowgreen rounded-lg px-6 py-4 text-yellowgreen font-mono shadow-lg w-[280px] sm:w-[320px]"
    >
      <div
        className="absolute top-2 right-2 cursor-pointer w-5 hover:scale-110 transition"
        onClick={onClose}
      >
        <img src="Close.png" alt="Close" />
      </div>

      <div className="text-center font-bold text-lg mb-4 border-b border-yellowgreen pb-2">
        Login to <span className="text-white">ZCod3r</span>
      </div>

      <button
        onClick={loginWithGoogle}
        className="flex items-center justify-center gap-3 w-full border-2 border-yellowgreen rounded-md py-2 mb-3 hover:bg-yellowgreen hover:text-black transition"
      >
        <img src="Google.png" alt="Google" className="w-5" />
        <span className="font-semibold text-sm">Login with Google</span>
      </button>

      <button
        onClick={loginWithOutlook}
        className="flex items-center justify-center gap-3 w-full border-2 border-yellowgreen rounded-md py-2 hover:bg-yellowgreen hover:text-black transition"
      >
        <img src="Outlook.svg" alt="Outlook" className="w-5" />
        <span className="font-semibold text-sm">Login with Outlook</span>
      </button>
    </div>
  );
};

export default LoginModal;
