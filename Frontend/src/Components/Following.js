import React from 'react';
import { useOutletContext, useNavigate} from 'react-router-dom'


const Following = () => {
    const navigate = useNavigate();
    const {user} = useOutletContext();
    
  return (
    <div className='overflow-y-auto flex p-2 h-full gap-2'>
        {user.following.length==0 && <div className='font-semibold text-2xl'>No followings</div>}
        {user?.following?.map(follower =>(
            <div className='h-16 rounded-lg bg-white border-2 border-black flex items-center px-2 gap-2' key={follower._id}>
                <img src={follower.profileUrl} className='w-10 h-10 rounded-full'/>
                <div>
                    <h1 className='font-bold'>{follower.fullName}</h1>
                    <h2 className='text-sm hover:underline hover:text-blue-400 cursor-pointer' onClick={()=>{
                        navigate(`/profile/${follower.username}`);
                    }}>{follower.username}</h2>
                </div>
                
            </div>
        ))}
    </div>
  )
}

export default Following