import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import SideBar from '../../Components/SideBar';
import CreatePost from '../../Components/CreatePost';
import PostContainer from '../../Components/PostContainer';

const Home = () => {
  const [openCreatePost, setOpenCreatePost] = useState(false);

  return (
    <div className='min-h-screen flex flex-col bg-black'>
      {/* Navbar */}
      <div className='w-full'>
        <Navbar />
      </div>
      
      {/* Main Content */}
      <div className='flex flex-1 h-[calc(100vh-4rem)]'>
        {/* Sidebar */}
        <SideBar />
        
        {/* Main Content Area */}
        <div className='flex-1 md:ml-56 transition-all duration-300 mt-12'>
          <PostContainer />
        </div>
      </div>
      
      {/* Floating Create Post Button */}
      <div 
        className='fixed bottom-6 right-6 w-14 h-14 border-2 border-yellowgreen rounded-full bg-[#0e0e0e] cursor-pointer shadow-2xl z-50 hover:scale-90 hover:bg-yellowgreen transition-all duration-200 flex items-center justify-center group'
        onClick={() => setOpenCreatePost(!openCreatePost)}
      >
        <img 
          src="createPost.svg" 
          alt='+' 
          className='w-8 h-8 group-hover:filter group-hover:invert transition-all duration-200'
        />
      </div>
      
      {/* Create Post Modal */}
      {openCreatePost && (
        <CreatePost onCancel={() => setOpenCreatePost(!openCreatePost)} />
      )}
    </div>
  );
};

export default Home;