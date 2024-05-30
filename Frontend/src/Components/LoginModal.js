import React,{useRef, useEffect} from 'react';

const LoginModal = ({onClose}) => {
    let menuRef = useRef();
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
        <div className='flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]'>
            <img src="Google.png" className='w-6' />
            <div>Login with Google</div>
        </div>
        <div className='flex p-2 gap-2 rounded-lg bg-[#EDF4D3] px-10 border-2 border-black cursor-pointer font-semibold hover:bg-[#efffb4]'>
            <img src="Outlook.svg" className='w-6' />
            <div>Login with Outlook</div>
        </div>
    </div>
  )
}

export default LoginModal;