import React, {useState, useRef, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';

const Modal = ({onClose, userId}) =>{
    const modalRef = useRef();
    const navigate = useNavigate(); 
    const Logout = () => {
        window.localStorage.clear();
        onClose();
        navigate("/");
        window.location.reload();
    };
    // Close the modal when clicked outside of it
    useEffect(() => {
      function handleClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [modalRef]);
    
    return (
      <div className='absolute border-[3px] bg-white border-black flex flex-col gap-2 right-8 top-20 shadow-2xl rounded-lg p-4 text-black font-semibold' ref={modalRef}>
        <div className='flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]'  >
           <Link to={`/profile/${userId}`}><div>Profile</div></Link> 
        </div>
        <div className='flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]' >
            <div onClick={Logout}>Logout</div>
        </div>
    </div>
    )
}

const Navbar = ({setOpenSidebar}) => {
    const [isOpen, setIsOpen] = useState(false);
    const profileImg = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).profileUrl : '';
    const userId = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).username : '';
    
  return (
    <div className="bg-black p-4 rounded-lg flex justify-between items-center px-6 mx-4">
        <div className="text-white font-bold text-3xl md:text-4xl flex gap-4 items-center">
          <div className='md:hidden cursor-pointer hover:scale-90' onClick={()=>{
            setOpenSidebar((prev)=>!prev);
          }}>
            <img src="../burger.svg" className='w-8' />
          </div>
            <p>ZCod3r</p>
          </div>
        <div className='flex text-white gap-4 items-center'>
            {window.localStorage.getItem("isAuthenticated") && <div className='h-12 w-12 rounded-full cursor-pointer ml-4 overflow-hidden' onClick={()=>{setIsOpen(!isOpen)}}><img src={profileImg? profileImg: `profile.png`} referrerPolicy="no-referrer"/></div>}
            {isOpen && <Modal onClose={()=>{setIsOpen(false)}} userId={userId}/>}
        </div>
      </div>
  )
}

export default Navbar