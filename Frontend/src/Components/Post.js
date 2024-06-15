import React, {useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../Constants';

const Post = ({post}) => {
    const [current, setCurrent] = useState(0);
    const user = JSON.parse(localStorage.getItem('user'));
    const [liked, setLiked] = useState(post.likes.includes(user._id));
    const previousImage = () =>{
      if(current===0){
        setCurrent(post.imageLinks.length-1);
      }else{
        setCurrent(current-1);
      }
    }
  
    const nextImage = () =>{
      if(current===post.imageLinks.length-1){
        setCurrent(0);
      }else{
        setCurrent(current+1);
      }
    }
  
    const toggleLike = async () => {
      if (liked) {
        setLiked(false);
        post.likes = post.likes.filter(like => like !== user._id);
      } else {
        setLiked(true);
        post.likes.push(user._id);
      }
      try {
        const response = await axios.put(`${BASE_URL}/api/posts/toggleLike/${post._id}?userId=${user._id}`);
        if (response.status !== 200) {
          console.error('Error toggling like:', response);
        }
      } catch (error) {
        console.error('Error toggling like:', error);
      }
    };
  
    const postComment = async () => {};
  
    return (
      <div className='flex flex-col bg-white border-2 border-black rounded-lg p-4 '>
        {/* Post Header */}
        <div className='flex w-full gap-2'>
          <div className='w-12 h-12 rounded-full border-2 border-black bg-center bg-cover' style={{backgroundImage: `url(${post.createdBy.profileUrl})`}}></div>
          <div className='flex flex-col'>
            <div className='uppercase font-bold'>{post.createdBy.fullName}</div>
            <div className='hover:underline cursor-pointer hover:text-blue-800 text-sm opacity-65'>{post.createdBy.username}</div>
          </div>
          <div className='flex gap-2 h-6 ml-auto flex-wrap '>
            {post.tags.map((tag, ind) => (
              <div key={ind} className='bg-[#efffb4] rounded-md p-1 px-2 text-sm'>{tag}</div>
            ))}
          </div>
        </div>
        <div className='text-2xl font-bold pt-4' title={post.title}>
          {post.title}
        </div>
        <div className='text-lg text-wrap pt-4' title={post.body}>
            {post.body}
        </div>
        {post.imageLinks.length>0 && (<div className='border-2 border-black rounded-lg min-h-48 mt-4 flex overflow-hidden relative'>
            {post.imageLinks.length==1 ? (
              <img src={post.imageLinks[0]} alt='post' className='w-full h-full object-cover'/>
            ) : (
              <div className={`flex gap-2 transition ease-out duration-100 items-center`} style={{
                  transform: `translateX(-${current*100}%)`
              }}>
                {post.imageLinks.map((img, ind) => (
                  <img key={ind} src={img} alt='post' className=' h-full object-cover'/>
                ))}
              </div>
            )}
            {post.imageLinks.length>1 && (
              <div className='absolute flex items-center justify-between w-full h-full px-2'>
                <img src="left.png" alt="<" className='hover:invert hover:scale-95 cursor-pointer shadow-2xl shadow-white' onClick={previousImage}/>
                <img src="right.png" alt=">" className='hover:invert hover:scale-95 cursor-pointer shadow-2xl shadow-white' onClick={nextImage}/>
              </div>
            )}
        </div>
      )}
            <div className='flex gap-4 mt-4 '>
              <div className='flex gap-2'>
                {liked ? (<img src='liked.svg' onClick={toggleLike} className='h-8 cursor-pointer hover:scale-110'/>):(<img src='Notliked.svg' onClick={toggleLike} className='h-8 cursor-pointer hover:scale-110'/>)}
                <p className='text-2xl font-bold'>{post.likes.length}</p>
              </div>
              <div className='flex gap-2'>
                <img src='comment.svg' className='h-8'/>
                <p className='text-2xl font-bold'>{post.comments.length}</p>
              </div>
            </div>
      </div>
    )
  }

export default Post