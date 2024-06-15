import React, {useState} from 'react'
import Navbar from '../../Components/Navbar';
import SideBar from '../../Components/SideBar';
import CreatePost from '../../Components/CreatePost';
import PostContainer from '../../Components/PostContainer';

const Home = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  return (
    <div className='h-screen flex flex-col pt-4'>
      <Navbar setOpenSidebar={setOpenSidebar}/>
      <div className='flex h-full'>
        <SideBar openSidebar={openSidebar}/>
        <PostContainer/>
      </div>
      
      <div className='border-2 p-2 border-black rounded-[50%] absolute bottom-4 right-4 bg-white cursor-pointer shadow-2xl z-50 hover:scale-90' onClick={()=>setOpenCreatePost(!openCreatePost)}>
        <img src="createPost.svg" alt='+' className='w-10'/>
      </div>
      {openCreatePost && <CreatePost onCancel={()=>{setOpenCreatePost(!openCreatePost)}}/>}
        
    </div>
  )
}

export default Home;