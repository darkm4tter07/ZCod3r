import React from 'react'
import { useOutletContext, useNavigate} from 'react-router-dom'
import { timeAgo } from '../Constants';

const CreatedPosts = () => {
    const navigate = useNavigate();
    const {user} = useOutletContext();
  return (
    <div className='overflow-y-auto flex p-2 h-full gap-2'>
        {user?.createdPosts?.length==0 && <div className='font-semibold text-2xl'>No posts</div>}
        {user?.createdPosts?.map(post =>(
            <div className='w-full p-2 gap-2 h-20 flex items-center bg-[#d6ff40] border-2 border-black rounded-lg cursor-pointer hover:scale-95' key={post._id} onClick={()=>{
                navigate(`/post/${post._id}`);
            }}>
                {post.imageLinks.length>0 && (
                    <img src={post.imageLinks[0]} className='h-16 border-2 border-black'/>
                )}
                <div className='text-2xl font-bold'>{post.title.slice(0,20)}</div>
                <div className='text-sm ml-auto mt-auto'>{timeAgo(post.createdAt)}</div>
            </div>
        ))}
    </div>
  )
}

export default CreatedPosts