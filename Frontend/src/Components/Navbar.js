import React, {useState, useRef, useEffect} from 'react';
import { useLocation, Link , useNavigate} from 'react-router-dom';

const Modal = ({onClose, userId}) =>{
    const modalRef = useRef();
    const navigate = useNavigate(); 
    const Logout = () => {
        window.localStorage.clear();
        onClose();
        navigate("/");
        window.location.reload();
    };

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

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const profileImg = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).profileUrl : '';
    const userId = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).username : '';
    const location = useLocation();
  return (
    <div className="bg-black p-4 rounded-lg flex justify-between items-center px-6 m-4">
        <div className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">ZCod3r</div>
        <div className='flex text-white gap-4 items-center'>
            {["Home", "Problems", "Calendar"].map((item, ind)=>(
                    <div key={ind} className={`font-medium text-lg hover:underline cursor-pointer hover:opacity-80 ${location.pathname === `/${item.toLowerCase()}` ? "underline opacity-80" : ""}`}>{item}</div>
            ))}
            {window.localStorage.getItem("isAuthenticated") && <div className='h-12 w-12 rounded-full cursor-pointer ml-4 overflow-hidden' onClick={()=>{setIsOpen(!isOpen)}}><img src={profileImg? profileImg: `profile.png`}/></div>}
            {isOpen && <Modal onClose={()=>{setIsOpen(false)}} userId={userId}/>}
        </div>
      </div>
  )
}

export default Navbar