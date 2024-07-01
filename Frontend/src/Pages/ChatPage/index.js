import React, {useState, useEffect} from 'react'
import SideBar from '../../Components/SideBar'
import Navbar from '../../Components/Navbar'
import {Outlet} from 'react-router-dom';


const index = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className='h-screen flex flex-col pt-4 w-full'>
        <div className='w-screen'>
            <Navbar setOpenSidebar={setOpenSidebar}/>
        </div>
        <div className='flex h-full'>
            <SideBar openSidebar={openSidebar}/>
            
        </div>
    </div>
  )
}

export default index