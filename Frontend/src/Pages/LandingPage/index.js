import React, {useState} from "react";
import LoginModal from "../../Components/LoginModal.js";
import Community from "../Home/index.js";
import {useNavigate} from 'react-router-dom';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if(!window.localStorage.getItem('isAuthenticated')){
      setShowModal(true);
    }else{
      navigate('/home');
    }
  };

  return (
    <div className="flex-col p-4 w-full">
      <div className="bg-black p-4 rounded-lg flex justify-between items-center px-6">
        <div className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">ZCod3r</div>
        <div className="text-sm sm:text-lg cursor-pointer font-bold bg-[#D9D9D9] p-2 rounded-lg flex items-center gap-2 hover:scale-90 transition" onClick={handleClick}>
          <span>GET STARTED</span>
          <img src="diagonal-arrow.svg" className="h-8" />
        </div>
        {showModal && <LoginModal onClose={()=>{setShowModal(false)}}/>}
      </div>
      <div className="flex-col bg-white p-4 px-6 border-[3px] border-black my-4 rounded-lg">
        <div className="font-bold bg-[#d9d9d9] inline-block rounded-md p-[1px]">
          WELCOME
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 pr-2">
            <div className="font-bold text-4xl md:text-6xl py-2">
              Unleash the coder in you with ZCODER.
            </div>
            <p className="text-md md:text-lg tracking-tight">
              Unlock the power of code and unleash your creativity with ZCODER.
              Whether you're a seasoned developer or just beginning your coding
              journey, our platform offers a diverse range of coding challenges
              and projects to hone your skills, expand your knowledge, and
              connect with a global community of like-minded enthusiasts.
            </p>
          </div>
          {/* Image */}
          <div className="">
            <img src="Ellipse1.svg" />
          </div>
        </div>
      </div>

      <div className="flex-col bg-white p-4 rounded-lg border-[3px] border-black">
        <div className="font-bold bg-[#d9d9d9] inline-block rounded-md p-[1px]">
          ABOUT US
        </div>
        <div className="text-lg py-2 ">
          ZCODER is an online platform that offers a diverse range of coding
          challenges and projects to help you hone your coding skills, expand
          your knowledge, and connect with a global community of like-minded
          enthusiasts. Whether you're a seasoned developer or just beginning
          your coding journey, ZCODER has something for everyone.
        </div>
      </div>

      <div className="flex-col p-4 rounded-lg border-[3px] border-black my-4 bg-white">
        <div className="font-bold bg-[#d9d9d9] inline-block rounded-md p-[1px]">
          WHAT WE OFFERS?
        </div>


        <div className="flex gap-4 py-4 overflow-x-scroll overflow-hidden scroll-smooth">

          <div className="border-[2.5px] border-black text-wrap p-4 rounded-lg bg-[#EDF4D3] transition min-w-[260px] max-w-80 flex flex-col justify-center items-center gap-6">
            <p className="py-2 font-medium">
              A built-in compiler with multiple language support for solving
              problems.
            </p>
            <div>
              <img src="programming-languages.png" />
            </div>
          </div>

          <div className="border-[2.5px] border-black text-wrap p-4 rounded-lg bg-[#EDF4D3] transition justify-center items-center flex flex-col min-w-[260px] max-w-80">
            <p className="py-2 font-medium">
              A diverse range of coding problems and option to bookmark your favorite problems.
            </p>
            <div>
              <img src="Coding-Challenge.png" />
            </div>
          </div>


          <div className="border-[2.5px] border-black text-wrap p-4 rounded-lg bg-[#EDF4D3] min-w-[260px] max-w-80">
            <p className="py-2 font-medium ">
             Community Support and discussion forum for instant doubt solving and problem discussion.
            </p>
            <div>
              <img src="coding-team.png" className="w-48"/>
            </div>
          </div>
          <div className="border-[2.5px] border-black text-wrap  p-4 rounded-lg bg-[#EDF4D3] min-w-[260px] max-w-80">
            <p className="py-2 font-medium">
            Personalized coding profiles to showcase your skills and achievements.
            </p>
            <div>
              <img src="coding-profile.png" />
            </div>
          </div>
          <div className="border-[2.5px] border-black text-wrap min-w-[260px] max-w-80 p-4 rounded-lg bg-[#EDF4D3]">
            <p className="py-2 font-medium">
            Contest Calendar to keep track of upcoming coding contests and hackathons on different platforms.
            </p>
            <div>
              <img src="Calendar.png" />
            </div>
          </div>
          <div className="border-[2.5px] border-black text-wrap min-w-[260px] max-w-80 p-4 rounded-lg bg-[#EDF4D3]">
            <p className="py-2 font-medium">
            Dedicated chat rooms and one-to-one chat support with different coders.
            </p>
            <div>
              <img src="ChatRoom.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
